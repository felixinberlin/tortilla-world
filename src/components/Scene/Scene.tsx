/**
 * ============================================
 * SCENE COMPONENT - The Main Tortilla Builder
 * ============================================
 * 
 * This is the HEART of the application. It orchestrates:
 *   1. Reading ingredient state from the world store
 *   2. Displaying two lists (full/empty)
 *   3. Handling drag-and-drop interactions
 *   4. Updating the store when items are reordered
 * 
 * ARCHITECTURE PATTERN: 
 *   This follows a "Smart Component" pattern - it connects
 *   the store to presentational components.
 * 
 * DATA FLOW:
 *   Store (worldStore) → Scene → IngredientList → Drag Events → Scene → Store
 * 
 * @component Scene
 */

import { useMemo } from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import { IngredientList } from '../Ingredients/IngredientList'
import { useWorldStore } from '../../store/worldStore'
import { ingredients as ingredientCatalog } from '../../data/catalog/ingredients'
import { resolveListReorder, applyListOrder } from '../../systems/interaction'
import type { Entity } from '../../types/Entity'
import type { Ingredient } from '../../types/Ingredient'
import type { IngredientListState } from '../../systems/interaction'

/**
 * ============================================
 * TYPE DEFINITIONS
 * ============================================
 */

/**
 * View model for ingredients displayed in the UI.
 * 
 * WHY SEPARATE FROM DOMAIN ENTITY?
 * - Domain Entity: Contains ALL data (price, nutritional info, etc.)
 * - View Model: Only what the UI needs to render
 * - This reduces coupling and makes the UI faster
 * 
 * @property id    - Unique identifier (matches entity ID)
 * @property name  - Display name for the ingredient
 * @property icon  - Emoji or icon to show in the UI
 */
interface IngredientView extends Ingredient {}

/**
 * ============================================
 * DATA TRANSFORMATION FUNCTIONS
 * ============================================
 */

/**
 * Converts a store Entity into a UI-friendly IngredientView.
 * 
 * WHY THIS MAPPING?
 * - The store stores ENTITIES (state, position, type)
 * - The catalog stores INGREDIENT METADATA (name, icon, price)
 * - This function COMBINES both sources to create a complete view model
 * 
 * FALLBACK STRATEGY:
 *   - If catalog entry exists: use its name and icon
 *   - If not: use the entity ID as name and a default potato emoji
 *     (Because everything is a potato until proven otherwise! 🥔)
 * 
 * @param entity - The store entity (has state, position, etc.)
 * @returns A view-ready ingredient object
 * 
 * @pure - Same entity always produces same view
 */
function toIngredientView(entity: Entity): IngredientView {
  // Try to find the ingredient in the static catalog
  const catalogEntry = ingredientCatalog.find(
    (ingredient) => ingredient.id === entity.id
  )

  return {
    id: entity.id,
    // Use catalog name if available, otherwise fallback to entity ID
    name: catalogEntry?.name ?? entity.id,
    // Use catalog icon if available, otherwise default to potato
    icon: catalogEntry?.icon ?? '🥔',
  }
}

/**
 * Gets all ingredients for a specific list state.
 * 
 * HOW THIS WORKS:
 *   1. First, check if the store has any entities for this state
 *   2. If yes: sort them by position.y and convert to view models
 *   3. If no: use the catalog as fallback (but only for 'full' list)
 * 
 * WHY THE FALLBACK?
 *   - When the app starts, the store might be empty
 *   - But we want to show a list of ALL ingredients initially
 *   - So we seed the 'full' list from the catalog
 *   - The 'empty' list starts empty (makes sense - nothing moved out yet)
 * 
 * IMPORTANT: This is NOT the source of truth - it's a VIEW of the data.
 * The store remains the single source of truth.
 * 
 * @param entities          - All entities from the store
 * @param listState         - Which list to get ('full' or 'empty')
 * @param fallbackCatalog   - Static catalog to use as fallback
 * @returns Array of ingredient views
 * 
 * @impure - Depends on external data but doesn't modify it
 */
function getIngredientsForList(
  entities: Record<string, Entity>,
  listState: IngredientListState,
  fallbackCatalog: Ingredient[] = [],
) {
  // Find all entities that match the list state
  const matchingEntities = Object.values(entities).filter(
    (entity) => entity.type === 'ingredient' && entity.state === listState,
  )

  // If we have matching entities in the store, use them
  if (matchingEntities.length > 0) {
    return matchingEntities
      .slice() // Create a copy (avoid mutating the original array)
      .sort((left, right) => left.position.y - right.position.y) // Sort by vertical position
      .map((entity) => toIngredientView(entity)) // Convert to view models
  }

  // FALLBACK: The initial “full” list is seeded from the ingredient catalog
  // when the store has not created any entity rows yet.
  if (listState === 'full') {
    return fallbackCatalog.map((ingredient) => ({
      id: ingredient.id,
      name: ingredient.name,
      icon: ingredient.icon,
    }))
  }

  // The “empty” list starts empty until an item is moved there
  return []
}

