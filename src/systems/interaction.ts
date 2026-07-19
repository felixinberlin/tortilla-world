/**
 * ============================================
 * LIST REORDER SYSTEM
 * ============================================
 * 
 * This file handles drag-and-drop reordering for ingredient lists.
 * It's split into TWO distinct responsibilities:
 *   1. Pure calculation (resolveListReorder) - determines the new order
 *   2. Side-effect application (applyListOrder) - writes to the store
 * 
 * This separation makes the code TESTABLE and MAINTAINABLE.
 * 
 * @module ListReorderSystem
 */

import type { Entity } from '../types/Entity'

/**
 * ============================================
 * TYPES & DEFINITIONS
 * ============================================
 */

/**
 * Represents the two possible states of an ingredient list.
 * 
 * Why these names?
 * - 'full': Ingredients that ARE currently in the tortilla
 * - 'empty': Ingredients that are NOT in the tortilla (available to add)
 * 
 * This is the CORE BUSINESS CONCEPT of this app: you drag items
 * between "in my tortilla" and "not in my tortilla".
 */
export type IngredientListState = 'full' | 'empty'

/**
 * Minimal structure for a drag event from the UI library.
 * 
 * Why use composite IDs (e.g., "full::ingredient-1")?
 * - The same ingredient can appear in BOTH lists
 * - We need to know WHICH list the drag came from
 * - "full::tomato" vs "empty::tomato" are different drag sources
 * 
 * @property activeId - The item being dragged (e.g., "full::tomato")
 * @property overId  - The item being dragged over (e.g., "empty::onion")
 */
interface DragMoveEvent {
  activeId: string
  overId: string
}

/**
 * The result of a reorder calculation.
 * 
 * Why return both arrays instead of just changing state directly?
 * - Pure functions are easier to test
 * - The UI can preview the change before committing
 * - We can batch multiple changes together
 * 
 * @property fullIds  - Ordered list of ingredient IDs in the 'full' state
 * @property emptyIds - Ordered list of ingredient IDs in the 'empty' state
 */
interface DragMoveResult {
  fullIds: string[]
  emptyIds: string[]
}

/**
 * ============================================
 * UTILITY FUNCTIONS
 * ============================================
 */

/**
 * Splits a composite ID into its two parts.
 * 
 * Example: parseListItemId('full::ingredient-123')
 *   => { listId: 'full', itemId: 'ingredient-123' }
 * 
 * Why use '::' as a separator?
 * - It's unlikely to appear in regular ingredient names
 * - Easy to spot in debugging
 * - Common pattern in drag-and-drop libraries
 * 
 * @param compositeId - String like "full::ingredient-123"
 * @returns Object with listId and itemId, or null if invalid
 * 
 * @pure - Same input always returns same output
 */
function parseListItemId(compositeId: string) {
  const [listId, itemId] = compositeId.split('::')
  
  // Guard against malformed IDs (e.g., "full" without "::ingredient")
  if (!listId || !itemId) return null
  
  return { listId, itemId }
}

/**
 * ============================================
 * CORE PURE LOGIC
 * ============================================
 */

/**
 * PURE FUNCTION: Calculates the new order of ingredients after a drag event.
 * 
 * WHAT MAKES THIS PURE?
 * ✅ No side effects (doesn't modify global state)
 * ✅ Same inputs always produce same outputs
 * ✅ No random numbers or timestamps
 * ✅ Easy to unit test with jest/vitest
 * 
 * WHY IS THIS IMPORTANT?
 * - You can test it in isolation without mocking stores
 * - The UI can preview changes before committing
 * - Easier to debug because there's no hidden state
 * 
 * ALGORITHM OVERVIEW:
 * 1. Parse the source (dragged) and target (dropped on) IDs
 * 2. Determine which list each item belongs to
 * 3. If same list: just reorder within that list
 * 4. If different lists: remove from source, insert into target
 * 
 * @param event          - The drag event from the UI library
 * @param currentFullIds - Current order of 'full' list
 * @param currentEmptyIds - Current order of 'empty' list
 * @returns New orderings, or null if the operation is invalid
 * 
 * @pure
 */
