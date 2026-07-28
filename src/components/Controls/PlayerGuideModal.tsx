import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PlayerGuideModal.scss';

interface PlayerGuideModalProps {
  onClose: () => void;
  isOpen: boolean;
}

export const PlayerGuideModal: React.FC<PlayerGuideModalProps> = ({ onClose, isOpen }) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Trap focus or handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus the close button when opened for accessibility
  useEffect(() => {
    if (isOpen) {
      // Small timeout to allow animation to start
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="player-guide-overlay" role="dialog" aria-modal="true" aria-labelledby="guide-title">
          <motion.div
            className="player-guide-modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="player-guide-header">
              <h1 id="guide-title">Welcome to Tortilla World! 🌮</h1>
              <p className="subtitle">A Player's Guide to the Kitchen Simulation</p>
            </div>

            <div className="player-guide-content">
              <section className="guide-section introduction">
                <p>
                  Welcome to the Kitchen! Tortilla World is not just a digital recipe book; it is a living simulation where you interact with objects just like you would in a real kitchen.
                </p>
                <p>
                  In this world, everything—from an onion to a chef's knife to the frying pan itself—is a physical "Entity" that you can grab, move, and use.
                </p>
              </section>

              <section className="guide-section">
                <h2>🧭 Part 1: The Basics</h2>

                <div className="subsection">
                  <h3>How the World Works</h3>
                  <p>
                    You manipulate the environment using <strong>Drag and Drop</strong>. You don't click buttons to say "chop potato." Instead, you grab a potato and drop it onto a cutting board, then grab a knife to interact with it.
                  </p>
                  <p>
                    Objects are moved between <strong>Containers</strong>. A container can be a pantry shelf, a mixing bowl, or a hot burner. The rules of the world dictate what happens when you drop an item into a specific container.
                  </p>
                </div>

                <div className="subsection">
                  <h3>Workstations & Zones</h3>
                  <ul className="feature-list">
                    <li><span className="icon">🚪</span> <strong>Pantry (`despensa`):</strong> Where all your raw ingredients are stored.</li>
                    <li><span className="icon">🚰</span> <strong>Washing Station (`sink`):</strong> For cleaning vegetables before use.</li>
                    <li><span className="icon">🔪</span> <strong>Cutting Station (`board`):</strong> The zone for preparing ingredients. You'll need tools like a `Chef Knife` or `Vegetable Peeler` here.</li>
                    <li><span className="icon">🥣</span> <strong>Preparation Station (`bowl`):</strong> Used for combining ingredients. This is where you crack eggs, whisk them, and mix in your chopped vegetables.</li>
                    <li><span className="icon">🔥</span> <strong>Cooking Station (`burner`):</strong> Where heat is applied. You place a `Pan` here, add oil, and fry, boil, or cook your mixtures.</li>
                    <li><span className="icon">🍽️</span> <strong>Serving Station (`plate`):</strong> The final destination for your completed dish.</li>
                  </ul>
                </div>
              </section>

              <section className="guide-section">
                <h2>🍳 Part 2: Advanced Mechanics</h2>

                <div className="subsection">
                  <h3>Changing States</h3>
                  <p>Ingredients don't just move; they change.</p>
                  <ul className="bullet-list">
                    <li>A whole potato moved to the cutting board and acted upon becomes <em>cut potatoes</em>.</li>
                    <li>A whole egg moved to a bowl and whisked becomes <em>beaten eggs</em>.</li>
                    <li>A raw mixture moved to a hot pan becomes <em>cooked</em>.</li>
                  </ul>
                </div>

                <div className="subsection">
                  <h3>Tools</h3>
                  <p>
                    Tools are just as important as ingredients! A cutting board is useless without a knife. You'll find tools like the <code>Whisk</code>, <code>Spatula</code>, and <code>Knife</code> available to drag into your active workstations to trigger specific actions.
                  </p>
                </div>

                <div className="subsection">
                  <h3>The Action Player & Recorder</h3>
                  <p>
                    On the left side of your screen, you might notice controls for <strong>Play Catalog Recipe</strong> or the <strong>Action Recorder</strong>.
                  </p>
                  <ul className="bullet-list">
                    <li>You can watch the kitchen's Mascot automatically perform actions by playing a recipe.</li>
                    <li>If you switch to the Action Recorder, the game will record every drag and drop you make, generating a custom recipe script!</li>
                  </ul>
                </div>
              </section>

              <section className="guide-section tutorial-section">
                <h2>👨‍🍳 Part 3: Tutorial - Making a Spanish Tortilla</h2>
                <p className="tutorial-intro">Let's put it all together and make a classic <em>Tortilla de Patatas</em>.</p>

                <div className="step-card">
                  <h4>Step 1: Prep the Ingredients</h4>
                  <ol>
                    <li><strong>Grab</strong> the Potatoes (🥔) from the Pantry and <strong>drop</strong> them onto the Cutting Board.</li>
                    <li><strong>Grab</strong> the Onion (🧅) from the Pantry and <strong>drop</strong> it onto the Cutting Board.</li>
                    <li>Ensure you have your <code>Chef Knife</code> ready at the Cutting Station. The system will convert your raw vegetables into <em>cut vegetables</em>.</li>
                  </ol>
                </div>

                <div className="step-card">
                  <h4>Step 2: Beat the Eggs</h4>
                  <ol>
                    <li><strong>Grab</strong> the Eggs (🥚) from the Pantry and <strong>drop</strong> them into the Preparation Station (the Bowl).</li>
                    <li>Grab the <code>Whisk</code> tool and use it in the bowl. The eggs will transform into <em>beaten eggs</em>.</li>
                  </ol>
                </div>

                <div className="step-card">
                  <h4>Step 3: Mix it Up</h4>
                  <ol>
                    <li><strong>Drag</strong> your chopped potatoes and onions from the Cutting Board and <strong>drop</strong> them into the Bowl with the beaten eggs.</li>
                    <li>Add a pinch of Salt (🧂) from the Pantry to the Bowl.</li>
                    <li>They are now a unified <em>mixture</em>!</li>
                  </ol>
                </div>

                <div className="step-card">
                  <h4>Step 4: Cooking</h4>
                  <ol>
                    <li>Ensure your <code>Pan</code> is on the Cooking Station (`burner1`).</li>
                    <li>Drag <code>Olive Oil</code> (🫒) into the pan.</li>
                    <li>Now, <strong>Drag</strong> your mixture from the Bowl and <strong>drop</strong> it into the Pan.</li>
                    <li>Let the heat do its work!</li>
                    <li>If required by the recipe rules, you may need to use a <code>Spatula</code> to flip the tortilla midway.</li>
                  </ol>
                </div>

                <div className="step-card">
                  <h4>Step 5: Serve</h4>
                  <ol>
                    <li>Once the cooking is complete, <strong>drag</strong> the finished Tortilla from the Pan and <strong>drop</strong> it onto the Serving Station (the Plate).</li>
                  </ol>
                </div>
              </section>
            </div>

            <div className="player-guide-footer">
              <button
                ref={closeButtonRef}
                className="start-cooking-btn"
                onClick={onClose}
                aria-label="Close guide and start cooking"
              >
                Let's Start Cooking!
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};