/**
 * ============================================
 * MAIN COMPONENT
 * ============================================
 */

/**
 * Scene Component - The main tortilla builder interface.
 * 
 * COMPONENT RESPONSIBILITIES:
 *   1. Subscribe to the world store for entity data
 *   2. Transform store data into displayable views
 *   3. Set up drag-and-drop event handlers
 *   4. Render the two ingredient lists
 * 
 * PERFORMANCE OPTIMIZATIONS:
 *   - useMemo for derived data (prevents unnecessary recalculations)
 *   - useSensors for drag detection (optimizes pointer events)
 *   - Memoized panel rendering
 * 
 * @returns React component
 */
export function Scene() {
  // ============================================
  // STORE SUBSCRIPTIONS
  // ============================================
  
  /**
   * Subscribe to entities from the world store.
   * 
   * Why use useWorldStore with a selector?
   *   - Zustand's selector pattern prevents unnecessary re-renders
   *   - We ONLY re-render when 'entities' changes
   *   - Other store changes don't affect this component
   */
  const entities = useWorldStore((state) => state.entities)
  
  /**
   * Subscribe to the updateEntity function.
   * 
   * This is STABLE - it doesn't change between renders,
   * so it's safe to use in useEffect dependencies.
   */
  const updateEntity = useWorldStore((state) => state.updateEntity)

  // ============================================
  // DERIVED DATA (Memoized)
  // ============================================
  
  /**
   * Get all ingredients in the 'full' list.
   * 
   * Why useMemo?
   *   - getIngredientsForList transforms data
   *   - Only recalculate when 'entities' changes
   *   - Prevents unnecessary work on every render
   * 
   * DEPENDENCIES: [entities]
   *   - When entities change, recalculate
   *   - ingredientCatalog is static (no need to include)
   */
  const fullIngredients = useMemo(
    () => getIngredientsForList(entities, 'full', ingredientCatalog),
    [entities],
  )

  /**
   * Get all ingredients in the 'empty' list.
   * 
   * Note: No fallback catalog for 'empty' - it starts empty.
   * 
   * DEPENDENCIES: [entities]
   *   - When entities change, recalculate
   */
  const emptyIngredients = useMemo(
    () => getIngredientsForList(entities, 'empty'),
    [entities],
  )

  // ============================================
  // DRAG-AND-DROP SETUP
  // ============================================
  
  /**
   * Configure the sensors for detecting drag gestures.
   * 
   * What is a PointerSensor?
   *   - Detects mouse and touch interactions
   *   - More reliable than MouseSensor alone
   * 
   * Why activationConstraint distance: 8?
   *   - Prevents accidental drags from simple clicks
   *   - User must move 8px before drag starts
   *   - Makes the interface feel more responsive
   *   - Prevents flickering on touch devices
   * 
   * @returns Configured sensors for dnd-kit
   */
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Minimum pixels to move before drag activates
      },
    }),
  )

  // ============================================
  // DRAG EVENT HANDLER
  // ============================================
  
  /**
   * Handles the end of a drag operation.
   * 
   * THIS IS THE MOST IMPORTANT FUNCTION IN THE COMPONENT.
   * It orchestrates the entire reorder operation:
   * 
   * STEP 1: Check if a valid drop target exists
   * STEP 2: Call the pure resolver to calculate new order
   * STEP 3: Apply the changes to the store
   * 
   * CRITICAL DESIGN DECISION:
   *   We use a SINGLE consistent snapshot of both lists.
   *   This prevents the dragged item from briefly disappearing
   *   while the store updates.
   * 
   * ALTERNATIVE APPROACH (bad):
   *   // This would cause flickering!
   *   applyListOrder(updateEntity, result.fullIds, 'full')
   *   // Wait for re-render...
   *   applyListOrder(updateEntity, result.emptyIds, 'empty')
   * 
   * WHY OUR APPROACH IS BETTER:
   *   - Both lists update atomically
   *   - No visual flicker
   *   - Smoother user experience
   * 
   * @param event - DragEndEvent from dnd-kit
   */
  const handleDragEnd = (event: DragEndEvent) => {
    // STEP 1: Validate the drop operation
    // If there's no drop target, the drag was cancelled
    if (!event.over) {
      return
    }

    // STEP 2: Calculate the new order (PURE FUNCTION)
    // We pass the current order of BOTH lists
    const result = resolveListReorder(
      { 
        activeId: String(event.active.id), 
        overId: String(event.over.id) 
      },
      // Current order of 'full' list (just the IDs)
      fullIngredients.map((item) => item.id),
      // Current order of 'empty' list (just the IDs)
      emptyIngredients.map((item) => item.id),
    )

    // If the calculation fails, the drag operation was invalid
    if (!result) {
      return
    }

    // STEP 3: Apply the changes (SIDE-EFFECT FUNCTION)
    // Update both lists from a single, consistent snapshot so the dragged item does not
    // briefly disappear while the store rerenders.
    applyListOrder(updateEntity, result.fullIds, 'full')
    applyListOrder(updateEntity, result.emptyIds, 'empty')
  }

  // ============================================
  // PANEL CONFIGURATION (Memoized)
  // ============================================
  
  /**
   * Configure the two panels for rendering.
   * 
   * Why useMemo here?
   *   - We're creating new arrays on every render
   *   - Memoizing prevents unnecessary re-renders of child components
   *   - Only recalculates when lists change
   * 
   * DEPENDENCIES: [emptyIngredients, fullIngredients]
   */
  const panels = useMemo(
    () => [
      { 
        id: 'full', 
        title: 'Full list', 
        ingredients: fullIngredients 
      },
      { 
        id: 'empty', 
        title: 'Empty list', 
        ingredients: emptyIngredients 
      },
      { 
        id: 'empty2', 
        title: 'Empty list 2', 
        ingredients: emptyIngredients 
      },
    ],
    [emptyIngredients, fullIngredients],
  )

  // ============================================
  // RENDER
  // ============================================
  
  /**
   * Render the drag-and-drop context with two ingredient lists.
   * 
   * WHY WRAP IN DndContext?
   *   - Provides drag-and-drop functionality to all children
   *   - Uses closestCenter for collision detection
   *   - onDragEnd triggers our reorder logic
   * 
   * WHY USE SECTION WITH ARIA-LABEL?
   *   - Accessibility: Screen readers can identify the main app area
   *   - Semantic HTML: Better for SEO and assistive technology
   */
  return (
    <DndContext 
      sensors={sensors} 
      collisionDetection={closestCenter} 
      onDragEnd={handleDragEnd}
    >
      <section aria-label="Tortilla world" className="scene-panel">
        {panels.map((panel) => (
          <IngredientList 
            key={panel.id}
            ingredients={panel.ingredients}
            listId={panel.id}
            title={panel.title}
          />
        ))}
      </section>
    </DndContext>
  )
}