export function resolveListReorder(
  event: DragMoveEvent,
  currentFullIds: string[],
  currentEmptyIds: string[],
): DragMoveResult | null {
  // STEP 1: Parse the composite IDs
  // Example: "full::tomato" => { listId: 'full', itemId: 'tomato' }
  const source = parseListItemId(event.activeId)
  const target = parseListItemId(event.overId)
  
  // If either ID is malformed, we can't proceed
  if (!source || !target) return null

  // STEP 2: Extract the list names and ingredient IDs
  const sourceState = source.listId as IngredientListState   // 'full' or 'empty'
  const targetState = target.listId as IngredientListState   // 'full' or 'empty'
  const ingredientId = source.itemId                         // e.g., 'tomato'

  // STEP 3: Get the current order of the source and target lists
  // Why use a conditional expression instead of if/else?
  // - More concise when we're just picking between two options
  // - Better readability for simple choices
  const sourceIds = sourceState === 'full' ? currentFullIds : currentEmptyIds
  const targetIds = targetState === 'full' ? currentFullIds : currentEmptyIds

  // STEP 4: Validate - the dragged ingredient must exist in the source list
  // This prevents bugs where an item is missing from a list
  if (!sourceIds.includes(ingredientId)) return null

  // STEP 5: Find where to insert the dragged item
  // How does findIndex work?
  //   - It checks each itemId in targetIds
  //   - If event.overId ends with that itemId, we've found the target
  //   - Example: event.overId = "empty::onion" => targetIndex = position of 'onion'
  const targetIndex = targetIds.findIndex((itemId) => event.overId.endsWith(itemId))
  
  // If the target wasn't found, insert at the END of the list
  // This handles edge cases like dropping at the bottom of the list
  const insertAt = targetIndex === -1 ? targetIds.length : targetIndex

  // STEP 6: Prepare the new orderings (with default values)
  let nextFullIds = currentFullIds
  let nextEmptyIds = currentEmptyIds

  // STEP 7: Handle the drag operation based on source and target lists
  if (sourceState === targetState) {
    // CASE A: Moving WITHIN the same list (e.g., full → full)
    // Example: Reorder tomatoes above onions in the 'full' list
    
    // 1. Remove the dragged item from the list
    const reordered = sourceIds.filter((itemId) => itemId !== ingredientId)
    
    // 2. Insert it at the new position
    reordered.splice(insertAt, 0, ingredientId)
    
    // 3. Update the appropriate list
    nextFullIds = sourceState === 'full' ? reordered : currentFullIds
    nextEmptyIds = sourceState === 'empty' ? reordered : currentEmptyIds
    
  } else {
    // CASE B: Moving BETWEEN different lists (e.g., full → empty)
    // Example: Move tomato from 'full' list to 'empty' list
    
    // 1. Remove from source list
    const reorderedSource = sourceIds.filter((itemId) => itemId !== ingredientId)
    
    // 2. Add to target list at the correct position
    const reorderedTarget = [...targetIds]  // Create a copy (avoid mutation!)
    reorderedTarget.splice(insertAt, 0, ingredientId)
    
    // 3. Update BOTH lists
    // This conditional assignment is complex, so let's break it down:
    //   - If source is 'full': source list becomes reorderedSource
    //   - If source is 'empty': source list stays current (unchanged)
    //   - If target is 'full': target list becomes reorderedTarget
    //   - If target is 'empty': target list stays current (unchanged)
    nextFullIds = sourceState === 'full' 
      ? reorderedSource 
      : targetState === 'full' 
        ? reorderedTarget 
        : currentFullIds
    
    nextEmptyIds = sourceState === 'empty' 
      ? reorderedSource 
      : targetState === 'empty' 
        ? reorderedTarget 
        : currentEmptyIds
  }

  // STEP 8: Return the new orderings
  // The UI will use these to update the visual representation
  return { fullIds: nextFullIds, emptyIds: nextEmptyIds }
}

/**
 * ============================================
 * SIDE-EFFECT FUNCTION
 * ============================================
 */

/**
 * COMMIT FUNCTION: Applies the new ordering to the world store.
 * 
 * WHY SEPARATE FROM resolveListReorder?
 * - This function has SIDE EFFECTS (it modifies the store)
 * - resolveListReorder is PURE (easier to test)
 * - Separation of concerns: calculation vs. persistence
 * 
 * WHAT HAPPENS HERE?
 * - For each ingredient in the reordered list:
 *   1. Update its 'state' (full/empty)
 *   2. Update its 'position' (the new index in the list)
 * 
 * WHY USE position: { x: 0, y: index }?
 * - This uses x/y coordinates for positioning in the 3D scene
 * - x=0 (centered), y=index (vertical position)
 * - This is how the ECS engine places ingredients in the tortilla world
 * 
 * @param updateEntity - Function to update an entity in the store
 * @param itemIds      - Ordered list of ingredient IDs
 * @param listState    - The state to apply to all items ('full' or 'empty')
 * 
 * @impure - Modifies external state via updateEntity
 */
export function applyListOrder(
  updateEntity: (entityId: string, changes: Partial<Omit<Entity, 'id'>>) => void,
  itemIds: string[],
  listState: IngredientListState,
) {
  // For each ingredient in the ordered list...
  itemIds.forEach((itemId, index) => {
    // Update the entity in the world store
    // - state: 'full' means it's IN the tortilla
    // - position: y=index controls its vertical position in the list
    updateEntity(itemId, { 
      state: listState, 
      position: { x: 0, y: index } 
    })
  })
}

/**
 * ============================================
 * USAGE EXAMPLE
 * ============================================
 * 
 * // In your React component:
 * 
 * import { useSelectionStore } from '../stores/selectionStore'
 * import { resolveListReorder, applyListOrder } from './ListReorderSystem'
 * 
 * function IngredientList() {
 *   const store = useSelectionStore()
 *   
 *   const handleDragEnd = (event: DragEndEvent) => {
 *     // 1. Calculate the new order (pure function)
 *     const result = resolveListReorder(
 *       event,
 *       store.fullIds,   // Current 'full' order
 *       store.emptyIds   // Current 'empty' order
 *     )
 *     
 *     if (!result) return // Invalid drag operation
 *     
 *     // 2. Apply the changes (side-effect function)
 *     applyListOrder(
 *       store.updateEntity,  // Store's update function
 *       result.fullIds,      // New 'full' order
 *       'full'               // State to apply
 *     )
 *     
 *     applyListOrder(
 *       store.updateEntity,
 *       result.emptyIds,
 *       'empty'
 *     )
 *   }
 *   
 *   // ... rest of component
 * }
 * 
 * ============================================
 * TESTING EXAMPLE
 * ============================================
 * 
 * import { resolveListReorder } from './ListReorderSystem'
 * 
 * describe('resolveListReorder', () => {
 *   it('should move item from full to empty', () => {
 *     const currentFull = ['tomato', 'onion']
 *     const currentEmpty = ['cheese', 'sauce']
 *     
 *     const result = resolveListReorder(
 *       { activeId: 'full::tomato', overId: 'empty::cheese' },
 *       currentFull,
 *       currentEmpty
 *     )
 *     
 *     // The result should remove 'tomato' from full and add it to empty
 *     expect(result.fullIds).toEqual(['onion'])
 *     expect(result.emptyIds).toEqual(['tomato', 'cheese', 'sauce'])
 *   })
 * })
 */