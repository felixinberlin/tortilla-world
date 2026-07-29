import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../../i18n/useTranslation';
import './PlayerGuideModal.scss';

interface PlayerGuideModalProps {
  onClose: () => void;
  isOpen: boolean;
}

export const PlayerGuideModal: React.FC<PlayerGuideModalProps> = ({ onClose, isOpen }) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { language, t } = useTranslation();
  const isSpanish = language === 'es';

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
              <h1 id="guide-title">{t('guide.title')}</h1>
              <p className="subtitle">{t('guide.subtitle')}</p>
            </div>

            <div className="player-guide-content">
              {isSpanish ? (
                <>
                  <section className="guide-section introduction">
                    <p>
                      ¡Bienvenido a la cocina! Tortilla World no es solo un libro de recetas digital; es una simulación viva donde interactúas con los objetos exactamente como lo harías en una cocina real.
                    </p>
                    <p>
                      En este mundo, todo—desde una cebolla hasta la propia sartén—es una "Entidad" física que puedes agarrar, mover y utilizar.
                    </p>
                  </section>

                  <section className="guide-section">
                    <h2>🧭 Parte 1: Lo Básico</h2>

                    <div className="subsection">
                      <h3>Cómo Funciona el Mundo</h3>
                      <p>
                        Manipulas el entorno utilizando <strong>Arrastrar y Soltar</strong>. No necesitas menús complejos para preparar ingredientes. Simplemente agarras una patata y la sueltas en la tabla de cortar, o los huevos en el bol de preparación.
                      </p>
                      <p>
                        Los objetos se mueven entre <strong>Contenedores</strong>. Un contenedor puede ser una balda de la despensa, un bol o un quemador caliente. Las reglas del mundo dictan qué sucede al soltar un objeto.
                      </p>
                    </div>

                    <div className="subsection">
                      <h3>Estaciones de Trabajo</h3>
                      <ul className="feature-list">
                        <li><span className="icon">🚪</span> <strong>Despensa (`despensa`):</strong> Donde se guardan los ingredientes crudos.</li>
                        <li><span className="icon">🚰</span> <strong>Fregadero (`sink`):</strong> Para lavar las verduras antes de usarlas.</li>
                        <li><span className="icon">🔪</span> <strong>Tabla de Cortar (`board`):</strong> La zona de preparación. Soltar verduras aquí las pica y pela automáticamente.</li>
                        <li><span className="icon">🥣</span> <strong>Bol de Preparación (`bowl`):</strong> Para combinar ingredientes. Aquí bates huevos y mezclas las verduras picadas.</li>
                        <li><span className="icon">🔥</span> <strong>Cocina (`burner`):</strong> Donde se aplica calor. Colocas la `Sartén` aquí, añades aceite y cocinas la mezcla.</li>
                        <li><span className="icon">🍽️</span> <strong>Plato de Servir (`plate`):</strong> El destino final de tu plato listo.</li>
                      </ul>
                    </div>
                  </section>

                  <section className="guide-section">
                    <h2>🍳 Parte 2: Mecánicas Avanzadas</h2>

                    <div className="subsection">
                      <h3>Cambio de Estado</h3>
                      <p>Los ingredientes cambian de estado según el contenedor en el que se encuentren.</p>
                      <ul className="bullet-list">
                        <li>Una patata entera en la tabla de cortar se convierte en <em>patatas cortadas</em>.</li>
                        <li>Un huevo entero en el bol se convierte en <em>huevos batidos</em>.</li>
                        <li>Una mezcla cruda en la sartén caliente se convierte en <em>cocinada</em>.</li>
                      </ul>
                    </div>

                    <div className="subsection">
                      <h3>Mecánica de Utensilios y Estaciones</h3>
                      <p>
                        ¡Las estaciones de trabajo representan utensilios en acción! En la versión actual, las estaciones procesan los ingredientes automáticamente al colocarlos (por ejemplo, la tabla pica verduras y el bol bate huevos automáticamente). El uso manual de herramientas individuales se incluirá en una próxima actualización.
                      </p>
                    </div>

                    <div className="subsection">
                      <h3>El Reproductor y Grabador de Acciones</h3>
                      <p>
                        A la izquierda de la pantalla, verás los controles para <strong>Reproducir Recetas del Catálogo</strong> y el <strong>Grabador de Acciones</strong>.
                      </p>
                      <ul className="bullet-list">
                        <li>Puedes ver a la Mascota realizar las acciones automáticamente al reproducir una receta.</li>
                        <li>Si cambias al Grabador de Acciones, la aplicación registrará cada movimiento para generar un script de receta personalizado.</li>
                      </ul>
                    </div>
                  </section>

                  <section className="guide-section tutorial-section">
                    <h2>👨‍🍳 Parte 3: Tutorial - Preparar una Tortilla Española</h2>
                    <p className="tutorial-intro">¡Juntemos todo y preparemos una clásica <em>Tortilla de Patatas</em>!</p>

                    <div className="step-card">
                      <h4>Paso 1: Preparar los Ingredientes</h4>
                      <ol>
                        <li><strong>Agarra</strong> las Patatas (🥔) de la Despensa y <strong>suéltalas</strong> en la Tabla de Cortar.</li>
                        <li><strong>Agarra</strong> la Cebolla (🧅) de la Despensa y <strong>suéltala</strong> en la Tabla de Cortar.</li>
                        <li>La Tabla de Cortar las convertirá automáticamente en <em>verduras cortadas</em>.</li>
                      </ol>
                    </div>

                    <div className="step-card">
                      <h4>Paso 2: Batir los Huevos</h4>
                      <ol>
                        <li><strong>Agarra</strong> los Huevos (🥚) de la Despensa y <strong>suéltalos</strong> en el Bol de Preparación.</li>
                        <li>El Bol convertirá automáticamente los huevos en <em>huevos batidos</em>.</li>
                      </ol>
                    </div>

                    <div className="step-card">
                      <h4>Paso 3: Mezclar</h4>
                      <ol>
                        <li><strong>Arrastra</strong> las patatas y cebollas picadas desde la Tabla hasta el Bol con los huevos batidos.</li>
                        <li>Añade una pizca de Sal (🧂) desde la Despensa al Bol.</li>
                        <li>¡Ahora tienes una <em>mezcla</em> unificada!</li>
                      </ol>
                    </div>

                    <div className="step-card">
                      <h4>Paso 4: Cocinar</h4>
                      <ol>
                        <li>Asegúrate de que la <code>Sartén</code> esté en el Quemador (`burner1`).</li>
                        <li>Arrastra el <code>Aceite de Oliva</code> (🫒) a la sartén.</li>
                        <li>Ahora, <strong>Arrastra</strong> la mezcla del Bol y <strong>suéltala</strong> en la Sartén.</li>
                        <li>¡Deja que el calor haga su trabajo!</li>
                      </ol>
                    </div>

                    <div className="step-card">
                      <h4>Paso 5: Servir</h4>
                      <ol>
                        <li>Una vez cocinada, <strong>arrastra</strong> la Tortilla terminada desde la Sartén al Plato de Servir.</li>
                      </ol>
                    </div>
                  </section>
                </>
              ) : (
                <>
                  <section className="guide-section introduction">
                    <p>
                      Welcome to the Kitchen! Tortilla World is not just a digital recipe book; it is a living simulation where you interact with objects just like you would in a real kitchen.
                    </p>
                    <p>
                      In this world, everything—from an onion to the frying pan itself—is a physical "Entity" that you can grab, move, and use.
                    </p>
                  </section>

                  <section className="guide-section">
                    <h2>🧭 Part 1: The Basics</h2>

                    <div className="subsection">
                      <h3>How the World Works</h3>
                      <p>
                        You manipulate the environment using <strong>Drag and Drop</strong>. You don't need complex menus to prepare ingredients. Instead, you grab a potato and drop it onto a cutting board, or drop eggs into a preparation bowl.
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
                        <li><span className="icon">🔪</span> <strong>Cutting Station (`board`):</strong> The zone for preparing ingredients. Dropping raw vegetables here cuts and peels them automatically.</li>
                        <li><span className="icon">🥣</span> <strong>Preparation Station (`bowl`):</strong> Used for combining ingredients. This is where you crack eggs, beat them, and mix in your chopped vegetables.</li>
                        <li><span className="icon">🔥</span> <strong>Cooking Station (`burner`):</strong> Where heat is applied. You place a `Pan` here, add oil, and fry, boil, or cook your mixtures.</li>
                        <li><span className="icon">🍽️</span> <strong>Serving Station (`plate`):</strong> The final destination for your completed dish.</li>
                      </ul>
                    </div>
                  </section>

                  <section className="guide-section">
                    <h2>🍳 Part 2: Advanced Mechanics</h2>

                    <div className="subsection">
                      <h3>Changing States</h3>
                      <p>Ingredients don't just move; they change state based on the container they inhabit.</p>
                      <ul className="bullet-list">
                        <li>A whole potato moved to the cutting board becomes <em>cut potatoes</em>.</li>
                        <li>A whole egg moved to a bowl becomes <em>beaten eggs</em>.</li>
                        <li>A raw mixture moved to a hot pan becomes <em>cooked</em>.</li>
                      </ul>
                    </div>

                    <div className="subsection">
                      <h3>Tools (Workstation Mechanics)</h3>
                      <p>
                        Workstations represent tools in action! In the current version, workstations process ingredients automatically upon placement (for example, the cutting board automatically chops vegetables and the bowl automatically mixes ingredients). Manual tool manipulation (like grabbing a separate knife or whisk) is coming in a future update.
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
                        <li>The Cutting Station converts your raw vegetables into <em>cut vegetables</em> automatically.</li>
                      </ol>
                    </div>

                    <div className="step-card">
                      <h4>Step 2: Beat the Eggs</h4>
                      <ol>
                        <li><strong>Grab</strong> the Eggs (🥚) from the Pantry and <strong>drop</strong> them into the Preparation Station (the Bowl).</li>
                        <li>The Bowl automatically transforms the eggs into <em>beaten eggs</em>.</li>
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
                      </ol>
                    </div>

                    <div className="step-card">
                      <h4>Step 5: Serve</h4>
                      <ol>
                        <li>Once the cooking is complete, <strong>drag</strong> the finished Tortilla from the Pan and <strong>drop</strong> it onto the Serving Station (the Plate).</li>
                      </ol>
                    </div>
                  </section>
                </>
              )}
            </div>

            <div className="player-guide-footer">
              <button
                ref={closeButtonRef}
                className="start-cooking-btn"
                onClick={onClose}
                aria-label="Close guide and start cooking"
              >
                {t('guide.startBtn')}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};