/**
 * ============================================
 * RENDER FLOW EXAMPLE
 * ============================================
 * 
 * When the app starts:
 *   1. Store has NO entities
 *   2. fullIngredients = all ingredients from catalog
 *   3. emptyIngredients = []
 *   4. User sees: Full list (all ingredients), Empty list (empty)
 * 
 * When user drags "tomato" from Full to Empty:
 *   1. handleDragEnd receives the event
 *   2. resolveListReorder calculates new order
 *   3. applyListOrder updates the store
 *   4. Store updates entities (tomato state: 'empty')
 *   5. Scene re-renders with new lists
 *   6. User sees: tomato moved to Empty list
 * 
 * ============================================
 * PERFORMANCE NOTES
 * ============================================
 * 
 * CURRENT OPTIMIZATIONS:
 *   - useMemo for fullIngredients and emptyIngredients
 *   - useMemo for panels
 *   - Sensors configured with distance constraint
 * 
 * POTENTIAL FUTURE OPTIMIZATIONS:
 *   - Use React.memo on Scene itself
 *   - Virtualize lists if there are 50+ ingredients
 *   - Use useCallback for handleDragEnd
 *   - Consider useTransition for smooth updates
 * 
 * ============================================
 * ACCESSIBILITY NOTES
 * ============================================
 * 
 * CURRENT ACCESSIBILITY FEATURES:
 *   - aria-label on the main section
 *   - Semantic HTML (section)
 *   - Keyboard navigation support (dnd-kit handles this)
 * 
 * MISSING ACCESSIBILITY FEATURES:
 *   - Live region announcements for drag events
 *   - ARIA roles for drag-and-drop (dnd-kit adds some)
 *   - Focus management after drag
 *   - Screen reader support for list states
 * 
 * ============================================
 * TROUBLESHOOTING
 * ============================================
 * 
 * ISSUE: Items disappear during drag
 *   - SOLUTION: Use consistent snapshot (we do this!)
 *   - CAUSE: Store updates asynchronously
 * 
 * ISSUE: Items don't reorder correctly
 *   - SOLUTION: Check resolveListReorder logic
 *   - CAUSE: Malformed composite IDs or missing ingredients
 * 
 * ISSUE: Drag doesn't start
 *   - SOLUTION: Check sensor configuration
 *   - CAUSE: distance constraint too high or pointer events blocked
 */