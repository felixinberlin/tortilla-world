This file is a merged representation of a subset of the codebase, containing specifically included files, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Only files matching these patterns are included: .
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
docs/
  architecture.md
  decisions.md
  entities.md
  README.md
  redux-devtools-actions.json
  redux-devtools-commands.md
  roadmap.md
  systems.md
public/
  favicon.svg
  icons.svg
src/
  assets/
    hero.png
  components/
    Controls/
      ActionRecorder.scss
      ActionRecorder.tsx
      ActionReplayer.scss
      ActionReplayer.test.tsx
      ActionReplayer.tsx
      IngredientsSidebar.scss
      IngredientsSidebar.tsx
    Ingredients/
      Ingredient.tsx
      IngredientList.tsx
      IngredientListItem.tsx
      Ingredients.scss
      RecipeIngredientItem.tsx
      RecipeIngredientList.tsx
    Mascot/
      Mascot.tsx
      TortillaSvg.scss
      TortillaSvg.tsx
    Recipe/
      RecipePanel.scss
      RecipePanel.tsx
      RecipeRequirements.tsx
      RequirementView.tsx
    Scene/
      RecipePlayer.scss
      RecipePlayer.tsx
      Scene.tsx
      useSceneDragAndDrop.ts
    World/
      ContainerView.tsx
      EntityIcon.tsx
      EntityStateBadge.tsx
      EntityView.tsx
      rendererRegistry.ts
      World.scss
  data/
    catalog/
      recipes/
        clasica.ts
        concebolla.ts
        index.ts
        recipes.test.ts
      ingredients.ts
      tools.ts
      workstations.ts
  engine/
    containerRules.ts
    ingredientState.ts
    workstations.test.ts
    workstations.ts
  store/
    middleware/
      actionLog.test.ts
      actionLog.ts
    slices/
      containerSlice.ts
      entitySlice.ts
      mascotSlice.ts
      recordSlice.test.ts
      recordSlice.ts
    defaults.ts
    gazeStore.ts
    selectors.ts
    types.ts
    worldStore.test.ts
    worldStore.ts
  styles/
    _mixins.scss
    _variables.scss
  systems/
    recipeRunner/
      handlers/
        cookHandlers.test.ts
        cookHandlers.ts
        mixHandlers.ts
        moveHandlers.ts
        prepHandlers.ts
        utilityHandlers.ts
      RecipeRunner.ts
      types.ts
    actionPlayer.test.ts
    actionPlayer.ts
    clasicaCompletion.test.ts
    gaze.test.ts
    gaze.ts
    ingredientUsage.test.ts
    mascot.ts
    mascotActions.test.ts
    mascotActions.ts
    movement.ts
    queries.test.ts
    queries.ts
    recipeMatcher.test.ts
    recipeMatcher.ts
    recipeRunner.test.ts
    recipeRunner.ts
    recipeTranslator.test.ts
    recipeTranslator.ts
  types/
    actions.ts
    Ingredient.ts
    IngredientList.ts
    Recipe.ts
    RecipeIngredient.ts
    RecipeList.ts
    RecipeStep.ts
    recording.ts
    Requirement.ts
    tools.ts
    workstations.ts
    world.ts
  App.tsx
  index.scss
  main.tsx
  repomix-output.xml
.gitignore
AGENTS.md
eslint.config.js
index.html
package.json
README.md
repomix-output.xml
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vite.config.ts
```

# Files

## File: docs/README.md
`````markdown
# Tortilla World

Interactive React application where a tortilla mascot lives in a virtual kitchen.

The user can interact with ingredients, recipes and kitchen objects.

## Stack

- React
- TypeScript
- Zustand
- Framer Motion
- Vite

## Main concept

The application has a small world-state layer.
Objects exist independently from the UI.

Components render the world.
Systems modify the world.
`````

## File: public/favicon.svg
`````xml
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="46" fill="none" viewBox="0 0 48 46"><path fill="#863bff" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z" style="fill:#863bff;fill:color(display-p3 .5252 .23 1);fill-opacity:1"/><mask id="a" width="48" height="46" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#000" d="M25.842 44.938c-.664.844-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.183c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.498 0-3.579-1.842-3.579H1.133c-.92 0-1.456-1.04-.92-1.787L9.91.473c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.578 1.842 3.578h11.377c.943 0 1.473 1.088.89 1.832L25.843 44.94z" style="fill:#000;fill-opacity:1"/></mask><g mask="url(#a)"><g filter="url(#b)"><ellipse cx="5.508" cy="14.704" fill="#ede6ff" rx="5.508" ry="14.704" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -4.47 31.516)"/></g><g filter="url(#c)"><ellipse cx="10.399" cy="29.851" fill="#ede6ff" rx="10.399" ry="29.851" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -39.328 7.883)"/></g><g filter="url(#d)"><ellipse cx="5.508" cy="30.487" fill="#7e14ff" rx="5.508" ry="30.487" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -25.913 -14.639)scale(1 -1)"/></g><g filter="url(#e)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -32.644 -3.334)scale(1 -1)"/></g><g filter="url(#f)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -34.34 30.47)"/></g><g filter="url(#g)"><ellipse cx="14.072" cy="22.078" fill="#ede6ff" rx="14.072" ry="22.078" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="rotate(93.35 24.506 48.493)scale(-1 1)"/></g><g filter="url(#h)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#i)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#j)"><ellipse cx=".387" cy="8.972" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(39.51 .387 8.972)"/></g><g filter="url(#k)"><ellipse cx="47.523" cy="-6.092" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 47.523 -6.092)"/></g><g filter="url(#l)"><ellipse cx="41.412" cy="6.333" fill="#47bfff" rx="5.971" ry="9.665" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 41.412 6.333)"/></g><g filter="url(#m)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#n)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#o)"><ellipse cx="35.651" cy="29.907" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 35.651 29.907)"/></g><g filter="url(#p)"><ellipse cx="38.418" cy="32.4" fill="#47bfff" rx="5.971" ry="15.297" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 38.418 32.4)"/></g></g><defs><filter id="b" width="60.045" height="41.654" x="-19.77" y="16.149" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="c" width="90.34" height="51.437" x="-54.613" y="-7.533" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="d" width="79.355" height="29.4" x="-49.64" y="2.03" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="e" width="79.579" height="29.4" x="-45.045" y="20.029" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="f" width="79.579" height="29.4" x="-43.513" y="21.178" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="g" width="74.749" height="58.852" x="15.756" y="-17.901" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="h" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="i" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="j" width="56.045" height="63.649" x="-27.636" y="-22.853" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="k" width="54.814" height="64.646" x="20.116" y="-38.415" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="l" width="33.541" height="35.313" x="24.641" y="-11.323" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="m" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="n" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="o" width="54.814" height="64.646" x="8.244" y="-2.416" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="p" width="39.409" height="43.623" x="18.713" y="10.588" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter></defs></svg>
`````

## File: public/icons.svg
`````xml
<svg xmlns="http://www.w3.org/2000/svg">
  <symbol id="bluesky-icon" viewBox="0 0 16 17">
    <g clip-path="url(#bluesky-clip)"><path fill="#08060d" d="M7.75 7.735c-.693-1.348-2.58-3.86-4.334-5.097-1.68-1.187-2.32-.981-2.74-.79C.188 2.065.1 2.812.1 3.251s.241 3.602.398 4.13c.52 1.744 2.367 2.333 4.07 2.145-2.495.37-4.71 1.278-1.805 4.512 3.196 3.309 4.38-.71 4.987-2.746.608 2.036 1.307 5.91 4.93 2.746 2.72-2.746.747-4.143-1.747-4.512 1.702.189 3.55-.4 4.07-2.145.156-.528.397-3.691.397-4.13s-.088-1.186-.575-1.406c-.42-.19-1.06-.395-2.741.79-1.755 1.24-3.64 3.752-4.334 5.099"/></g>
    <defs><clipPath id="bluesky-clip"><path fill="#fff" d="M.1.85h15.3v15.3H.1z"/></clipPath></defs>
  </symbol>
  <symbol id="discord-icon" viewBox="0 0 20 19">
    <path fill="#08060d" d="M16.224 3.768a14.5 14.5 0 0 0-3.67-1.153c-.158.286-.343.67-.47.976a13.5 13.5 0 0 0-4.067 0c-.128-.306-.317-.69-.476-.976A14.4 14.4 0 0 0 3.868 3.77C1.546 7.28.916 10.703 1.231 14.077a14.7 14.7 0 0 0 4.5 2.306q.545-.748.965-1.587a9.5 9.5 0 0 1-1.518-.74q.191-.14.372-.293c2.927 1.369 6.107 1.369 8.999 0q.183.152.372.294-.723.437-1.52.74.418.838.963 1.588a14.6 14.6 0 0 0 4.504-2.308c.37-3.911-.63-7.302-2.644-10.309m-9.13 8.234c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.894 0 1.614.82 1.599 1.82.001 1-.705 1.82-1.6 1.82m5.91 0c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.893 0 1.614.82 1.599 1.82 0 1-.706 1.82-1.6 1.82"/>
  </symbol>
  <symbol id="documentation-icon" viewBox="0 0 21 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="m15.5 13.333 1.533 1.322c.645.555.967.833.967 1.178s-.322.623-.967 1.179L15.5 18.333m-3.333-5-1.534 1.322c-.644.555-.966.833-.966 1.178s.322.623.966 1.179l1.534 1.321"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M17.167 10.836v-4.32c0-1.41 0-2.117-.224-2.68-.359-.906-1.118-1.621-2.08-1.96-.599-.21-1.349-.21-2.848-.21-2.623 0-3.935 0-4.983.369-1.684.591-3.013 1.842-3.641 3.428C3 6.449 3 7.684 3 10.154v2.122c0 2.558 0 3.838.706 4.726q.306.383.713.671c.76.536 1.79.64 3.581.66"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M3 10a2.78 2.78 0 0 1 2.778-2.778c.555 0 1.209.097 1.748-.047.48-.129.854-.503.982-.982.145-.54.048-1.194.048-1.749a2.78 2.78 0 0 1 2.777-2.777"/>
  </symbol>
  <symbol id="github-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M9.356 1.85C5.05 1.85 1.57 5.356 1.57 9.694a7.84 7.84 0 0 0 5.324 7.44c.387.079.528-.168.528-.376 0-.182-.013-.805-.013-1.454-2.165.467-2.616-.935-2.616-.935-.349-.91-.864-1.143-.864-1.143-.71-.48.051-.48.051-.48.787.051 1.2.805 1.2.805.695 1.194 1.817.857 2.268.649.064-.507.27-.857.49-1.052-1.728-.182-3.545-.857-3.545-3.87 0-.857.31-1.558.8-2.104-.078-.195-.349-1 .077-2.078 0 0 .657-.208 2.14.805a7.5 7.5 0 0 1 1.946-.26c.657 0 1.328.092 1.946.26 1.483-1.013 2.14-.805 2.14-.805.426 1.078.155 1.883.078 2.078.502.546.799 1.247.799 2.104 0 3.013-1.818 3.675-3.558 3.87.284.247.528.714.528 1.454 0 1.052-.012 1.896-.012 2.156 0 .208.142.455.528.377a7.84 7.84 0 0 0 5.324-7.441c.013-4.338-3.48-7.844-7.773-7.844" clip-rule="evenodd"/>
  </symbol>
  <symbol id="social-icon" viewBox="0 0 20 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M12.5 6.667a4.167 4.167 0 1 0-8.334 0 4.167 4.167 0 0 0 8.334 0"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M2.5 16.667a5.833 5.833 0 0 1 8.75-5.053m3.837.474.513 1.035c.07.144.257.282.414.309l.93.155c.596.1.736.536.307.965l-.723.73a.64.64 0 0 0-.152.531l.207.903c.164.715-.213.991-.84.618l-.872-.52a.63.63 0 0 0-.577 0l-.872.52c-.624.373-1.003.094-.84-.618l.207-.903a.64.64 0 0 0-.152-.532l-.723-.729c-.426-.43-.289-.864.306-.964l.93-.156a.64.64 0 0 0 .412-.31l.513-1.034c.28-.562.735-.562 1.012 0"/>
  </symbol>
  <symbol id="x-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M1.893 1.98c.052.072 1.245 1.769 2.653 3.77l2.892 4.114c.183.261.333.48.333.486s-.068.089-.152.183l-.522.593-.765.867-3.597 4.087c-.375.426-.734.834-.798.905a1 1 0 0 0-.118.148c0 .01.236.017.664.017h.663l.729-.83c.4-.457.796-.906.879-.999a692 692 0 0 0 1.794-2.038c.034-.037.301-.34.594-.675l.551-.624.345-.392a7 7 0 0 1 .34-.374c.006 0 .93 1.306 2.052 2.903l2.084 2.965.045.063h2.275c1.87 0 2.273-.003 2.266-.021-.008-.02-1.098-1.572-3.894-5.547-2.013-2.862-2.28-3.246-2.273-3.266.008-.019.282-.332 2.085-2.38l2-2.274 1.567-1.782c.022-.028-.016-.03-.65-.03h-.674l-.3.342a871 871 0 0 1-1.782 2.025c-.067.075-.405.458-.75.852a100 100 0 0 1-.803.91c-.148.172-.299.344-.99 1.127-.304.343-.32.358-.345.327-.015-.019-.904-1.282-1.976-2.808L6.365 1.85H1.8zm1.782.91 8.078 11.294c.772 1.08 1.413 1.973 1.425 1.984.016.017.241.02 1.05.017l1.03-.004-2.694-3.766L7.796 5.75 5.722 2.852l-1.039-.004-1.039-.004z" clip-rule="evenodd"/>
  </symbol>
</svg>
`````

## File: eslint.config.js
`````javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
])
`````

## File: index.html
`````html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>tortilla-world</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`````

## File: tsconfig.app.json
`````json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023", "DOM"],
    "module": "esnext",
    "types": ["vite/client"],
    "allowArbitraryExtensions": true,
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
`````

## File: tsconfig.json
`````json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
`````

## File: tsconfig.node.json
`````json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023"],
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "module": "nodenext",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}
`````

## File: vite.config.ts
`````typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
`````

## File: docs/redux-devtools-actions.json
`````json
[
  {
    "type": "MASCOT_MOVE",
    "payload": {
      "mascotId": "chef",
      "targetContainerId": "despensa"
    }
  },
  {
    "type": "MASCOT_GRAB",
    "payload": {
      "mascotId": "chef",
      "entityId": "potato",
      "sourceContainerId": "despensa"
    }
  },
  {
    "type": "MASCOT_MOVE",
    "payload": {
      "mascotId": "chef",
      "targetContainerId": "board"
    }
  },
  {
    "type": "MASCOT_DROP",
    "payload": {
      "mascotId": "chef",
      "targetContainerId": "board"
    }
  },
  {
    "type": "MASCOT_FLIP",
    "payload": {
      "mascotId": "chef"
    }
  }
]
`````

## File: src/components/Ingredients/Ingredient.tsx
`````typescript
/**
 * FILE: Ingredient.tsx
 *
 * PURPOSE:
 * Visual representation of one ingredient.
 *
 * RESPONSIBILITY:
 * - Displays ingredient information.
 * - Handles ingredient presentation only.
 *
 * SHOULD NOT:
 * - Manage inventory.
 * - Apply game rules.
 * - Modify world state.
 */

import type { Ingredient as IngredientModel } from '../../types/Ingredient'

interface IngredientProps {
  ingredient: IngredientModel
}

export function Ingredient({ ingredient }: IngredientProps) {
  return (
    <>
      <span aria-hidden="true">{ingredient.icon}</span>
      <span>{ingredient.name}</span>
    </>
  )
}
`````

## File: src/components/Recipe/RecipeRequirements.tsx
`````typescript
/**
 * FILE: RecipeRequirements.tsx
 *
 * PURPOSE:
 * Displays all requirements for a recipe.
 *
 * RESPONSIBILITY:
 * - Renders list of required entities.
 */

import React from 'react';
import type { Requirement } from '../../types/Requirement';
import { RequirementView } from './RequirementView';

interface RecipeRequirementsProps {
  requirements: Requirement[];
}

export const RecipeRequirements: React.FC<RecipeRequirementsProps> = ({ requirements }) => {
  return (
    <ul className="recipe-requirements">
      {requirements.map((req, idx) => (
        <RequirementView key={req.id || `${req.entityId}-${idx}`} requirement={req} />
      ))}
    </ul>
  );
};
`````

## File: src/components/World/EntityIcon.tsx
`````typescript
/**
 * FILE: EntityIcon.tsx
 *
 * PURPOSE:
 * Visual icon representation for any entity in the world (ingredients, tools, containers, products).
 *
 * RESPONSIBILITY:
 * - Renders symbol/icon based on entity data, catalog lookup, or entity type fallback.
 */

import React from 'react';
import type { Entity } from '../../types/world';
import { ingredients } from '../../data/catalog/ingredients';
import { catalogTools as tools } from '../../data/catalog/tools';

interface EntityIconProps {
  entity?: Entity;
  icon?: string;
  entityId?: string;
  type?: string;
}

const FALLBACK_ICONS: Record<string, string> = {
  potato: '🥔',
  egg: '🥚',
  onion: '🧅',
  oil: '🫗',
  salt: '🧂',
  pepper: '🌶️',
  knife: '🔪',
  pan: '🍳',
  plate: '🍽️',
  bowl: '🥣',
  sink: '💧',
  board: '🪵',
  tortilla: '🫓',
};

export const EntityIcon: React.FC<EntityIconProps> = ({ entity, icon, entityId, type }) => {
  if (icon) {
    return <span className="entity-icon" aria-hidden="true">{icon}</span>;
  }

  if (entity?.icon) {
    return <span className="entity-icon" aria-hidden="true">{entity.icon}</span>;
  }

  const lookupId = entity?.ingredientId || entity?.id || entityId || '';

  // Catalog lookup
  const catalogIng = ingredients.find((i) => i.id === lookupId || lookupId.startsWith(i.id));
  if (catalogIng?.icon) {
    return <span className="entity-icon" aria-hidden="true">{catalogIng.icon}</span>;
  }

  const catalogTool = tools.find((t) => t.id === lookupId || lookupId.startsWith(t.id));
  if (catalogTool?.icon) {
    return <span className="entity-icon" aria-hidden="true">{catalogTool.icon}</span>;
  }

  // Prefix key match
  for (const [key, fallbackIcon] of Object.entries(FALLBACK_ICONS)) {
    if (lookupId.toLowerCase().includes(key)) {
      return <span className="entity-icon" aria-hidden="true">{fallbackIcon}</span>;
    }
  }

  const defaultTypeIcon = type === 'tool' ? '🔧' : type === 'container' ? '📦' : '📦';

  return <span className="entity-icon" aria-hidden="true">{defaultTypeIcon}</span>;
};
`````

## File: src/components/World/EntityStateBadge.tsx
`````typescript
/**
 * FILE: EntityStateBadge.tsx
 *
 * PURPOSE:
 * Displays status/state indicator badges for world entities.
 *
 * RESPONSIBILITY:
 * - Reflects state changes such as Raw, Prepared, Cooking, or Finished.
 */

import React from 'react';
import type { Entity } from '../../types/world';

interface EntityStateBadgeProps {
  entity: Entity;
  containerId?: string;
}

export const EntityStateBadge: React.FC<EntityStateBadgeProps> = ({ entity, containerId }) => {
  const prep = entity.state?.preparation as string | undefined;
  const cooking = entity.state?.cooking as string | undefined;
  const status = entity.state?.status as string | undefined;

  if (containerId === 'plate' || status?.includes('cooked') || status?.includes('fried') || status?.includes('tortilla')) {
    return <span className="entity-view__state entity-view__state--finished">Finished ✨</span>;
  }

  if (cooking && cooking !== 'raw') {
    return <span className="entity-view__state entity-view__state--cooking">Cooking 🔥</span>;
  }

  if (prep) {
    return <span className="entity-view__state entity-view__state--prepared">{prep} 🔪</span>;
  }

  if (entity.type === 'ingredient') {
    return <span className="entity-view__state entity-view__state--raw">Raw 🌾</span>;
  }

  return null;
};
`````

## File: src/components/World/rendererRegistry.ts
`````typescript
/**
 * FILE: rendererRegistry.ts
 *
 * PURPOSE:
 * Registry for custom entity type renderers.
 */

import React from 'react';
import type { Entity } from '../../types/world';

export interface EntityRendererProps {
  entity: Entity;
  containerId?: string;
  readOnly?: boolean;
}

export type EntityRenderer = React.ComponentType<EntityRendererProps>;

export const entityRendererRegistry: Record<string, EntityRenderer> = {};

export function registerEntityRenderer(type: string, renderer: EntityRenderer): void {
  entityRendererRegistry[type] = renderer;
}
`````

## File: src/data/catalog/tools.ts
`````typescript
/**
 * FILE: tools.ts
 *
 * PURPOSE:
 * Catalog of reusable kitchen tools as first-class entities.
 */

import type { ToolCatalogItem } from '../../types/tools';

export const catalogTools: ToolCatalogItem[] = [
  { id: 'knife', name: 'Chef Knife', icon: '🔪', category: 'cutting' },
  { id: 'peeler', name: 'Vegetable Peeler', icon: '🥔', category: 'cutting' },
  { id: 'whisk', name: 'Whisk', icon: '🥣', category: 'mixing' },
  { id: 'fork', name: 'Fork', icon: '🍴', category: 'mixing' },
  { id: 'spatula', name: 'Spatula', icon: '🍳', category: 'cooking' },
  { id: 'grater', name: 'Grater', icon: '🧀', category: 'cutting' },
  { id: 'mandoline', name: 'Mandoline', icon: '🔪', category: 'cutting' },
  { id: 'spoon', name: 'Spoon', icon: '🥄', category: 'mixing' },
];
`````

## File: src/engine/workstations.test.ts
`````typescript
/**
 * FILE: workstations.test.ts
 *
 * PURPOSE:
 * Unit tests for workstation mapping and tool resolution logic.
 */

import { describe, expect, it } from 'vitest';
import { findWorkstationForStep, findToolsForStep } from './workstations';
import { KITCHEN_WORKSTATIONS } from '../data/catalog/workstations';

describe('Workstations Engine', () => {
  it('maps steps to correct workstations', () => {
    expect(findWorkstationForStep({ action: 'prepare', target: 'potatoes', preparation: 'peeled' }))
      .toBe(KITCHEN_WORKSTATIONS.cutting_station);

    expect(findWorkstationForStep({ action: 'prepare', target: 'eggs', preparation: 'beaten' }))
      .toBe(KITCHEN_WORKSTATIONS.preparation_station);

    expect(findWorkstationForStep({ action: 'cook', target: 'potatoes', method: 'fry' }))
      .toBe(KITCHEN_WORKSTATIONS.cooking_station);

    expect(findWorkstationForStep({ action: 'mix', inputs: ['potatoes', 'eggs'] }))
      .toBe(KITCHEN_WORKSTATIONS.preparation_station);

    expect(findWorkstationForStep({ action: 'serve', target: 'mixture' }))
      .toBe(KITCHEN_WORKSTATIONS.serving_station);

    expect(findWorkstationForStep({ action: 'wash', target: 'potatoes' }))
      .toBe(KITCHEN_WORKSTATIONS.washing_station);
  });

  it('determines required/recommended tools for steps', () => {
    expect(findToolsForStep({ action: 'prepare', target: 'potatoes', preparation: 'peeled' }))
      .toEqual(['peeler', 'knife']);

    expect(findToolsForStep({ action: 'cut', ingredient: 'potato', style: 'sliced' }))
      .toEqual(['knife']);

    expect(findToolsForStep({ action: 'mix', inputs: ['potatoes', 'eggs'] }))
      .toEqual(['whisk', 'fork', 'spoon']);

    expect(findToolsForStep({ action: 'cook', target: 'oil', method: 'heat' }))
      .toEqual(['spatula', 'pan']);
  });
});
`````

## File: src/engine/workstations.ts
`````typescript
/**
 * FILE: workstations.ts (Engine)
 *
 * PURPOSE:
 * Logic to map recipe steps and cooking actions to workstations and required tools.
 *
 * RESPONSIBILITY:
 * - Decides which workstation should handle an action.
 * - Determines required and available tools for an action.
 */

import type { RecipeStep } from '../types/RecipeStep';
import type { Workstation } from '../types/workstations';
import { KITCHEN_WORKSTATIONS } from '../data/catalog/workstations';

/**
 * Automatically determines the appropriate Workstation for a given RecipeStep.
 */
export function findWorkstationForStep(step: RecipeStep): Workstation {
  const action = step.action;

  if (action === 'prepare' || action === 'cut') {
    const prep = (step.preparation || step.style || '').toLowerCase();
    if (['beaten', 'whisked', 'kneaded', 'seasoned', 'cracked'].includes(prep)) {
      return KITCHEN_WORKSTATIONS.preparation_station;
    }
    return KITCHEN_WORKSTATIONS.cutting_station;
  }

  if (action === 'cook') {
    return KITCHEN_WORKSTATIONS.cooking_station;
  }

  if (action === 'mix' || action === 'beat') {
    return KITCHEN_WORKSTATIONS.preparation_station;
  }

  if (action === 'serve') {
    return KITCHEN_WORKSTATIONS.serving_station;
  }

  if (action === 'wash' || action === 'rinse' || action === 'drain') {
    return KITCHEN_WORKSTATIONS.washing_station;
  }

  if (action === 'move' || action === 'grab' || action === 'drop') {
    return KITCHEN_WORKSTATIONS.pantry;
  }

  return KITCHEN_WORKSTATIONS.cutting_station;
}

/**
 * Determines the tool requirements for a given RecipeStep.
 */
export function findToolsForStep(step: RecipeStep): string[] {
  const action = step.action;

  if (action === 'prepare' || action === 'cut') {
    const prep = (step.preparation || step.style || '').toLowerCase();
    if (prep === 'peeled') {
      return ['peeler', 'knife'];
    }
    if (prep === 'beaten' || prep === 'whisked') {
      return ['whisk', 'fork'];
    }
    if (prep === 'grated') {
      return ['grater'];
    }
    return ['knife'];
  }

  if (action === 'mix' || action === 'beat') {
    return ['whisk', 'fork', 'spoon'];
  }

  if (action === 'cook') {
    return ['spatula', 'pan'];
  }

  return [];
}
`````

## File: src/store/slices/containerSlice.ts
`````typescript
/**
 * FILE: containerSlice.ts
 *
 * PURPOSE:
 * Zustand slice for container management and entity transfers/movements.
 *
 * RESPONSIBILITY:
 * - Mutates container entity IDs in world state.
 * - Enforces container rules and handles immutable source container copies.
 */

import type { StateCreator } from 'zustand/vanilla';
import type { Container, Entity } from '../../types/world';
import type { WorldStateStore } from '../types';
import { validateContainerRules } from '../../engine/containerRules';

export interface ContainerSlice {
  containers: Record<string, Container>;
  moveEntity: (entityId: string, targetContainerId: string, positionIndex?: number) => void;
}

export const createContainerSlice: StateCreator<
  WorldStateStore,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  ContainerSlice
> = (set, get) => ({
  containers: {},

  moveEntity: (entityId, targetContainerId, positionIndex) => {
    const state = get();
    const entity = state.entities[entityId];
    const targetContainer = state.containers[targetContainerId];
    if (!entity || !targetContainer) return;

    const sourceContainer = Object.values(state.containers).find((c) =>
      c.entityIds.includes(entityId)
    );

    const isSourceImmutable =
      sourceContainer?.rules?.isImmutable || sourceContainer?.rules?.consumesOnDrag === false;

    // Immutable source container logic: create a copy instance in target
    if (sourceContainer && sourceContainer.id !== targetContainerId && isSourceImmutable) {
      const copyId = `${entity.id}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      const copyEntity: Entity = {
        ...entity,
        id: copyId,
        ingredientId: entity.ingredientId || entity.id.split('_')[0],
      };

      const currentEntities = targetContainer.entityIds
        .map((id) => state.entities[id])
        .filter((e): e is Entity => Boolean(e));
      const result = validateContainerRules(targetContainer, copyEntity, currentEntities);
      if (!result.allowed) return;

      set(
        (draft) => {
          draft.entities[copyId] = copyEntity;
          if (typeof positionIndex === 'number') {
            draft.containers[targetContainerId].entityIds.splice(positionIndex, 0, copyId);
          } else {
            draft.containers[targetContainerId].entityIds.push(copyId);
          }
        },
        false,
        'MOVE_ENTITY'
      );
      return;
    }

    // Reordering within the same container never re-checks rules
    if (sourceContainer?.id !== targetContainerId) {
      const currentEntities = targetContainer.entityIds
        .map((id) => state.entities[id])
        .filter((e): e is Entity => Boolean(e) && e.id !== entityId);
      const result = validateContainerRules(targetContainer, entity, currentEntities);
      if (!result.allowed) return;
    }

    set(
      (draft) => {
        if (sourceContainer) {
          draft.containers[sourceContainer.id].entityIds = draft.containers[
            sourceContainer.id
          ].entityIds.filter((id) => id !== entityId);
        }

        if (typeof positionIndex === 'number') {
          draft.containers[targetContainerId].entityIds.splice(positionIndex, 0, entityId);
        } else {
          draft.containers[targetContainerId].entityIds.push(entityId);
        }
      },
      false,
      'MOVE_ENTITY'
    );
  },
});
`````

## File: src/store/slices/recordSlice.test.ts
`````typescript
/**
 * FILE: recordSlice.test.ts
 *
 * PURPOSE:
 * Unit tests for worldStore recording slice.
 *
 * RESPONSIBILITY:
 * - Validates recording start/stop state transitions.
 * - Verifies interaction recording (MOVE_ENTITY, TOGGLE_BURNER, etc.).
 * - Verifies creation of initial and final WorldState snapshots and JSON export payload.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { worldStore } from '../worldStore';

describe('recordSlice', () => {
  beforeEach(() => {
    worldStore.getState().resetWorld();
    worldStore.getState().clearRecording();
  });

  it('starts recording and captures initial world snapshot', () => {
    const store = worldStore.getState();
    expect(store.isRecording).toBe(false);

    store.startRecording();

    const updated = worldStore.getState();
    expect(updated.isRecording).toBe(true);
    expect(updated.recordingStartTime).toBeTypeOf('number');
    expect(updated.initialRecordingState).not.toBeNull();
    expect(updated.initialRecordingState?.entities).toBeDefined();
    expect(updated.initialRecordingState?.containers).toBeDefined();
    expect(updated.recordedActions).toEqual([]);
  });

  it('records dispatched MOVE_ENTITY and TOGGLE_BURNER actions when recording is active', () => {
    worldStore.getState().startRecording();

    // 1. Move potato to burner1
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: {
        entityId: 'potatoes_1',
        targetContainerId: 'burner1',
      },
    });

    // 2. Turn on burner1
    worldStore.getState().dispatch({
      type: 'TOGGLE_BURNER',
      payload: {
        containerId: 'burner1',
      },
    });

    const recorded = worldStore.getState().recordedActions;
    expect(recorded).toHaveLength(2);

    expect(recorded[0].type).toBe('MOVE_ENTITY');
    expect(recorded[0].payload).toEqual({
      entityId: 'potatoes_1',
      targetContainerId: 'burner1',
    });
    expect(recorded[0].timestampMs).toBeGreaterThanOrEqual(0);

    expect(recorded[1].type).toBe('TOGGLE_BURNER');
    expect(recorded[1].payload).toEqual({
      containerId: 'burner1',
    });
    expect(recorded[1].timestampMs).toBeGreaterThanOrEqual(0);
  });

  it('does not record actions when isRecording is false', () => {
    worldStore.getState().dispatch({
      type: 'TOGGLE_BURNER',
      payload: {
        containerId: 'burner1',
      },
    });

    expect(worldStore.getState().recordedActions).toHaveLength(0);
  });

  it('stops recording and generates download URL & serialized JSON', () => {
    // Mock URL methods for Node environment
    if (!globalThis.URL.createObjectURL) {
      globalThis.URL.createObjectURL = vi.fn(() => 'blob:mock-url-1234');
      globalThis.URL.revokeObjectURL = vi.fn();
    }

    worldStore.getState().startRecording();

    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: {
        entityId: 'eggs_1',
        targetContainerId: 'plato',
      },
    });

    worldStore.getState().stopRecording();

    const store = worldStore.getState();
    expect(store.isRecording).toBe(false);
    expect(store.recordedDownloadUrl).toBeTruthy();
    expect(store.recordedFilename).toContain('tortilla-recorded-recipe-');
  });

  it('clears recording state and resets properties', () => {
    worldStore.getState().startRecording();
    worldStore.getState().dispatch({
      type: 'TOGGLE_BURNER',
      payload: { containerId: 'burner1' },
    });

    worldStore.getState().clearRecording();

    const store = worldStore.getState();
    expect(store.isRecording).toBe(false);
    expect(store.recordedActions).toEqual([]);
    expect(store.initialRecordingState).toBeNull();
    expect(store.recordedDownloadUrl).toBeNull();
    expect(store.recordedFilename).toBeNull();
  });
});
`````

## File: src/store/selectors.ts
`````typescript
/**
 * FILE: selectors.ts
 *
 * PURPOSE:
 * Reusable Zustand selectors for components and systems.
 *
 * RESPONSIBILITY:
 * - Provides memoized or simple state derivation selectors.
 * - Prevents unnecessary React re-renders by selecting narrow slices of state.
 */

import type { WorldState } from '../types/world';
import type { Container, Entity } from '../types/world';

/** Selects all entities from the world state */
export const selectEntities = (state: WorldState): Record<string, Entity> => state.entities;

/** Selects a single entity by its ID */
export const selectEntityById = (id: string) => (state: WorldState): Entity | undefined =>
  state.entities[id];

/** Selects all containers from the world state */
export const selectContainers = (state: WorldState): Record<string, Container> => state.containers;

/** Selects a single container by its ID */
export const selectContainerById = (id: string) => (state: WorldState): Container | undefined =>
  state.containers[id];

/** Selects all resolved entities contained in a given container ID */
export const selectContainerEntities = (containerId: string) => (state: WorldState): Entity[] => {
  const container = state.containers[containerId];
  if (!container) return [];
  return container.entityIds
    .map((id) => state.entities[id])
    .filter((e): e is Entity => Boolean(e));
};

/** Selects the mascot entity */
export const selectMascot = (mascotId: string = 'chef') => (state: WorldState): Entity | undefined =>
  state.entities[mascotId];
`````

## File: src/systems/actionPlayer.test.ts
`````typescript
/**
 * FILE: actionPlayer.test.ts
 *
 * PURPOSE:
 * Unit tests for ActionPlayer replay engine.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { actionPlayer } from './actionPlayer';
import { worldStore } from '../store/worldStore';
import type { WorldAction } from '../types/actions';

describe('ActionPlayer', () => {
  beforeEach(() => {
    actionPlayer.stop();
    worldStore.getState().resetWorld();
  });

  it('resets world state and dispatches actions sequentially', async () => {
    const actions: WorldAction[] = [
      {
        type: 'ADD_ENTITY',
        payload: {
          entity: {
            id: 'potato_test_1',
            name: 'Potato',
            type: 'ingredient',
          },
          containerId: 'burner1',
        },
      },
      {
        type: 'TOGGLE_BURNER',
        payload: { containerId: 'burner1' },
      },
    ];

    const onStep = vi.fn();
    const onComplete = vi.fn();

    await actionPlayer.playLog(actions, {
      delayMs: 10,
      onStep,
      onComplete,
    });

    expect(onStep).toHaveBeenCalledTimes(2);
    expect(onStep).toHaveBeenNthCalledWith(1, 1, 2, actions[0]);
    expect(onStep).toHaveBeenNthCalledWith(2, 2, 2, actions[1]);
    expect(onComplete).toHaveBeenCalledTimes(1);

    const store = worldStore.getState();
    expect(store.containers.burner1.isOn).toBe(true);
    expect(store.containers.burner1.entityIds).toContain('potato_test_1');
  });

  it('can stop playback prematurely', async () => {
    const actions: WorldAction[] = [
      {
        type: 'TOGGLE_BURNER',
        payload: { containerId: 'burner1' },
      },
      {
        type: 'TOGGLE_BURNER',
        payload: { containerId: 'burner1' },
      },
      {
        type: 'TOGGLE_BURNER',
        payload: { containerId: 'burner1' },
      },
    ];

    const onStep = vi.fn();
    const onStop = vi.fn();

    const playbackPromise = actionPlayer.playLog(actions, {
      delayMs: 100,
      onStep,
      onStop,
    });

    // Let step 1 run then stop
    await new Promise((r) => setTimeout(r, 20));
    actionPlayer.stop();

    await playbackPromise;

    expect(onStop).toHaveBeenCalled();
    expect(onStep).toHaveBeenCalledTimes(1);
  });
});
`````

## File: src/systems/actionPlayer.ts
`````typescript
/**
 * FILE: actionPlayer.ts
 *
 * PURPOSE:
 * Headless replay engine utility for sequential dispatching of recorded WorldActions.
 *
 * RESPONSIBILITY:
 * - Resets world state to initial default before playback.
 * - Dispatches actions sequentially to worldStore with configurable delay.
 * - Provides progress callbacks and cancellation mechanism.
 */

import { worldStore } from '../store/worldStore';
import type { WorldAction } from '../types/actions';

export interface PlaybackOptions {
  /** Configurable delay between action steps in milliseconds. Default: 300ms */
  delayMs?: number;
  /** Whether to reset world state before starting playback. Default: true */
  resetWorld?: boolean;
  /** Progress callback invoked after each action step */
  onStep?: (currentStep: number, totalSteps: number, action: WorldAction) => void;
  /** Callback invoked when playback successfully completes all actions */
  onComplete?: () => void;
  /** Callback invoked if playback is stopped early */
  onStop?: () => void;
}

export class ActionPlayer {
  private isPlaying = false;
  private isStopped = false;
  private timerId: ReturnType<typeof setTimeout> | null = null;
  private resolveCurrentDelay: (() => void) | null = null;

  /**
   * Returns whether playback is currently running.
   */
  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  /**
   * Cancels and stops ongoing action playback.
   */
  public stop(): void {
    if (!this.isPlaying) return;
    this.isStopped = true;

    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }

    if (this.resolveCurrentDelay) {
      this.resolveCurrentDelay();
      this.resolveCurrentDelay = null;
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => {
      this.resolveCurrentDelay = resolve;
      this.timerId = setTimeout(() => {
        this.timerId = null;
        this.resolveCurrentDelay = null;
        resolve();
      }, ms);
    });
  }

  /**
   * Replays an array of WorldActions sequentially through worldStore.
   */
  public async playLog(actions: WorldAction[], options: PlaybackOptions = {}): Promise<void> {
    if (this.isPlaying) {
      this.stop();
    }

    const {
      delayMs = 300,
      resetWorld = true,
      onStep,
      onComplete,
      onStop,
    } = options;

    this.isPlaying = true;
    this.isStopped = false;

    if (resetWorld) {
      worldStore.getState().dispatch({ type: 'RESET_WORLD' });
    }

    const total = actions.length;

    for (let i = 0; i < total; i++) {
      if (this.isStopped) {
        this.isPlaying = false;
        onStop?.();
        return;
      }

      const action = actions[i];
      worldStore.getState().dispatch(action);

      onStep?.(i + 1, total, action);

      if (i < total - 1 && delayMs > 0) {
        await this.delay(delayMs);
      }
    }

    if (this.isStopped) {
      this.isPlaying = false;
      onStop?.();
      return;
    }

    this.isPlaying = false;
    onComplete?.();
  }
}

export const actionPlayer = new ActionPlayer();
`````

## File: src/systems/ingredientUsage.test.ts
`````typescript
/**
 * FILE: src/systems/ingredientUsage.test.ts
 *
 * PURPOSE:
 * Unit tests for ingredient usage intent actions and domain events.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { worldStore } from '../store/worldStore';
import { clearActionLog, getActionLog } from '../store/middleware/actionLog';

function seedWorld() {
  worldStore.setState({
    entities: {
      potato_1: { id: 'potato_1', name: 'Potato', type: 'ingredient', ingredientId: 'potato' },
      onion_1: { id: 'onion_1', name: 'Onion', type: 'ingredient', ingredientId: 'onion' },
      egg_1: { id: 'egg_1', name: 'Egg', type: 'ingredient', ingredientId: 'egg' },
      oil_1: { id: 'oil_1', name: 'Oil', type: 'ingredient', ingredientId: 'oil' },
    },
    containers: {
      pantry: {
        id: 'pantry',
        name: 'Pantry',
        type: 'storage',
        entityIds: ['potato_1', 'onion_1', 'egg_1', 'oil_1'],
      },
      recipe_1: {
        id: 'recipe_1',
        name: 'Tortilla Recipe',
        type: 'plate',
        entityIds: [],
      },
    },
    events: [],
  });
}

describe('Ingredient Usage Intent Actions & Domain Events', () => {
  beforeEach(() => {
    seedWorld();
    clearActionLog();
  });

  it('Scenario 1: Using ingredient moves it to target container, marks it consumed, and emits INGREDIENT_CONSUMED event', () => {
    const eventListener = vi.fn();
    const unsubscribe = worldStore.getState().onEvent(eventListener);

    // Dispatch USE_INGREDIENT intent action
    worldStore.getState().dispatch({
      type: 'USE_INGREDIENT',
      payload: {
        entityId: 'potato_1',
        usedIn: 'recipe_1',
      },
    });

    const state = worldStore.getState();

    // Potato is removed from pantry
    expect(state.containers.pantry.entityIds).not.toContain('potato_1');

    // Potato is added to recipe_1
    expect(state.containers.recipe_1.entityIds).toContain('potato_1');

    // Potato state updated to consumed
    const potato = state.entities.potato_1;
    expect(potato.state?.consumed).toBe(true);
    expect(potato.state?.consumedBy).toBe('recipe_1');
    expect(potato.state?.status).toBe('consumed');

    // Action logged
    const actionLog = getActionLog();
    expect(actionLog.some((e) => e.action === 'USE_INGREDIENT')).toBe(true);

    // Event emitted
    expect(eventListener).toHaveBeenCalledWith({
      type: 'INGREDIENT_CONSUMED',
      payload: {
        entityId: 'potato_1',
        consumedBy: 'recipe_1',
      },
    });

    const recordedEvents = state.events;
    expect(recordedEvents).toContainEqual({
      type: 'INGREDIENT_CONSUMED',
      payload: {
        entityId: 'potato_1',
        consumedBy: 'recipe_1',
      },
    });

    unsubscribe();
  });

  it('Scenario 2: Undoing action restores entity to previous container and reverts consumed state', () => {
    // Perform initial USE_INGREDIENT action
    worldStore.getState().dispatch({
      type: 'USE_INGREDIENT',
      payload: {
        entityId: 'potato_1',
        usedIn: 'recipe_1',
      },
    });

    // Verify it is consumed
    let state = worldStore.getState();
    expect(state.containers.pantry.entityIds).not.toContain('potato_1');
    expect(state.containers.recipe_1.entityIds).toContain('potato_1');
    expect(state.entities.potato_1.state?.consumed).toBe(true);

    // Revert/undo action
    worldStore.getState().revertIngredientUsage('potato_1');

    state = worldStore.getState();

    // Potato returns to previous container (pantry)
    expect(state.containers.pantry.entityIds).toContain('potato_1');
    expect(state.containers.recipe_1.entityIds).not.toContain('potato_1');

    // Consumed state is reverted
    expect(state.entities.potato_1.state?.consumed).toBeUndefined();
    expect(state.entities.potato_1.state?.consumedBy).toBeUndefined();
    expect(state.entities.potato_1.state?.status).toBeUndefined();
  });

  it('Scenario 3: Two ingredients consumed independently do not affect each other or remaining ingredients', () => {
    // Consume potato
    worldStore.getState().dispatch({
      type: 'USE_INGREDIENT',
      payload: {
        entityId: 'potato_1',
        usedIn: 'recipe_1',
      },
    });

    // Consume onion
    worldStore.getState().dispatch({
      type: 'USE_INGREDIENT',
      payload: {
        entityId: 'onion_1',
        usedIn: 'recipe_1',
      },
    });

    const state = worldStore.getState();

    // Both potato and onion are in recipe_1
    expect(state.containers.recipe_1.entityIds).toEqual(['potato_1', 'onion_1']);

    // Potato and onion are consumed
    expect(state.entities.potato_1.state?.consumed).toBe(true);
    expect(state.entities.onion_1.state?.consumed).toBe(true);

    // Egg and oil remain untouched in pantry and not consumed
    expect(state.containers.pantry.entityIds).toEqual(['egg_1', 'oil_1']);
    expect(state.entities.egg_1.state?.consumed).toBeUndefined();
    expect(state.entities.oil_1.state?.consumed).toBeUndefined();
  });
});
`````

## File: src/types/Ingredient.ts
`````typescript
/**
 * FILE: Ingredient.ts
 *
 * PURPOSE:
 * Defines ingredient data structures.
 *
 * RESPONSIBILITY:
 * - Represents ingredient definitions.
 */

export interface Ingredient {
  id: string
  name: string
  icon: string
}
`````

## File: src/types/RecipeIngredient.ts
`````typescript
/**
 * FILE: RecipeIngredient.ts
 *
 * PURPOSE:
 * Defines ingredient usage inside recipes.
 *
 * RESPONSIBILITY:
 * - Stores ingredient quantity and unit information.
 */

export interface RecipeIngredient {
  id: string
  ingredientId: string
  amount: number
  unit: string
}
`````

## File: src/types/RecipeList.ts
`````typescript
/**
 * FILE: RecipeList.ts
 *
 * PURPOSE:
 * Export RecipeList type for recipe catalog collections.
 *
 * RESPONSIBILITY:
 * - Defines collection contracts for recipes.
 */

import type { Recipe, RecipeList as RecipeListArray } from './Recipe'

export type { Recipe }
export type RecipeList = RecipeListArray
`````

## File: src/types/Requirement.ts
`````typescript
/**
 * FILE: Requirement.ts
 *
 * PURPOSE:
 * Defines entity requirement usage inside recipes.
 *
 * RESPONSIBILITY:
 * - Stores required entity information, quantity, and unit.
 */

export interface Requirement {
  id?: string;
  entityId: string;
  amount: number;
  unit: string;
  name?: string;
}

export interface RequirementDictItem {
  entityId?: string;
  ingredientId?: string; // Legacy fallback
  amount: number;
  unit: string;
  name?: string;
}
`````

## File: src/types/tools.ts
`````typescript
/**
 * FILE: tools.ts
 *
 * PURPOSE:
 * Defines first-class tool entity models and categories.
 *
 * RESPONSIBILITY:
 * - Represents tools as reusable world objects used by kitchen workstations and actions.
 */

export type ToolCategory = 'cutting' | 'mixing' | 'cooking' | 'utility';

export type ToolCatalogItem = {
  id: string;
  name: string;
  icon: string;
  category: ToolCategory;
};
`````

## File: src/repomix-output.xml
`````xml
This file is a merged representation of a subset of the codebase, containing specifically included files, combined into a single document by Repomix.

<file_summary>
This section contains a summary of this file.

<purpose>
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.
</purpose>

<file_format>
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  - File path as an attribute
  - Full contents of the file
</file_format>

<usage_guidelines>
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.
</usage_guidelines>

<notes>
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Only files matching these patterns are included: .
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)
</notes>

</file_summary>

<directory_structure>
assets/
  hero.png
components/
  Ingredients/
    Ingredient.tsx
    IngredientList.tsx
    IngredientListItem.tsx
    Ingredients.css
    RecipeIngredientItem.tsx
    RecipeIngredientList.tsx
  Mascot/
    Mascot.tsx
    TortillaSvg.tsx
  Scene/
    Scene.tsx
    useSceneDragAndDrop.ts
data/
  catalog/
    recipes/
      concebolla.ts
      sincebolla.ts
    ingredients.ts
engine/
  containerRules.ts
store/
  middleware/
    actionLog.test.ts
    actionLog.ts
  gazeStore.ts
  worldStore.test.ts
  worldStore.ts
systems/
  dropRules.test.ts
  dropRules.ts
  gaze.test.ts
  gaze.ts
  interaction.test.ts
  interaction.ts
  movement.ts
  queries.test.ts
  queries.ts
types/
  actions.ts
  Entity.ts
  Ingredient.ts
  IngredientList.ts
  RecipeIngredient.ts
  world.ts
App.tsx
index.css
main.tsx
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="components/Ingredients/Ingredient.tsx">
/**
 * FILE: Ingredient.tsx
 *
 * PURPOSE:
 * Visual representation of one ingredient.
 *
 * RESPONSIBILITY:
 * - Displays ingredient information.
 * - Handles ingredient presentation only.
 *
 * SHOULD NOT:
 * - Manage inventory.
 * - Apply game rules.
 * - Modify world state.
 */

import type { Ingredient as IngredientModel } from '../../types/Ingredient'

interface IngredientProps {
  ingredient: IngredientModel
}

export function Ingredient({ ingredient }: IngredientProps) {
  return (
    <>
      <span aria-hidden="true">{ingredient.icon}</span>
      <span>{ingredient.name}</span>
    </>
  )
}
</file>

<file path="components/Ingredients/IngredientList.tsx">
/**
 * FILE: IngredientList.tsx
 *
 * PURPOSE:
 * Displays a collection/container of ingredients.
 *
 * RESPONSIBILITY:
 * - Renders ingredients belonging to a specific list.
 * - Delegates individual rendering to IngredientListItem.
 *
 * DOMAIN:
 * Represents UI for containers like pantry, kitchen, recipe.
 */

import { useStore } from 'zustand';
import { worldStore } from '../../store/worldStore';
import type { Entity } from '../../types/world';

export function IngredientList({ containerEntityIds }: { containerEntityIds: string[] }) {
  const entities = useStore(worldStore, (state) => state.entities);

  const containerEntities = containerEntityIds
    .map((id: string) => entities[id])
    .filter((e: Entity | undefined): e is Entity => Boolean(e));

  return (
    <div>
      {containerEntities.map((entity: Entity) => (
        <div key={entity.id}>{entity.name}</div>
      ))}
    </div>
  );
}
</file>

<file path="components/Ingredients/IngredientListItem.tsx">
/**
 * FILE: IngredientListItem.tsx
 *
 * PURPOSE:
 * UI wrapper for an ingredient inside a list.
 *
 * RESPONSIBILITY:
 * - Connects ingredient rendering with list interactions.
 * - Provides drag/drop related UI behavior.
 */

import React from 'react';
import { worldStore } from '../../store/worldStore';
import type { Entity } from '../../types/world';

interface IngredientListItemProps {
  entity: Entity;
}

export const IngredientListItem: React.FC<IngredientListItemProps> = ({ entity }) => {
  const handleRemove = () => {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: {
        entityId: entity.id,
        targetContainerId: 'storage',
      },
    });
  };

  return (
    <div className="ingredient-list-item">
      <span>{entity.name}</span>
      <button onClick={handleRemove}>Remove</button>
    </div>
  );
};
</file>

<file path="components/Ingredients/Ingredients.css">
.ingredient-list-panel {
  background: linear-gradient(135deg, #fffdf8 0%, #f7efe7 100%);
  border: 1px solid #e7d8c3;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(82, 55, 24, 0.08);
  min-width: 240px;
  padding: 16px;
}

.ingredient-list-header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.ingredient-list-header h3 {
  color: #6b4226;
  font-size: 1rem;
  margin: 0;
}

.ingredient-list-header span {
  color: #8b6a45;
  font-size: 0.85rem;
}

.ingredient-list,
.recipe-ingredient-list {
  display: grid;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.ingredient-list-item,
.recipe-ingredient-item {
  align-items: center;
  background: #ffffff;
  border: 1px solid #e6d5bf;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
  display: flex;
  gap: 0.5rem;
  padding: 10px 12px;
  user-select: none;
}

.ingredient-list-item-body {
  align-items: center;
  cursor: grab;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  gap: 0.5rem;
  min-width: 0;
}

.ingredient-list-item-body:active {
  cursor: grabbing;
}

.ingredient-remove {
  align-items: center;
  background: transparent;
  border: none;
  border-radius: 6px;
  color: #8b6a45;
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  font-size: 1.25rem;
  height: 1.75rem;
  justify-content: center;
  line-height: 1;
  padding: 0;
  width: 1.75rem;
}

.ingredient-remove:hover {
  background: #f5e8d8;
  color: #6b4226;
}

.ingredient-remove:focus-visible {
  outline: 2px solid #c9956a;
  outline-offset: 2px;
}

.ingredient-list-item:active,
.recipe-ingredient-item:active {
  cursor: grabbing;
}

.ingredient-list-item span {
  font-size: 1rem;
}

.recipe-ingredient-amount {
  margin-left: auto;
}

.scene-panel {
  display: flex;
  gap: 16px;
  margin-top: 16px;
  flex-wrap: wrap;
}

@media (max-width: 30rem) {
  .recipe-ingredient-amount {
    margin-left: 0;
    width: 100%;
  }
}
</file>

<file path="components/Ingredients/RecipeIngredientItem.tsx">
/**
 * FILE: RecipeIngredientItem.tsx
 *
 * PURPOSE:
 * Displays an ingredient used in a recipe.
 *
 * RESPONSIBILITY:
 * - Shows ingredient amount and unit.
 * - Represents recipe-specific ingredient data.
 */

import type { Ingredient } from '../../types/Ingredient'

interface RecipeIngredientItemProps {
  ingredient: Ingredient
  amount: number
  unit: string
}

export function RecipeIngredientItem({
  ingredient,
  amount,
  unit,
}: RecipeIngredientItemProps) {
  return (
    <li className="recipe-ingredient-item">
      <span aria-hidden="true">{ingredient.icon}</span>
      <span className="recipe-ingredient-name">{ingredient.name}</span>
      <span className="recipe-ingredient-amount">
        {amount} {unit}
      </span>
    </li>
  )
}
</file>

<file path="components/Ingredients/RecipeIngredientList.tsx">
/**
 * FILE: RecipeIngredientList.tsx
 *
 * PURPOSE:
 * Displays the ingredients required by a recipe.
 *
 * RESPONSIBILITY:
 * - Renders recipe ingredient collection.
 * - Provides recipe-oriented presentation.
 */

import type { Ingredient } from '../../types/Ingredient'
import type { RecipeIngredient } from '../../types/RecipeIngredient'
import './Ingredients.css'
import { RecipeIngredientItem } from './RecipeIngredientItem'

interface RecipeIngredientListProps {
  ingredients: RecipeIngredient[]
  ingredientCatalog: Ingredient[]
}

export function RecipeIngredientList({
  ingredients,
  ingredientCatalog,
}: RecipeIngredientListProps) {
  const ingredientsById = new Map(
    ingredientCatalog.map((ingredient) => [ingredient.id, ingredient]),
  )

  return (
    <ul className="recipe-ingredient-list">
      {ingredients.map((recipeIngredient) => {
        const ingredient = ingredientsById.get(recipeIngredient.ingredientId)

        if (!ingredient) {
          return null
        }

        return (
          <RecipeIngredientItem
            key={recipeIngredient.id}
            amount={recipeIngredient.amount}
            ingredient={ingredient}
            unit={recipeIngredient.unit}
          />
        )
      })}
    </ul>
  )
}
</file>

<file path="components/Mascot/Mascot.tsx">
/**
 * FILE: Mascot.tsx
 *
 * PURPOSE:
 * Main Tortilla mascot component.
 *
 * RESPONSIBILITY:
 * - Controls mascot visual representation.
 * - Displays mascot state and animations.
 *
 * SHOULD NOT:
 * - Own world state.
 * - Contain gameplay rules.
 */

import React from 'react';
import { useStore } from 'zustand';
import { worldStore } from '../../store/worldStore';

interface MascotProps {
  mascotId?: string;
}

export const Mascot: React.FC<MascotProps> = ({ mascotId = 'chef' }) => {
  const mascotEntity = useStore(worldStore, (state) => state.entities[mascotId]);

  if (!mascotEntity) return null;

  return (
    <div className="mascot">
      <h3>{mascotEntity.name}</h3>
      Gazing at: {mascotEntity.state?.gazingAt ? String(mascotEntity.state.gazingAt) : 'Nothing'}
    </div>
  );
};
</file>

<file path="components/Mascot/TortillaSvg.tsx">
/**
 * FILE: TortillaSvg.tsx
 *
 * PURPOSE:
 * SVG graphics definition for the Tortilla mascot.
 *
 * RESPONSIBILITY:
 * - Contains visual SVG structure only.
 * - Provides reusable mascot artwork.
 */

import React from 'react';
import type { GazeTarget } from '../../systems/gaze';

interface TortillaSvgProps {
  gazingAt?: GazeTarget;
}

export const TortillaSvg: React.FC<TortillaSvgProps> = ({ gazingAt }) => {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40" fill="#f4d03f" />
      {/* Visual representation of mascot gaze direction */}
      <circle cx={gazingAt ? 60 : 50} cy="40" r="5" fill="#000" />
    </svg>
  );
};
</file>

<file path="components/Scene/Scene.tsx">
/**
 * FILE: Scene.tsx
 *
 * PURPOSE:
 * Main game scene renderer.
 *
 * RESPONSIBILITY:
 * - Displays entities in the world.
 * - Connects world state with visual components.
 *
 * DOMAIN:
 * The bridge between game world and React UI.
 */

import React from 'react';
import { useStore } from 'zustand';
import { worldStore } from '../../store/worldStore';
import { IngredientList } from '../Ingredients/IngredientList';

export const Scene: React.FC = () => {
  const containers = useStore(
    worldStore,
    (state) => state.containers
  );

  const containerList = Object.values(containers);

  return (
    <div className="scene">
      {containerList.map((container) => (
        <IngredientList
          key={container.id}
          containerEntityIds={container.entityIds}
        />
      ))}
    </div>
  );
};
</file>

<file path="components/Scene/useSceneDragAndDrop.ts">
/**
 * FILE: useSceneDragAndDrop.ts
 *
 * PURPOSE:
 * React hook connecting drag/drop events with the game world.
 *
 * RESPONSIBILITY:
 * - Handles DnD lifecycle.
 * - Translates UI interactions into world actions.
 *
 * SHOULD NOT:
 * - Decide game rules.
 * - Directly manipulate entity collections.
 */

import { useStore } from 'zustand';
import { worldStore } from '../../store/worldStore';

export function useSceneDragAndDrop() {
  const containers = useStore(worldStore, (state) => Object.values(state.containers));

  return {
    containers,
  };
}
</file>

<file path="data/catalog/recipes/concebolla.ts">
import { ingredients } from '../ingredients'

export const recipe = {
  id: 'concebolla',
  name: 'Con Cebolla',
  ingredients: [
    ingredients.find((i) => i.id === 'potato'),
    ingredients.find((i) => i.id === 'egg'),
    ingredients.find((i) => i.id === 'oil'),
    ingredients.find((i) => i.id === 'salt'),
    ingredients.find((i) => i.id === 'pepper'),
    ingredients.find((i) => i.id === 'onion'),
  ],
}
</file>

<file path="data/catalog/recipes/sincebolla.ts">
import { ingredients } from "../ingredients";

export const recipe = {
  id: "sincebolla",
  name: "Sincebolla",
  ingredients: [
    ingredients.find(i => i.id === "potato"),
    ingredients.find(i => i.id === "egg"),
    ingredients.find(i => i.id === "oil"),
    ingredients.find(i => i.id === "salt"),
    ingredients.find(i => i.id === "pepper"),
  ]
};
</file>

<file path="data/catalog/ingredients.ts">
import type { Ingredient } from "../../types/Ingredient";


export const ingredients: Ingredient[] = [

  {
    id: "potato",
    icon: "🥔",
    name: "Potatoes",
  },


  {
    id: "egg",
    icon: "🥚",
    name: "Eggs",
  },


  {
    id: "oil",
    icon: "🫒",
    name: "Olive Oil",
  },


  {
    id: "onion",
    icon: "🧅",
    name: "Onion",
  },


  {
    id: "chorizo",
    icon: "🌭",
    name: "Chorizo",
  },

  {
    id: "salt",
    icon: "🧂",
    name: "Salt",
  },

  {
    id: "pepper",
    icon: "🫑",
    name: "Bell Pepper",
  },

  {
    id: "garlic",
    icon: "🧄",
    name: "Garlic",
  },

  {
    id: "tomato",
    icon: "🍅",
    name: "Tomato",
  },

  {
    id: "cheese",
    icon: "🧀",
    name: "Cheese",
  },

  {
    id: "bread",
    icon: "🍞",
    name: "Bread",
  },

  {
    id: "milk",
    icon: "🥛",
    name: "Milk",
  },

  {
    id: "butter",
    icon: "🧈",
    name: "Butter",
  },

];
</file>

<file path="engine/containerRules.ts">
/**
 * FILE: containerRules.ts
 *
 * PURPOSE:
 * Generic container behavior rules.
 *
 * RESPONSIBILITY:
 * - Defines reusable rules for lists/containers.
 * - Determines allowed contents and constraints.
 *
 * DOMAIN:
 * Game engine logic independent from React.
 */

import type { Container, Entity } from '../types/world';

export interface ValidationResult {
  allowed: boolean;
  reason?: string;
}

export function validateContainerRules(
  container: Container,
  entity: Entity,
  currentEntitiesInContainer: Entity[]
): ValidationResult {
  const rules = container.rules;

  if (!rules) {
    return { allowed: true };
  }

  // 1. Capacity Check
  if (
    rules.maxCapacity !== undefined &&
    container.entityIds.length >= rules.maxCapacity
  ) {
    return {
      allowed: false,
      reason: `Container '${container.name}' capacity reached (${rules.maxCapacity} items max).`,
    };
  }

  // 2. Allowed Types Check
  if (rules.allowedTypes && !rules.allowedTypes.includes(entity.type)) {
    return {
      allowed: false,
      reason: `Container '${container.name}' does not accept entity type '${entity.type}'.`,
    };
  }

  // 3. Unique Types Check
  if (rules.uniqueTypesOnly) {
    const hasTypeAlready = currentEntitiesInContainer.some(
      (e) => e.type === entity.type
    );
    if (hasTypeAlready) {
      return {
        allowed: false,
        reason: `Container '${container.name}' already contains an entity of type '${entity.type}'.`,
      };
    }
  }

  // 4. Custom Validator Check
  if (rules.customValidator) {
    const passesCustom = rules.customValidator(
      container,
      entity,
      currentEntitiesInContainer
    );
    if (!passesCustom) {
      return {
        allowed: false,
        reason: `Entity '${entity.name}' failed custom container rules for '${container.name}'.`,
      };
    }
  }

  return { allowed: true };
}
</file>

<file path="store/middleware/actionLog.test.ts">
import { describe, it, expect, beforeEach } from 'vitest';
import { createStore } from 'zustand/vanilla';
import { devtools } from 'zustand/middleware';
import { actionLog, clearActionLog, getActionLog } from './actionLog';

interface CounterState {
  count: number;
  incrementLabelled: () => void;
  incrementUnlabelled: () => void;
}

function makeStore() {
  return createStore<CounterState>()(
    devtools(
      actionLog((set) => ({
        count: 0,
        incrementLabelled: () =>
          set((state) => ({ count: state.count + 1 }), false, 'INCREMENT'),
        incrementUnlabelled: () => set((state) => ({ count: state.count + 1 })),
      })),
      { enabled: false }
    )
  );
}

describe('actionLog middleware', () => {
  beforeEach(() => {
    clearActionLog();
  });

  it('records a labelled set call', () => {
    const store = makeStore();
    store.getState().incrementLabelled();

    const log = getActionLog();
    expect(log).toHaveLength(1);
    expect(log[0].action).toBe('INCREMENT');
    expect(store.getState().count).toBe(1);
  });

  it('does not record an unlabelled set call', () => {
    const store = makeStore();
    store.getState().incrementUnlabelled();

    expect(getActionLog()).toHaveLength(0);
    expect(store.getState().count).toBe(1);
  });

  it('caps the log at 200 entries, dropping the oldest first', () => {
    const store = makeStore();
    for (let i = 0; i < 205; i++) {
      store.getState().incrementLabelled();
    }

    const log = getActionLog();
    expect(log).toHaveLength(200);
    expect(store.getState().count).toBe(205);
  });

  it('clearActionLog empties the log', () => {
    const store = makeStore();
    store.getState().incrementLabelled();
    clearActionLog();

    expect(getActionLog()).toHaveLength(0);
  });
});
</file>

<file path="store/middleware/actionLog.ts">
/**
 * FILE: actionLog.ts
 *
 * PURPOSE:
 * Zustand middleware for recording world actions.
 *
 * RESPONSIBILITY:
 * - Observes store mutations.
 * - Creates an action history/debug log.
 *
 * USED FOR:
 * - Debugging.
 * - Future replay systems.
 */

import type { StateCreator, StoreMutatorIdentifier } from 'zustand/vanilla';

export interface ActionLogEntry {
  /** The action's label, e.g. "MOVE_ENTITY". */
  action: string;
  timestamp: number;
}

const MAX_ENTRIES = 200;

let entries: ActionLogEntry[] = [];

/** Read-only snapshot of recorded world actions, oldest first. */
export function getActionLog(): ActionLogEntry[] {
  return [...entries];
}

/** Clears the recorded history. Mainly useful between tests. */
export function clearActionLog(): void {
  entries = [];
}

type ActionLogMiddleware = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  initializer: StateCreator<T, Mps, Mcs>,
) => StateCreator<T, Mps, Mcs>;

/**
 * Records every labelled `set` call into an in-memory action log — the
 * "Action Queue" docs/systems.md describes for debugging, replay, and
 * future AI compatibility.
 *
 * A reducer opts a state change into the log by passing a label as the
 * third argument to `set`, the same convention the `devtools` middleware
 * uses for naming actions in Redux DevTools:
 *
 *   set(nextState, false, 'MOVE_ENTITY')
 *
 * Intended to sit directly beneath `devtools` in the middleware stack
 * (`devtools(actionLog(initializer))`), so it observes the same labelled
 * `set` calls devtools does. Calls without a string label are forwarded
 * unlogged.
 */
export const actionLog: ActionLogMiddleware = (initializer) => (set, get, api) => {
  const loggedSet = ((partial: unknown, replace?: unknown, label?: unknown) => {
    if (typeof label === 'string') {
      entries.push({ action: label, timestamp: Date.now() });
      if (entries.length > MAX_ENTRIES) entries.shift();
    }
    return (set as (...args: unknown[]) => void)(partial, replace, label);
  }) as typeof set;

  return initializer(loggedSet, get, api);
};
</file>

<file path="store/gazeStore.ts">
/**
 * FILE: gazeStore.ts
 *
 * PURPOSE:
 * Stores mascot gaze/attention state.
 *
 * RESPONSIBILITY:
 * - Tracks what the mascot is looking at.
 * - Provides gaze information to UI components.
 */

import { create } from 'zustand'
import type { GazeTarget } from '../systems/gaze'

interface GazeState {
  /** Whatever the mascot should be looking at right now, or null to fall back to the mouse. */
  target: GazeTarget | null
  setTarget: (target: GazeTarget | null) => void
  clearTarget: () => void
}

export const useGazeStore = create<GazeState>((set) => ({
  target: null,
  setTarget: (target) => set({ target }),
  clearTarget: () => set({ target: null }),
}))
</file>

<file path="store/worldStore.test.ts">
import { describe, it, expect, beforeEach } from 'vitest';
import { worldStore } from './worldStore';
import { clearActionLog, getActionLog } from './middleware/actionLog';

function seed() {
  worldStore.setState({
    entities: {
      potato: { id: 'potato', name: 'Potato', type: 'ingredient' },
      onion: { id: 'onion', name: 'Onion', type: 'ingredient' },
      knife: { id: 'knife', name: 'Knife', type: 'tool' },
      chef: { id: 'chef', name: 'Chef', type: 'mascot' },
    },
    containers: {
      kitchen: {
        id: 'kitchen',
        name: 'Kitchen',
        type: 'storage',
        entityIds: ['potato', 'onion', 'knife'],
      },
      pan: {
        id: 'pan',
        name: 'Pan',
        type: 'pan',
        entityIds: [],
        rules: { maxCapacity: 1 },
      },
      board: {
        id: 'board',
        name: 'Cutting Board',
        type: 'board',
        entityIds: [],
        rules: { allowedTypes: ['ingredient'] },
      },
      recipe: {
        id: 'recipe',
        name: 'Recipe',
        type: 'plate',
        entityIds: [],
        rules: { allowedTypes: ['ingredient'], uniqueTypesOnly: true },
      },
    },
  });
}

describe('worldStore container rule enforcement', () => {
  beforeEach(() => {
    seed();
    clearActionLog();
  });

  it('allows a move that satisfies the target container rules', () => {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato', targetContainerId: 'pan' },
    });

    const state = worldStore.getState();
    expect(state.containers.pan.entityIds).toEqual(['potato']);
    expect(state.containers.kitchen.entityIds).not.toContain('potato');
  });

  it('blocks a move once the target container is at capacity', () => {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato', targetContainerId: 'pan' },
    });
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'onion', targetContainerId: 'pan' },
    });

    const state = worldStore.getState();
    expect(state.containers.pan.entityIds).toEqual(['potato']);
    expect(state.containers.kitchen.entityIds).toContain('onion');
  });

  it('blocks a move that violates allowedTypes', () => {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'knife', targetContainerId: 'board' },
    });

    // knife is a tool; board only allows ingredients
    const state = worldStore.getState();
    expect(state.containers.board.entityIds).toEqual([]);
    expect(state.containers.kitchen.entityIds).toContain('knife');
  });

  it('blocks a move that would duplicate a type in a uniqueTypesOnly container', () => {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato', targetContainerId: 'recipe' },
    });
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'onion', targetContainerId: 'recipe' },
    });

    // both are 'ingredient' type; uniqueTypesOnly blocks the second
    const state = worldStore.getState();
    expect(state.containers.recipe.entityIds).toEqual(['potato']);
    expect(state.containers.kitchen.entityIds).toContain('onion');
  });

  it('never re-validates a same-container reorder', () => {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato', targetContainerId: 'kitchen', positionIndex: 0 },
    });

    // would fail uniqueTypesOnly-style self-comparison if the entity
    // weren't excluded from its own container's current entities
    const state = worldStore.getState();
    expect(state.containers.kitchen.entityIds[0]).toBe('potato');
  });

  it('is a no-op when the entity does not exist', () => {
    const before = worldStore.getState().containers.pan.entityIds;
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'ghost', targetContainerId: 'pan' },
    });
    expect(worldStore.getState().containers.pan.entityIds).toEqual(before);
  });

  it('enforces the same rules on ADD_ENTITY', () => {
    worldStore.getState().dispatch({
      type: 'ADD_ENTITY',
      payload: {
        entity: { id: 'spoon', name: 'Spoon', type: 'tool' },
        containerId: 'board',
      },
    });

    const state = worldStore.getState();
    expect(state.containers.board.entityIds).toEqual([]);
    expect(state.entities.spoon).toBeUndefined();
  });

  it('logs a labelled entry into the action log for each dispatch', () => {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato', targetContainerId: 'pan' },
    });

    const log = getActionLog();
    expect(log).toHaveLength(1);
    expect(log[0].action).toBe('MOVE_ENTITY');
    expect(typeof log[0].timestamp).toBe('number');
  });
});
</file>

<file path="store/worldStore.ts">
/**
 * FILE: worldStore.ts
 *
 * PURPOSE:
 * Central Zustand store for the game world.
 *
 * RESPONSIBILITY:
 * - Owns world state.
 * - Stores entities, containers and relationships.
 * - Executes state transitions.
 *
 * ARCHITECTURE:
 * Systems request changes.
 * Store applies valid state mutations.
 */

import { createStore } from 'zustand/vanilla';
import { devtools } from 'zustand/middleware';
import type { Container, Entity, WorldAction, WorldState } from '../types/world';
import { validateContainerRules } from '../engine/containerRules';
import { actionLog } from './middleware/actionLog';

function entitiesIn(container: Container, entities: Record<string, Entity>): Entity[] {
  return container.entityIds
    .map((id) => entities[id])
    .filter((entity): entity is Entity => Boolean(entity));
}

export const worldStore = createStore<WorldState>()(
  devtools(
    actionLog((set) => ({
      entities: {},
      containers: {},
      dispatch: (action: WorldAction) => {
        switch (action.type) {
          case 'MOVE_ENTITY': {
            const { entityId, targetContainerId, positionIndex } = action.payload;
            set(
              (state: WorldState) => {
                const entity = state.entities[entityId];
                const targetContainer = state.containers[targetContainerId];
                if (!entity || !targetContainer) return state;

                const sourceContainer = Object.values(state.containers).find((c) =>
                  c.entityIds.includes(entityId)
                );

                // Reordering within the same container never re-checks
                // rules — capacity/uniqueness only guard entities newly
                // arriving from elsewhere.
                if (sourceContainer?.id !== targetContainerId) {
                  const currentEntities = entitiesIn(targetContainer, state.entities).filter(
                    (e) => e.id !== entityId
                  );
                  const result = validateContainerRules(targetContainer, entity, currentEntities);
                  if (!result.allowed) return state;
                }

                const newContainers = { ...state.containers };

                if (sourceContainer) {
                  newContainers[sourceContainer.id] = {
                    ...sourceContainer,
                    entityIds: sourceContainer.entityIds.filter((id) => id !== entityId),
                  };
                }

                const targetIds = [...(newContainers[targetContainerId]?.entityIds || [])];
                if (typeof positionIndex === 'number') {
                  targetIds.splice(positionIndex, 0, entityId);
                } else {
                  targetIds.push(entityId);
                }

                newContainers[targetContainerId] = {
                  ...targetContainer,
                  entityIds: targetIds,
                };

                return { ...state, containers: newContainers };
              },
              false,
              'MOVE_ENTITY'
            );
            break;
          }

          case 'ADD_ENTITY': {
            const { entity, containerId } = action.payload;
            set(
              (state: WorldState) => {
                const targetContainer = state.containers[containerId];
                if (!targetContainer) return state;

                const currentEntities = entitiesIn(targetContainer, state.entities);
                const result = validateContainerRules(
                  targetContainer,
                  entity as Entity,
                  currentEntities
                );
                if (!result.allowed) return state;

                return {
                  ...state,
                  entities: {
                    ...state.entities,
                    [entity.id]: entity as Entity,
                  },
                  containers: {
                    ...state.containers,
                    [containerId]: {
                      ...targetContainer,
                      entityIds: [...targetContainer.entityIds, entity.id],
                    },
                  },
                };
              },
              false,
              'ADD_ENTITY'
            );
            break;
          }

          case 'REMOVE_ENTITY': {
            const { entityId } = action.payload;
            set(
              (state: WorldState) => {
                const newEntities = { ...state.entities };
                delete newEntities[entityId];

                const newContainers = { ...state.containers };
                for (const cId in newContainers) {
                  newContainers[cId] = {
                    ...newContainers[cId],
                    entityIds: newContainers[cId].entityIds.filter((id) => id !== entityId),
                  };
                }

                return {
                  ...state,
                  entities: newEntities,
                  containers: newContainers,
                };
              },
              false,
              'REMOVE_ENTITY'
            );
            break;
          }

          case 'UPDATE_ENTITY_STATE': {
            const { entityId, changes } = action.payload;
            set(
              (state: WorldState) => {
                const targetEntity = state.entities[entityId];
                if (!targetEntity) return state;

                return {
                  ...state,
                  entities: {
                    ...state.entities,
                    [entityId]: {
                      ...targetEntity,
                      state: {
                        ...targetEntity.state,
                        ...changes,
                      },
                    },
                  },
                };
              },
              false,
              'UPDATE_ENTITY_STATE'
            );
            break;
          }
        }
      },
    })),
    { name: 'tortilla-world' }
  )
);
</file>

<file path="systems/dropRules.test.ts">
import { describe, it, expect } from 'vitest'
import { parseDrag, evaluateDrop } from './dropRules'

const kitchenConsumes = { kitchen: { consumesOnDrag: true }, fire: { consumesOnDrag: true } }

describe('parseDrag', () => {
  it('parses a dragged item and a list drop target', () => {
    expect(parseDrag('despensa::potato', 'kitchen')).toEqual({
      source: { listId: 'despensa', itemId: 'potato' },
      target: { listId: 'kitchen', itemId: null },
    })
  })

  it('parses a dragged item and an item drop target', () => {
    expect(parseDrag('despensa::egg', 'despensa::potato')).toEqual({
      source: { listId: 'despensa', itemId: 'egg' },
      target: { listId: 'despensa', itemId: 'potato' },
    })
  })

  it('returns null for malformed ids', () => {
    expect(parseDrag('potato', 'kitchen')).toBeNull()
    expect(parseDrag('despensa::potato', '')).toBeNull()
  })
})

describe('evaluateDrop', () => {
  it('approves same-list reorder without duplicate checks', () => {
    const drag = parseDrag('despensa::egg', 'despensa::potato')!
    const drop = evaluateDrop(drag, { despensa: ['potato', 'egg'], kitchen: [] })
    expect(drop).toMatchObject({
      kind: 'same-list-reorder',
      insertAt: 0,
    })
  })

  it('approves a move from a consuming source', () => {
    const drag = parseDrag('kitchen::potato', 'fire')!
    const drop = evaluateDrop(
      drag,
      { kitchen: ['potato', 'egg'], fire: [] },
      kitchenConsumes,
    )
    expect(drop?.kind).toBe('cross-list-move')
  })

  it('approves a copy from a non-consuming source', () => {
    const drag = parseDrag('despensa::potato', 'kitchen')!
    const drop = evaluateDrop(
      drag,
      { despensa: ['potato', 'onion'], kitchen: [] },
      { despensa: {}, kitchen: { consumesOnDrag: true } },
    )
    expect(drop?.kind).toBe('cross-list-copy')
  })

  it('never lets a consuming target override a non-consuming source', () => {
    const drag = parseDrag('despensa::potato', 'fire')!
    const drop = evaluateDrop(
      drag,
      { despensa: ['potato', 'onion'], fire: [] },
      { despensa: {}, fire: { consumesOnDrag: true } },
    )
    expect(drop?.kind).toBe('cross-list-copy')
  })

  it('blocks copying when the target already holds the same ingredient group', () => {
    const drag = parseDrag('despensa::potato#despensa', 'kitchen')!
    const drop = evaluateDrop(
      drag,
      { despensa: ['potato#despensa'], kitchen: ['potato#kitchen'] },
      {},
      { groupOf: (id) => id.split('#')[0] },
    )
    expect(drop).toBeNull()
  })

  it('blocks copying an item already in the target list (default identity grouping)', () => {
    const drag = parseDrag('despensa::potato', 'kitchen')!
    const drop = evaluateDrop(
      drag,
      { despensa: ['potato', 'onion'], kitchen: ['potato', 'egg'] },
    )
    expect(drop).toBeNull()
  })

  it('blocks copying even when dropping on blank space in a list that already has the item', () => {
    const drag = parseDrag('despensa::potato', 'kitchen')!
    const drop = evaluateDrop(
      drag,
      { despensa: ['potato'], kitchen: ['potato'] },
    )
    expect(drop).toBeNull()
  })

  it('returns null when the item is not in the source list', () => {
    const drag = parseDrag('despensa::garlic', 'kitchen')!
    const drop = evaluateDrop(drag, { despensa: ['potato'], kitchen: [] })
    expect(drop).toBeNull()
  })

  it('returns null when source list does not exist', () => {
    const drag = parseDrag('ghost::potato', 'kitchen')!
    const drop = evaluateDrop(drag, { despensa: ['potato'], kitchen: [] })
    expect(drop).toBeNull()
  })
})
</file>

<file path="systems/dropRules.ts">
/**
 * FILE: dropRules.ts
 *
 * PURPOSE:
 * Defines rules for drag and drop interactions.
 *
 * RESPONSIBILITY:
 * - Determines whether an entity can enter a container.
 * - Validates possible world transitions.
 *
 * SHOULD NOT:
 * - Modify state.
 */

export interface DragEndpoint {
  listId: string
  itemId: string
}

export interface DropTarget {
  listId: string
  itemId: string | null
}

export interface ParsedDrag {
  source: DragEndpoint
  target: DropTarget
}

export type DropKind = 'same-list-reorder' | 'cross-list-move' | 'cross-list-copy'

export interface ApprovedDrop {
  kind: DropKind
  source: DragEndpoint
  target: DropTarget
  insertAt: number
}

export interface ListFlags {
  consumesOnDrag?: boolean
}

export interface DropRuleOptions {
  /**
   * Groups items for the "already in target" duplicate check — e.g. two
   * different physical instances of "potato" should still be treated as
   * the same ingredient for blocking purposes.
   */
  groupOf?: (itemId: string) => string
}

export function parseDrag(activeId: string, overId: string): ParsedDrag | null {
  const sourceParts = activeId.split('::')
  const targetParts = overId.split('::')

  const sourceListId = sourceParts[0]
  const sourceItemId = sourceParts[1]
  const targetListId = targetParts[0]

  if (!sourceListId || !sourceItemId || !targetListId) return null

  return {
    source: { listId: sourceListId, itemId: sourceItemId },
    target: { listId: targetListId, itemId: targetParts[1] ?? null },
  }
}

/**
 * Read-only gate: can this drag-and-drop happen?
 *
 * Same-list reorder: always allowed.
 * Cross-list: blocked when the target already holds an instance of the
 * same group. Otherwise allowed as a move (consuming source) or copy
 * (non-consuming source) — the kind is decided here so interaction.ts
 * only has to apply it.
 */
export function evaluateDrop(
  drag: ParsedDrag,
  lists: Record<string, string[]>,
  listFlags: Record<string, ListFlags> = {},
  options: DropRuleOptions = {},
): ApprovedDrop | null {
  const sourceIds = lists[drag.source.listId]
  const targetIds = lists[drag.target.listId]
  if (!sourceIds || !targetIds || !sourceIds.includes(drag.source.itemId)) return null

  const targetIndex = drag.target.itemId ? targetIds.indexOf(drag.target.itemId) : -1
  const insertAt = targetIndex === -1 ? targetIds.length : targetIndex

  if (drag.source.listId === drag.target.listId) {
    return {
      kind: 'same-list-reorder',
      source: drag.source,
      target: drag.target,
      insertAt,
    }
  }

  const groupOf = options.groupOf ?? ((itemId: string) => itemId)
  const sourceGroup = groupOf(drag.source.itemId)
  if (targetIds.some((itemId) => groupOf(itemId) === sourceGroup)) return null

  const sourceConsumes = listFlags[drag.source.listId]?.consumesOnDrag ?? false

  return {
    kind: sourceConsumes ? 'cross-list-move' : 'cross-list-copy',
    source: drag.source,
    target: drag.target,
    insertAt,
  }
}
</file>

<file path="systems/gaze.test.ts">
import { describe, it, expect, beforeEach } from 'vitest';
import { worldStore } from '../store/worldStore';
import { updateMascotGaze, getMascotGazeTarget } from './gaze';

describe('Gaze System', () => {
  beforeEach(() => {
    worldStore.setState({
      entities: {
        chef: {
          id: 'chef',
          name: 'Chef',
          type: 'mascot',
          state: {
            gazingAt: undefined,
          },
        },
      },
      containers: {
        bench: {
          id: 'bench',
          name: 'Workbench',
          type: 'board',
          rules: { maxCapacity: 1 },
          entityIds: [],
        },
        pan: {
          id: 'pan',
          name: 'Pan',
          type: 'pan',
          rules: { maxCapacity: Infinity },
          entityIds: [],
        },
        plate: {
          id: 'plate',
          name: 'Plate',
          type: 'storage',
          rules: { maxCapacity: Infinity },
          entityIds: [],
        },
      },
    });
  });

  it('updates mascot gaze target correctly', () => {
    updateMascotGaze('chef', 'pan');
    expect(getMascotGazeTarget('chef')).toBe('pan');
  });

  it('is idempotent when gazing at the same target', () => {
    updateMascotGaze('chef', 'pan');
    const firstState = worldStore.getState();

    updateMascotGaze('chef', 'pan');
    const secondState = worldStore.getState();

    expect(firstState).toBe(secondState);
  });
});
</file>

<file path="systems/gaze.ts">
/**
 * FILE: gaze.ts
 *
 * PURPOSE:
 * Calculates gaze behavior.
 *
 * RESPONSIBILITY:
 * - Determines what objects attract attention.
 * - Updates gaze-related state.
 */

import { worldStore } from '../store/worldStore';

export type GazeTarget = string | null;

interface GazeState {
  gazingAt?: GazeTarget;
}

/**
 * Updates what target a mascot is looking at.
 */
export function updateMascotGaze(
  mascotId: string,
  targetId: GazeTarget
): void {
  const currentTarget = getMascotGazeTarget(mascotId);

  if (currentTarget === targetId) {
    return;
  }

  worldStore.getState().dispatch({
    type: 'UPDATE_ENTITY_STATE',
    payload: {
      entityId: mascotId,
      changes: {
        gazingAt: targetId,
      },
    },
  });
}

/**
 * Returns the current gaze target.
 */
export function getMascotGazeTarget(
  mascotId: string
): GazeTarget {
  const entity = worldStore.getState().entities[mascotId];

  if (!entity) {
    return null;
  }

  const state = entity.state as GazeState | undefined;

  return state?.gazingAt ?? null;
}
</file>

<file path="systems/interaction.test.ts">
import { describe, it, expect } from 'vitest'
import { evaluateDrop, parseDrag } from './dropRules'
import { resolveListReorder, applyListReorder } from './interaction'
import type { Entity } from '../types/Entity'

function makeEntity(id: string, ingredientId: string, listId: string | null): Entity {
  return {
    id,
    type: 'ingredient',
    ingredientId,
    position: { x: 0, y: 0 },
    size: { width: 1, height: 1 },
    state: 'idle',
    listId,
  }
}

function resolveDrag(
  activeId: string,
  overId: string,
  lists: Record<string, string[]>,
  listFlags: Record<string, { consumesOnDrag?: boolean }> = {},
  options: { groupOf?: (itemId: string) => string; createCopyId?: (itemId: string) => string } = {},
) {
  const drag = parseDrag(activeId, overId)
  if (!drag) return null
  const drop = evaluateDrop(drag, lists, listFlags, { groupOf: options.groupOf })
  if (!drop) return null
  return resolveListReorder(drop, lists, { createCopyId: options.createCopyId })
}

const kitchenConsumes = { kitchen: { consumesOnDrag: true }, fire: { consumesOnDrag: true } }

// ── consumesOnDrag: move vs copy semantics ─────────────────────────────────

it('dragging from a consuming list removes the item from the source', () => {
  const result = resolveDrag(
    'kitchen::potato',
    'fire',
    { kitchen: ['potato', 'egg'], fire: [] },
    kitchenConsumes,
  )
  expect(result?.lists).toEqual({
    kitchen: ['egg'],
    fire: ['potato'],
  })
  expect(result?.changedListId).toBe('fire')
  expect(result?.removedFromListId).toBe('kitchen')
  expect(result?.copy).toBeNull()
})

it('dragging from a non-consuming list keeps the item in the source', () => {
  const result = resolveDrag(
    'despensa::potato',
    'kitchen',
    { despensa: ['potato', 'onion'], kitchen: [] },
    { despensa: {}, kitchen: { consumesOnDrag: true } },
    { createCopyId: () => 'potato-copy' },
  )
  expect(result?.lists).toEqual({
    despensa: ['potato', 'onion'],
    kitchen: ['potato-copy'],
  })
  expect(result?.removedFromListId).toBeNull()
  expect(result?.copy).toEqual({ sourceItemId: 'potato', newItemId: 'potato-copy' })
})

it('a consuming target never overrides a non-consuming source, even dragging onto fire', () => {
  const result = resolveDrag(
    'despensa::potato',
    'fire',
    { despensa: ['potato', 'onion'], fire: [] },
    { despensa: {}, fire: { consumesOnDrag: true } },
    { createCopyId: () => 'potato-copy' },
  )
  expect(result?.lists).toEqual({
    despensa: ['potato', 'onion'],
    fire: ['potato-copy'],
  })
  expect(result?.changedListId).toBe('fire')
  expect(result?.removedFromListId).toBeNull()
})

it('BUG regression: a copy is a distinct instance, so moving it later never touches the original', () => {
  const copyStep = resolveDrag(
    'despensa::salt#despensa',
    'kitchen',
    { despensa: ['salt#despensa'], kitchen: [], fire: [] },
    { despensa: {}, kitchen: { consumesOnDrag: true }, fire: { consumesOnDrag: true } },
    { createCopyId: () => 'salt#kitchen' },
  )
  expect(copyStep?.copy).toEqual({ sourceItemId: 'salt#despensa', newItemId: 'salt#kitchen' })

  const moveStep = resolveDrag(
    'kitchen::salt#kitchen',
    'fire',
    { despensa: ['salt#despensa'], kitchen: ['salt#kitchen'], fire: [] },
    { despensa: {}, kitchen: { consumesOnDrag: true }, fire: { consumesOnDrag: true } },
  )
  expect(moveStep?.lists).toEqual({
    despensa: ['salt#despensa'],
    kitchen: [],
    fire: ['salt#kitchen'],
  })
  expect(moveStep?.removedFromListId).toBe('kitchen')
})

describe('resolveListReorder', () => {
  it('copies an item to another list, source stays untouched, target gets a new id', () => {
    const drag = parseDrag('despensa::potato', 'kitchen::egg')!
    const drop = evaluateDrop(drag, { despensa: ['potato', 'onion'], kitchen: ['egg'] })!
    const result = resolveListReorder(drop, { despensa: ['potato', 'onion'], kitchen: ['egg'] }, {
      createCopyId: () => 'potato-copy',
    })
    expect(result?.lists).toEqual({
      despensa: ['potato', 'onion'],
      kitchen: ['potato-copy', 'egg'],
    })
    expect(result?.changedListId).toBe('kitchen')
    expect(result?.copy).toEqual({ sourceItemId: 'potato', newItemId: 'potato-copy' })
  })

  it('copies into an empty list', () => {
    const drag = parseDrag('despensa::potato', 'kitchen')!
    const drop = evaluateDrop(drag, { despensa: ['potato', 'onion'], kitchen: [] })!
    const result = resolveListReorder(drop, { despensa: ['potato', 'onion'], kitchen: [] }, {
      createCopyId: () => 'potato-copy',
    })
    expect(result?.lists).toEqual({
      despensa: ['potato', 'onion'],
      kitchen: ['potato-copy'],
    })
  })

  it('default createCopyId still produces an id different from the source', () => {
    const drag = parseDrag('despensa::potato', 'kitchen')!
    const drop = evaluateDrop(drag, { despensa: ['potato'], kitchen: [] })!
    const result = resolveListReorder(drop, { despensa: ['potato'], kitchen: [] })
    expect(result?.copy?.newItemId).not.toBe('potato')
    expect(result?.lists.kitchen[0]).not.toBe('potato')
  })

  it('reorders within the same list', () => {
    const drag = parseDrag('despensa::egg', 'despensa::potato')!
    const drop = evaluateDrop(drag, { despensa: ['potato', 'egg'], kitchen: [] })!
    const result = resolveListReorder(drop, { despensa: ['potato', 'egg'], kitchen: [] })
    expect(result?.lists.despensa).toEqual(['egg', 'potato'])
    expect(result?.lists.kitchen).toEqual([])
    expect(result?.changedListId).toBe('despensa')
    expect(result?.copy).toBeNull()
  })
})

describe('applyListReorder', () => {
  it('moves an existing entity by updating its listId and position', () => {
    const calls: Array<[string, Partial<Omit<Entity, 'id'>>]> = []
    const updateEntity = (id: string, changes: Partial<Omit<Entity, 'id'>>) => calls.push([id, changes])
    const addEntity = () => { throw new Error('should not create a new entity for a plain move') }
    const getEntity = (id: string) => makeEntity(id, id, 'kitchen')

    applyListReorder(updateEntity, addEntity, getEntity, {
      lists: { fire: ['potato'] },
      changedListId: 'fire',
      removedFromListId: 'kitchen',
      copy: null,
    })

    expect(calls).toEqual([['potato', { position: { x: 0, y: 0 }, listId: 'fire' }]])
  })

  it('creates a brand-new entity for a copy, leaving the original alone', () => {
    const updateCalls: Array<[string, unknown]> = []
    const addCalls: Entity[] = []
    const updateEntity = (id: string, changes: Partial<Omit<Entity, 'id'>>) => updateCalls.push([id, changes])
    const addEntity = (entity: Entity) => addCalls.push(entity)
    const original = makeEntity('salt#despensa', 'salt', 'despensa')
    const getEntity = (id: string) => (id === 'salt#despensa' ? original : undefined)

    applyListReorder(updateEntity, addEntity, getEntity, {
      lists: { kitchen: ['salt#kitchen'] },
      changedListId: 'kitchen',
      removedFromListId: null,
      copy: { sourceItemId: 'salt#despensa', newItemId: 'salt#kitchen' },
    })

    expect(updateCalls).toEqual([])
    expect(addCalls).toEqual([{
      id: 'salt#kitchen',
      type: 'ingredient',
      ingredientId: 'salt',
      position: { x: 0, y: 0 },
      size: { width: 1, height: 1 },
      state: 'idle',
      listId: 'kitchen',
    }])
  })

  it('writes position.y as insertion order', () => {
    const calls: Array<[string, Partial<Omit<Entity, 'id'>>]> = []
    const updateEntity = (id: string, changes: Partial<Omit<Entity, 'id'>>) => calls.push([id, changes])
    const addEntity = () => { throw new Error('unexpected addEntity') }
    const getEntity = (id: string) => makeEntity(id, id, 'kitchen')

    applyListReorder(updateEntity, addEntity, getEntity, {
      lists: { kitchen: ['egg', 'potato', 'onion'] },
      changedListId: 'kitchen',
      removedFromListId: null,
      copy: null,
    })

    expect(calls[0][1].position).toEqual({ x: 0, y: 0 })
    expect(calls[1][1].position).toEqual({ x: 0, y: 1 })
    expect(calls[2][1].position).toEqual({ x: 0, y: 2 })
  })
})
</file>

<file path="systems/interaction.ts">
/**
 * FILE: interaction.ts
 *
 * PURPOSE:
 * Handles player interaction logic.
 *
 * RESPONSIBILITY:
 * - Converts user actions into world actions.
 * - Coordinates interaction flow.
 */

import type { Entity } from '../types/Entity'
import type { ApprovedDrop } from './dropRules'

export interface ReorderOptions {
  /**
   * Produces the id for a brand-new instance created by a copy (dragging
   * out of a non-consuming source). MUST be unique per call in real usage,
   * or the copy will collide with another item.
   */
  createCopyId?: (itemId: string) => string
}

export interface ReorderResult {
  lists: Record<string, string[]>
  changedListId: string
  removedFromListId: string | null
  /**
   * Set only when this resolution created a brand-new instance (i.e. a
   * copy out of a non-consuming source). `sourceItemId` is the original,
   * untouched instance; `newItemId` is the id inserted into the target
   * list. The two are intentionally different entities from this point
   * on — moving one must never affect the other.
   */
  copy: { sourceItemId: string; newItemId: string } | null
}

function defaultCreateCopyId(itemId: string): string {
  return `${itemId}--copy--${Math.random().toString(36).slice(2, 8)}`
}

/**
 * Pure: given an already-approved drop, compute the next list ordering.
 * Validation lives in dropRules.ts — this function only rearranges ids.
 */
export function resolveListReorder(
  drop: ApprovedDrop,
  lists: Record<string, string[]>,
  options: ReorderOptions = {},
): ReorderResult | null {
  const sourceIds = lists[drop.source.listId]
  const targetIds = lists[drop.target.listId]
  if (!sourceIds || !targetIds) return null

  const createCopyId = options.createCopyId ?? defaultCreateCopyId
  const next = { ...lists }

  if (drop.kind === 'same-list-reorder') {
    const reordered = sourceIds.filter((itemId) => itemId !== drop.source.itemId)
    reordered.splice(drop.insertAt, 0, drop.source.itemId)
    next[drop.source.listId] = reordered
    return { lists: next, changedListId: drop.source.listId, removedFromListId: null, copy: null }
  }

  if (drop.kind === 'cross-list-move') {
    next[drop.source.listId] = sourceIds.filter((itemId) => itemId !== drop.source.itemId)
    const reorderedTarget = [...targetIds]
    reorderedTarget.splice(drop.insertAt, 0, drop.source.itemId)
    next[drop.target.listId] = reorderedTarget
    return { lists: next, changedListId: drop.target.listId, removedFromListId: drop.source.listId, copy: null }
  }

  const newItemId = createCopyId(drop.source.itemId)
  const reorderedTarget = [...targetIds]
  reorderedTarget.splice(drop.insertAt, 0, newItemId)
  next[drop.target.listId] = reorderedTarget
  return {
    lists: next,
    changedListId: drop.target.listId,
    removedFromListId: null,
    copy: { sourceItemId: drop.source.itemId, newItemId },
  }
}

/**
 * Commit step: writes the changed list's ordering into the store.
 *
 * Each entity belongs to exactly one list at a time (`entity.listId`), so
 * there's nothing to clean up on the source side — reassigning listId (or,
 * for a copy, creating a new entity) is the entire move. The source list's
 * contents are derived live from entity.listId elsewhere (queries.ts), so
 * they update automatically once this runs.
 */
export function applyListReorder(
  updateEntity: (entityId: string, changes: Partial<Omit<Entity, 'id'>>) => void,
  addEntity: (entity: Entity) => void,
  getEntity: (entityId: string) => Entity | undefined,
  result: ReorderResult,
) {
  const itemIds = result.lists[result.changedListId]

  itemIds.forEach((itemId, index) => {
    const position = { x: 0, y: index }

    if (result.copy && itemId === result.copy.newItemId) {
      const original = getEntity(result.copy.sourceItemId)
      if (!original) return
      addEntity({
        id: itemId,
        type: original.type,
        ingredientId: original.ingredientId,
        position,
        size: original.size,
        state: 'idle',
        listId: result.changedListId,
      })
      return
    }

    updateEntity(itemId, { position, listId: result.changedListId })
  })
}
</file>

<file path="systems/movement.ts">
/**
 * FILE: movement.ts
 *
 * PURPOSE:
 * Handles entity movement calculations.
 *
 * RESPONSIBILITY:
 * - Calculates position changes.
 * - Provides movement behavior.
 */

import { worldStore } from '../store/worldStore';

/**
 * Requests that an entity be moved to another container.
 * The reducer determines the source container automatically.
 */
export function moveEntity(
  entityId: string,
  targetContainerId: string,
  positionIndex?: number
): void {
  worldStore.getState().dispatch({
    type: 'MOVE_ENTITY',
    payload: {
      entityId,
      targetContainerId,
      positionIndex,
    },
  });
}
</file>

<file path="systems/queries.test.ts">
import { describe, it, expect } from 'vitest'
import { getIngredientsForList, getListMembership } from './queries'
import { ingredients as catalog } from '../data/catalog/ingredients'
import { recipe as concebolla } from '../data/catalog/recipes/concebolla'
import type { Entity } from '../types/Entity'

function makeEntity(id: string, ingredientId: string, listId: string | null, y = 0): Entity {
  return {
    id,
    type: 'ingredient',
    ingredientId,
    position: { x: 0, y },
    size: { width: 1, height: 1 },
    state: 'idle',
    listId,
  }
}

function allInDespensa(): Record<string, Entity> {
  return Object.fromEntries(
    catalog.map((ingredient, index) => [
      ingredient.id,
      makeEntity(ingredient.id, ingredient.id, 'despensa', index),
    ]),
  )
}

describe('getListMembership', () => {
  it('returns entity ids grouped by listId, sorted by position.y', () => {
    const entities: Record<string, Entity> = {
      onion: makeEntity('onion', 'onion', 'despensa', 1),
      potato: makeEntity('potato', 'potato', 'despensa', 0),
      oil: makeEntity('oil', 'oil', 'fire', 0),
    }
    expect(getListMembership(entities, ['despensa', 'fire', 'kitchen'])).toEqual({
      despensa: ['potato', 'onion'],
      fire: ['oil'],
      kitchen: [],
    })
  })

  it('ignores non-ingredient entities and entities with no listId', () => {
    const entities: Record<string, Entity> = {
      potato: makeEntity('potato', 'potato', 'despensa', 0),
      tortilla: {
        id: 'tortilla',
        type: 'character',
        ingredientId: 'tortilla',
        position: { x: 0, y: 0 },
        size: { width: 1, height: 1 },
        state: 'idle',
        listId: null,
      },
    }
    expect(getListMembership(entities, ['despensa'])).toEqual({ despensa: ['potato'] })
  })
})

describe('getIngredientsForList', () => {

  // ── real entity membership ─────────────────────────────────────────────────

  it('returns entities belonging to the list, sorted by position.y', () => {
    const entities: Record<string, Entity> = {
      onion: makeEntity('onion', 'onion', 'despensa', 1),
      potato: makeEntity('potato', 'potato', 'despensa', 0),
    }
    const result = getIngredientsForList(entities, { id: 'despensa', title: 'Despensa' })
    expect(result.map((i) => i.id)).toEqual(['potato', 'onion'])
  })

  it('ignores entities that do not belong to this list', () => {
    const entities: Record<string, Entity> = {
      potato: makeEntity('potato', 'potato', 'despensa', 0),
      onion: makeEntity('onion', 'onion', 'kitchen', 0),
    }
    const result = getIngredientsForList(entities, { id: 'despensa', title: 'Despensa' })
    expect(result.map((i) => i.id)).toEqual(['potato'])
  })

  it('two instances of the same ingredient in different lists are independent', () => {
    // Regression guard: an ingredient existing in two lists must be two
    // separate entities (separate ids), each pinned to exactly one list —
    // never one entity shared across both.
    const entities: Record<string, Entity> = {
      'potato#despensa': makeEntity('potato#despensa', 'potato', 'despensa', 0),
      'potato#kitchen': makeEntity('potato#kitchen', 'potato', 'kitchen', 0),
    }
    const inDespensa = getIngredientsForList(entities, { id: 'despensa', title: 'Despensa' })
    const inKitchen = getIngredientsForList(entities, { id: 'kitchen', title: 'Kitchen' })

    expect(inDespensa.map((i) => i.id)).toEqual(['potato#despensa'])
    expect(inKitchen.map((i) => i.id)).toEqual(['potato#kitchen'])
  })

  it('an entity belongs to exactly one list — it never appears in a second one', () => {
    const entities: Record<string, Entity> = {
      potato: makeEntity('potato', 'potato', 'kitchen', 0),
    }
    const inDespensa = getIngredientsForList(entities, { id: 'despensa', title: 'Despensa' })
    const inKitchen = getIngredientsForList(entities, { id: 'kitchen', title: 'Kitchen' })

    expect(inDespensa.map((i) => i.id)).not.toContain('potato')
    expect(inKitchen.map((i) => i.id)).toContain('potato')
  })

  it('ignores non-ingredient entities in the same list', () => {
    const entities: Record<string, Entity> = {
      potato: makeEntity('potato', 'potato', 'despensa', 0),
      tortilla: {
        id: 'tortilla',
        type: 'character',
        ingredientId: 'tortilla',
        position: { x: 0, y: 0 },
        size: { width: 1, height: 1 },
        state: 'idle',
        listId: 'despensa',
      },
    }
    const result = getIngredientsForList(entities, { id: 'despensa', title: 'Despensa' })
    expect(result.map((i) => i.id)).toEqual(['potato'])
  })

  it('returns empty when no entities belong to this list and no seed is configured', () => {
    const result = getIngredientsForList(allInDespensa(), { id: 'trash', title: 'Basura' })
    expect(result).toEqual([])
  })

  // ── seedFromCatalog ────────────────────────────────────────────────────────

  it('falls back to full catalog when seedFromCatalog is true and no entities match', () => {
    const result = getIngredientsForList({}, { id: 'despensa', title: 'Despensa', seedFromCatalog: true })
    expect(result.map((i) => i.id)).toEqual(catalog.map((i) => i.id))
  })

  it('despensa shows all ingredients on startup', () => {
    const result = getIngredientsForList(allInDespensa(), {
      id: 'despensa',
      title: 'Despensa',
      seedFromCatalog: true,
    })
    expect(result).toHaveLength(catalog.length)
    expect(result.map((i) => i.id)).toEqual(catalog.map((i) => i.id))
  })

  it('real entity membership takes priority over seedFromCatalog', () => {
    const entities: Record<string, Entity> = {
      potato: makeEntity('potato', 'potato', 'despensa', 0),
    }
    const result = getIngredientsForList(entities, {
      id: 'despensa',
      title: 'Despensa',
      seedFromCatalog: true,
    })
    expect(result.map((i) => i.id)).toEqual(['potato'])
  })

  // ── seedIngredients ────────────────────────────────────────────────────────

  it('kitchen shows concebolla recipe ingredients on startup', () => {
    const kitchenIngredients = concebolla.ingredients
      .filter((i): i is NonNullable<typeof i> => i !== undefined)
      .map((i) => i.id)

    const result = getIngredientsForList(allInDespensa(), {
      id: 'kitchen',
      title: 'Kitchen',
      seedIngredients: kitchenIngredients,
    })
    expect(result.map((i) => i.id)).toEqual(kitchenIngredients)
  })

  it('fire shows only oil on startup', () => {
    const result = getIngredientsForList(allInDespensa(), {
      id: 'fire',
      title: 'Fire',
      seedIngredients: ['oil'],
    })
    expect(result.map((i) => i.id)).toEqual(['oil'])
  })

  it('trash is empty on startup', () => {
    const result = getIngredientsForList(allInDespensa(), { id: 'trash', title: 'Basura' })
    expect(result).toEqual([])
  })

  it('seedIngredients skips ids not found in the catalog', () => {
    const result = getIngredientsForList({}, {
      id: 'kitchen',
      title: 'Kitchen',
      seedIngredients: ['potato', 'unicorn-meat', 'egg'],
    })
    expect(result.map((i) => i.id)).toEqual(['potato', 'egg'])
  })

  it('real entity membership takes priority over seedIngredients', () => {
    const entities: Record<string, Entity> = {
      oil: makeEntity('oil', 'oil', 'fire', 0),
    }
    const result = getIngredientsForList(entities, {
      id: 'fire',
      title: 'Fire',
      seedIngredients: ['oil', 'garlic'],
    })
    expect(result.map((i) => i.id)).toEqual(['oil'])
  })

  // ── view model correctness ─────────────────────────────────────────────────

  it('enriches entities with name and icon from the catalog, keyed by ingredientId', () => {
    const entities = { 'potato#despensa': makeEntity('potato#despensa', 'potato', 'despensa', 0) }
    const result = getIngredientsForList(entities, { id: 'despensa', title: 'Despensa' })
    expect(result[0]).toMatchObject({ id: 'potato#despensa', name: 'Potatoes', icon: '🥔' })
  })

  it('falls back to ingredientId as name and 🥔 icon for unknown ingredient ids', () => {
    const entities: Record<string, Entity> = {
      'mystery#despensa': {
        id: 'mystery#despensa',
        type: 'ingredient',
        ingredientId: 'mystery',
        position: { x: 0, y: 0 },
        size: { width: 1, height: 1 },
        state: 'idle',
        listId: 'despensa',
      },
    }
    const result = getIngredientsForList(entities, { id: 'despensa', title: 'Despensa' })
    expect(result[0]).toMatchObject({ id: 'mystery#despensa', name: 'mystery', icon: '🥔' })
  })

})
</file>

<file path="systems/queries.ts">
/**
 * FILE: queries.ts
 *
 * PURPOSE:
 * Read-only world queries.
 *
 * RESPONSIBILITY:
 * - Finds entities.
 * - Filters world data.
 * - Provides reusable selectors.
 *
 * SHOULD NOT:
 * - Modify state.
 */

import type { Entity } from '../types/Entity'
import type { Ingredient } from '../types/Ingredient'
import type { List } from '../types/IngredientList'
import { ingredients as ingredientCatalog } from '../data/catalog/ingredients'

export function toIngredientView(entity: Entity): Ingredient {
  const catalogEntry = ingredientCatalog.find((ingredient) => ingredient.id === entity.ingredientId)
  return {
    id: entity.id,
    name: catalogEntry?.name ?? entity.ingredientId,
    icon: catalogEntry?.icon ?? '🥔',
  }
}

/**
 * Read-only snapshot of which entity ids live in each list, sorted by
 * position.y. Used by drop rules and interaction — never falls back to
 * seed data; only reflects what's actually in the store.
 */
export function getListMembership(
  entities: Record<string, Entity>,
  listIds: string[],
): Record<string, string[]> {
  const membership = Object.fromEntries(listIds.map((listId) => [listId, [] as string[]]))

  for (const entity of Object.values(entities)) {
    if (entity.type !== 'ingredient' || !entity.listId || !(entity.listId in membership)) continue
    membership[entity.listId].push(entity.id)
  }

  for (const listId of listIds) {
    membership[listId].sort((leftId, rightId) => {
      const leftY = entities[leftId]?.position.y ?? 0
      const rightY = entities[rightId]?.position.y ?? 0
      return leftY - rightY
    })
  }

  return membership
}

export function getIngredientsForList(
  entities: Record<string, Entity>,
  list: List,
): Ingredient[] {
  const matching = Object.values(entities)
    .filter((entity) => entity.type === 'ingredient' && entity.listId === list.id)
    .sort((left, right) => left.position.y - right.position.y)
    .map(toIngredientView)

  if (matching.length > 0) return matching

  if (list.seedFromCatalog) return [...ingredientCatalog]

  if (list.seedIngredients) {
    return list.seedIngredients
      .map((id) => ingredientCatalog.find((i) => i.id === id))
      .filter((i): i is Ingredient => i !== undefined)
  }

  return []
}
</file>

<file path="types/actions.ts">
/**
 * FILE: actions.ts
 *
 * PURPOSE:
 * Defines world actions/events.
 *
 * RESPONSIBILITY:
 * - Creates the communication contract between systems and store.
 */

import type { EntityType } from './world';

export type WorldAction =
  | {
      type: 'MOVE_ENTITY';
      payload: {
        entityId: string;
        targetContainerId: string;
        positionIndex?: number;
      };
    }
  | {
      type: 'ADD_ENTITY';
      payload: {
        entity: {
          id: string;
          name: string;
          type: EntityType;
          state?: Record<string, unknown>;
        };
        containerId: string;
      };
    }
  | {
      type: 'REMOVE_ENTITY';
      payload: {
        entityId: string;
      };
    }
  | {
      type: 'UPDATE_ENTITY_STATE';
      payload: {
        entityId: string;
        changes: Record<string, unknown>;
      };
    };
</file>

<file path="types/Entity.ts">
/**
 * FILE: Entity.ts
 *
 * PURPOSE:
 * Defines the base entity contract.
 *
 * RESPONSIBILITY:
 * - Shared structure for all world objects.
 */

export type EntityType = 'character' | 'ingredient' | 'kitchen-object'

export interface Position {
  x: number
  y: number
}

export interface Size {
  width: number
  height: number
}

export interface Entity {
  id: string            // unique per physical instance — NOT the same as ingredientId
  type: EntityType
  ingredientId: string  // catalog id used to look up name/icon; for non-ingredient
                         // entities (mascot, kitchen-objects) this equals `id`
  position: Position
  size: Size
  state: string          // behavior state: 'idle' | 'walking' | 'carrying' etc
  listId: string | null  // the single list this entity currently lives in (null = unplaced)
}

export interface EntityRelationship {
  sourceId: string
  targetId: string
  type: string
}
</file>

<file path="types/Ingredient.ts">
/**
 * FILE: Ingredient.ts
 *
 * PURPOSE:
 * Defines ingredient data structures.
 *
 * RESPONSIBILITY:
 * - Represents ingredient definitions.
 */

export interface Ingredient {
  id: string
  name: string
  icon: string
}
</file>

<file path="types/IngredientList.ts">
/**
 * FILE: IngredientList.ts
 *
 * PURPOSE:
 * Defines container/list data structures.
 *
 * RESPONSIBILITY:
 * - Represents collections of entities.
 */

import type { Ingredient } from './Ingredient'

export interface IngredientList {
  id: string
  name: string
  ingredients: Ingredient[]
}

export interface List {
  id: string
  title: string
  seedFromCatalog?: boolean
  seedIngredients?: string[]
  consumesOnDrag?: boolean   // true = item is removed from this list when dragged out
}
</file>

<file path="types/RecipeIngredient.ts">
/**
 * FILE: RecipeIngredient.ts
 *
 * PURPOSE:
 * Defines ingredient usage inside recipes.
 *
 * RESPONSIBILITY:
 * - Stores ingredient quantity and unit information.
 */

export interface RecipeIngredient {
  id: string
  ingredientId: string
  amount: number
  unit: string
}
</file>

<file path="types/world.ts">
/**
 * FILE: world.ts
 *
 * PURPOSE:
 * Defines complete world state structures.
 *
 * RESPONSIBILITY:
 * - Describes the game world's data model.
 */

import type { WorldAction } from './actions';

export type EntityType = 'ingredient' | 'tool' | 'mascot';
export type ContainerType = 'storage' | 'pan' | 'board' | 'plate' | 'trash';

export interface Entity {
  id: string;
  name: string;
  type: EntityType;
  state?: Record<string, unknown>;
}

export interface ContainerRules {
  maxCapacity?: number;
  allowedTypes?: EntityType[];
  uniqueTypesOnly?: boolean;
  customValidator?: ( 
    container: Container,
    entity: Entity,
    currentEntities: Entity[]
  ) => boolean;
}

export interface Container {
  id: string;
  name: string;
  type: ContainerType;
  entityIds: string[];
  rules?: ContainerRules;
}

export interface WorldState {
  entities: Record<string, Entity>;
  containers: Record<string, Container>;
  dispatch: (action: WorldAction) => void;
}

export type { WorldAction };
</file>

<file path="App.tsx">
/**
 * FILE: App.tsx
 *
 * PURPOSE:
 * Main React application component.
 *
 * RESPONSIBILITY:
 * - Creates the application layout.
 * - Connects major UI areas together.
 * - Acts as the entry point for the game world.
 *
 * SHOULD NOT:
 * - Contain game rules.
 * - Modify world state directly.
 */

import { Scene } from './components/Scene/Scene';

function App() {
  return (
    <Scene />
  );
}

export default App;
</file>

<file path="index.css">
:root {
  --text: #6b6375;
  --text-h: #08060d;
  --bg: #fff;
  --border: #e5e4e7;
  --code-bg: #f4f3ec;
  --accent: #aa3bff;
  --accent-bg: rgba(170, 59, 255, 0.1);
  --accent-border: rgba(170, 59, 255, 0.5);
  --social-bg: rgba(244, 243, 236, 0.5);
  --shadow:
    rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0 4px 6px -2px;

  --sans: system-ui, 'Segoe UI', Roboto, sans-serif;
  --heading: system-ui, 'Segoe UI', Roboto, sans-serif;
  --mono: ui-monospace, Consolas, monospace;

  font: 18px/145% var(--sans);
  letter-spacing: 0.18px;
  color-scheme: light dark;
  color: var(--text);
  background: var(--bg);
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  @media (max-width: 1024px) {
    font-size: 16px;
  }
}

@media (prefers-color-scheme: dark) {
  :root {
    --text: #9ca3af;
    --text-h: #f3f4f6;
    --bg: #16171d;
    --border: #2e303a;
    --code-bg: #1f2028;
    --accent: #c084fc;
    --accent-bg: rgba(192, 132, 252, 0.15);
    --accent-border: rgba(192, 132, 252, 0.5);
    --social-bg: rgba(47, 48, 58, 0.5);
    --shadow:
      rgba(0, 0, 0, 0.4) 0 10px 15px -3px, rgba(0, 0, 0, 0.25) 0 4px 6px -2px;
  }

  #social .button-icon {
    filter: invert(1) brightness(2);
  }
}

#root {
  width: 1126px;
  max-width: 100%;
  margin: 0 auto;
  text-align: center;
  border-inline: 1px solid var(--border);
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

body {
  margin: 0;
}

h1,
h2 {
  font-family: var(--heading);
  font-weight: 500;
  color: var(--text-h);
}

h1 {
  font-size: 56px;
  letter-spacing: -1.68px;
  margin: 32px 0;
  @media (max-width: 1024px) {
    font-size: 36px;
    margin: 20px 0;
  }
}
h2 {
  font-size: 24px;
  line-height: 118%;
  letter-spacing: -0.24px;
  margin: 0 0 8px;
  @media (max-width: 1024px) {
    font-size: 20px;
  }
}
p {
  margin: 0;
}

code,
.counter {
  font-family: var(--mono);
  display: inline-flex;
  border-radius: 4px;
  color: var(--text-h);
}

code {
  font-size: 15px;
  line-height: 135%;
  padding: 4px 8px;
  background: var(--code-bg);
}
</file>

<file path="main.tsx">
/**
 * FILE: main.tsx
 *
 * PURPOSE:
 * React application bootstrap file.
 *
 * RESPONSIBILITY:
 * - Creates the React root.
 * - Loads global styles.
 * - Starts the application.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
</file>

</files>
`````

## File: .gitignore
`````
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
*.patch
`````

## File: AGENTS.md
`````markdown
# AGENTS.md

## Tortilla World — AI Coding Agent Guide

Welcome to Tortilla World.

This file explains the project context, architecture rules, development environment, and expectations for AI coding agents.

Before changing code:

1. Read this file completely.
2. Understand the entity/container architecture.
3. Check related documentation.
4. Make the smallest correct change.
5. Keep the simulation model consistent.

---

# Project Overview

Tortilla World is an interactive cooking simulation built with:

* React
* TypeScript
* Vite
* Zustand
* dnd-kit
* Framer Motion

It is not a traditional CRUD application.

The application models a small living world.

Objects exist as entities.

Entities are placed inside containers.

Systems modify the world.

---

# Core Mental Model

The most important concept:

```
Entities exist in Containers.

Systems create Actions.

Actions modify the World State.
```

Example:

```
Kitchen

 ├── Potato
 ├── Egg
 ├── Knife
 └── Pan


User action:

Move Potato to Pan


Result:

Kitchen

 ├── Egg
 ├── Knife
 └── Pan


Pan

 └── Potato
```

The potato is not recreated.

Ownership changes.

---

# Important Terminology

## Entity

Anything that exists in the world.

Examples:

* ingredient
* tool
* container
* character
* machine

---

## Container

A world object that owns entities.

Examples:

* kitchen
* pantry
* recipe
* pan
* plate

Containers define:

* what they accept
* ordering
* uniqueness rules
* transfer behaviour

Do not call these "lists".

They are not simple arrays.

---

## System

A piece of logic that changes the world.

Examples:

* Movement System
* Interaction System
* Cooking System
* AI System

React components are not systems.

---

# Architectural Rules

## Rule 1 — Do Not Put Business Logic Into Components

Bad:

```tsx
onDrop={() => {
   moveIngredient()
   validateRecipe()
   updateCooking()
}}
```

Good:

```tsx
onDrop={() => {
   dispatchAction()
}}
```

Components display.

Systems decide.

---

# Rule 2 — Zustand Is the World State

Zustand stores:

* entities
* containers
* relationships
* world state

Zustand should not know:

* mouse events
* DOM elements
* animations
* React components

---

# Rule 3 — Entities Keep Identity

Never solve movement by deleting and recreating objects.

Bad:

```
delete potato

create new potato
```

Good:

```
Kitchen owns potato

changes to:

Pan owns potato
```

---

# Rule 4 — Containers Enforce Rules

Entities do not decide where they can go.

The container decides.

Example:

Potato:

```
Allowed:

Kitchen
Recipe
Pan
Plate
```

The rule belongs to the container.

---

# Rule 5 — Container Contents Are Ordered

Do not replace container contents with Set.

Order matters.

Reasons:

* rendering
* animations
* drag and drop
* visual arrangement

Uniqueness is handled by validation.

---

# Rule 6 — Ingredient Uniqueness

A container cannot contain two identical ingredients.

Valid:

```
Recipe

Potato
Egg
Onion
```

Invalid:

```
Recipe

Potato
Potato
```

Tools are different.

Valid:

```
Kitchen

Pan
Pan
Knife
Knife
```

---

# Repository Structure

```
src/

├── components/
│   React rendering components

├── store/
│   Zustand world state

├── systems/
│   World behaviour

├── types/
│   TypeScript contracts

├── data/
│   Static definitions

└── assets/
    Images and visual resources


docs/

├── entities.md
├── architecture.md
├── systems.md
├── decisions.md
└── roadmap.md
```

---

# Development Environment

## Requirements

Node.js

npm

---

## Install

```bash
npm install
```

---

## Development Server

```bash
npm run dev
```

---

## Build

```bash
npm run build
```

---

## Tests

Run:

```bash
npm run test
```

---

## Lint

Run:

```bash
npm run lint
```

---

# Current Technology Choices

## Frontend

React 19

TypeScript

Vite

---

## State

Zustand

The store represents the simulation state.

---

## Drag and Drop

dnd-kit

Drag and drop is only input.

It does not contain world rules.

---

## Animation

Framer Motion

Animations react to world changes.

---

# Coding Style

## Prefer

Small functions.

Explicit types.

Clear names.

Domain terminology.

Example:

Good:

```ts
moveEntity()
validateContainer()
transferOwnership()
```

Avoid:

```ts
handleStuff()
processData()
updateThing()
```

---

# Before Adding New Features

Ask:

## Is this a new entity?

Example:

```
Knife
Plate
Customer
```

Add entity definition.

---

## Is this a new container?

Example:

```
Fridge
Oven
Table
```

Add container rules.

---

## Is this behaviour?

Example:

```
Cooking
Cutting
Heating
```

Add a system.

---

## Is this only visual?

Example:

```
animation
sprite
layout
```

Keep it inside components.

---

# Common Mistakes To Avoid

## Do not create local copies of world state

Bad:

```ts
const [items,setItems]=useState([])
```

for world objects.

Use the world store.

---

## Do not bypass systems

Bad:

```ts
world.entities[id].container="pan"
```

Good:

```ts
dispatch({
 type:"MOVE_ENTITY"
})
```

---

## Do not create generic abstractions too early

Prefer:

```
one clear system
```

over:

```
many configurable frameworks
```

---

# When Changing Architecture

Update documentation.

Required files:

Architecture change:

```
docs/architecture.md
docs/decisions.md
```

Entity change:

```
docs/entities.md
```

System change:

```
docs/systems.md
```

Future direction:

```
docs/roadmap.md
```

---

# Current Development Priority

The priority order is:

1. Stable entity/container model
2. Reliable movement system
3. Correct drag and drop behaviour
4. Animation layer
5. Cooking mechanics
6. AI actions

Do not skip the foundation.

---

# Final Instruction For Agents

Treat Tortilla World as a simulation engine.

Do not optimize for the shortest React implementation.

Optimize for:

* predictable world behaviour
* clear ownership
* extensibility
* understandable systems

The goal is not a page.

The goal is a living world.

The actual whole code of this repo is in: [repomix-output.xml](https://github.com/felixinberlin/tortilla-world/blob/main/repomix-output.xml)
`````

## File: README.md
`````markdown
# Tortilla World 🌮

An interactive cooking world built with React, TypeScript, and Zustand.

Tortilla World is not just a recipe application. It is a small simulation engine where ingredients, tools, and objects exist as entities inside a living kitchen environment.

Objects can be moved, combined, transformed, and controlled through world rules.

The long-term goal is a kitchen where users and AI agents can interact naturally with the environment.

---

# Vision

Traditional applications are based around screens and forms.

Tortilla World explores a different approach:

> Build a world first. Let applications emerge from the world.

The kitchen is modeled as a collection of entities and containers.

Examples:

```text
Kitchen

 ├── Potato
 ├── Onion
 ├── Egg
 ├── Knife
 └── Pan
```

Actions modify relationships inside the world:

```text
Move potato

Kitchen
   |
   v

Pan
```

The object does not disappear and reappear.

Ownership changes.

---

# Features

## Current

✅ Entity-based world model
✅ Container architecture
✅ Zustand world state
✅ Drag and drop interactions
✅ Ingredient system
✅ Tool system foundation
✅ Animated world objects

---

## Planned

🚧 Cooking simulation
🚧 Recipe engine
🚧 Entity transformations
🚧 Character interactions
🚧 AI kitchen assistant
🚧 Autonomous actions
🚧 Living kitchen environment

See the full roadmap:

[`docs/roadmap.md`](docs/roadmap.md)

---

# Architecture

The project follows a simulation-oriented architecture.

The main concepts are:

```text
Entities
    |
    v
Containers
    |
    v
Systems
    |
    v
Actions
    |
    v
World State
```

---

## Entities

Everything in the world is an entity.

Examples:

* ingredients
* tools
* containers
* characters
* machines

Entities have identity.

Moving an entity changes ownership, not the entity itself.

---

## Containers

Containers are world objects that own entities.

Examples:

* Kitchen
* Pantry
* Recipe
* Pan
* Plate

Containers define rules:

* what they accept
* ordering
* uniqueness
* transfer behaviour

---

## Systems

Systems contain world behaviour.

Examples:

### Movement System

Handles:

* moving objects
* validating transfers
* changing ownership

### Interaction System

Handles:

* user input
* drag and drop
* actions

### Cooking System

Future:

* combining ingredients
* changing states
* producing results

---

More details:

* [`docs/entities.md`](docs/entities.md)
* [`docs/architecture.md`](docs/architecture.md)
* [`docs/systems.md`](docs/systems.md)
* [`docs/decisions.md`](docs/decisions.md)

---

# Technology Stack

## Frontend

* React
* TypeScript
* Vite

## State Management

* Zustand

## Interaction

* dnd-kit

## Animation

* Framer Motion

---

# Project Structure

```text
src/

├── components/
│   UI and world rendering

├── entities/
│   Entity definitions

├── systems/
│   World behaviour

├── store/
│   Zustand world state

├── data/
│   Static world data

└── types/
    TypeScript models
```

---

# Development

## Requirements

* Node.js
* npm

---

## Install

```bash
npm install
```

---

## Run Development Server

```bash
npm run dev
```

---

## Build

```bash
npm run build
```

---

# Design Principles

## World First

The simulation model is independent from the UI.

---

## Systems Control Behaviour

Components display the world.

Systems change the world.

---

## Actions Describe Intent

Actions represent what should happen.

Example:

```ts
{
 type:"MOVE_ENTITY",
 entity:"potato",
 target:"pan"
}
```

The world decides if it is possible.

---

## AI Compatible

Future AI agents will not directly manipulate state.

They will create actions:

```text
AI
 |
 v
Action
 |
 v
World Validation
 |
 v
World Update
```

---

# Why Tortilla?

A tortilla de patatas is a simple dish with interesting complexity:

* few ingredients
* many preparation steps
* tools matter
* timing matters
* small changes affect the result

It is a perfect example for exploring interactive worlds.

---

# Contributing

This project is currently under active development.

The most valuable contributions are:

* architecture discussions
* gameplay ideas
* UI improvements
* simulation ideas
* technical experiments

---

# License

Add license information here.

````

---

## Documentation Map

```text
README.md
    |
    |-- What is Tortilla World?
    |-- How to run it?
    |-- High-level architecture


docs/

├── entities.md
│     What exists?

├── decisions.md
│     Why is it designed this way?

├── architecture.md
│     How does everything connect?

├── systems.md
│     How does behaviour work?

└── roadmap.md
      Where is it going?
````
`````

## File: docs/architecture.md
`````markdown
# Architecture

## Overview

Tortilla World is a simulation-driven React application.

The application is not designed as a collection of UI components with local state.
Instead, it models a small interactive world where entities exist, move, interact, and change state through controlled systems.

The architecture is based on four main concepts:

```text
              User / AI
                  |
                  v
          Interaction System
                  |
                  v
          Action Validation
                  |
                  v
             World Store
                  |
                  v
       Entities and Containers
```

---

# Core Concepts

## Entities

Entities are all objects that exist in the world.

Examples:

* ingredients
* tools
* containers
* characters
* machines

An entity has:

* identity
* type
* properties
* optional state

Example:

```ts
{
  id: "potato",
  type: "ingredient"
}
```

Entities do not control their own behaviour.

They are controlled by systems.

---

# Workstations

Workstations represent *where actions can be performed* in the kitchen simulation:

* **Pantry (`pantry`)**: Store ingredients (`despensa`).
* **Washing Station (`washing_station`)**: Clean ingredients (`sink`).
* **Cutting Station (`cutting_station`)**: Preparation (`board`, `knife`, `peeler`).
* **Preparation Station (`preparation_station`)**: Mix & combine (`bowl`, `whisk`, `fork`).
* **Cooking Station (`cooking_station`)**: Apply heat (`pan`, `spatula`).
* **Serving Station (`serving_station`)**: Plate and serve (`plate`).

---

# Containers

Containers are entities that own other entities.

Examples:

* Kitchen
* Pantry
* Recipe
* Pan
* Plate

A container defines:

* what it can contain
* ordering
* uniqueness rules
* transfer behaviour

Example:

```text
Kitchen
 ├── Potato
 ├── Onion
 ├── Knife
 └── Pan
```

A container is not a simple array.

It is a world object with rules.

---

# Ownership Model

Every movable entity has an owner.

Example:

Initial:

```text
Kitchen
 ├── Potato
 ├── Egg


Pan
 └── Oil
```

After moving potato:

```text
Kitchen
 └── Egg


Pan
 ├── Oil
 └── Potato
```

The potato entity remains the same.

Only the relationship changes:

```text
Before:

Kitchen owns Potato


After:

Pan owns Potato
```

---

# State Management

The world state is stored centrally.

Current technology:

* React
* Zustand

The store represents the complete world.

Example:

```ts
interface WorldState {

 entities:
   Record<string, Entity>

 containers:
   Record<string, Container>

 actions:
   WorldActions

}
```

---

# Data Flow

## User interaction

Example:

User drags potato into pan.

Flow:

```text
Drag Event
    |
    v
D&D Layer
    |
    v
Interaction System
    |
    v
Move Action
    |
    v
Container Validation
    |
    v
World Store Update
    |
    v
React Render
```

---

# Drag and Drop Architecture

Drag and drop is only an input method.

It does not contain business rules.

The DnD system provides:

```ts
{
 entityId:"potato",
 targetContainer:"pan"
}
```

The Interaction System decides:

* is the move allowed?
* what transfer rule applies?
* what state changes happen?

---

# Systems

Systems contain world behaviour.

Examples:

## Movement System

Responsible for:

* moving entities
* validating ownership
* applying transfer rules

---

## Interaction System

Responsible for:

* converting user input into actions
* handling clicks
* handling drag operations

---

## Cooking System

Future system.

Responsible for:

* combining ingredients
* changing states
* producing results

Example:

```text
Potato + Egg + Onion

       |
       v

Tortilla
```

---

## AI System

Future system.

Responsible for:

* generating actions
* planning
* interacting with the world

AI does not modify state directly.

Example:

```ts
{
 type:"MOVE_ENTITY",
 entity:"egg",
 destination:"recipe"
}
```

---

# Actions

All world changes happen through actions.

Example:

```ts
{
 type:"MOVE_ENTITY",

 entityId:"potato",

 source:"kitchen",

 target:"pan"
}
```

Actions provide:

* traceability
* debugging
* replay
* AI compatibility

---

# Containers and Transfer Rules

Moving an entity is not a simple remove/add operation.

The process is:

```text
Move Request

      |
      v

Check source container

      |
      v

Check destination container

      |
      v

Apply transfer rules

      |
      v

Update ownership

      |
      v

Update world state
```

---

# Rendering Architecture

React components display world state.

They do not own world logic.

Example:

```text
World Store

    |
    v

Scene Component

    |
    +---- Container Component
    |
    +---- Entity Component
```

---

# Component Responsibilities

## Entity Component

Responsible for:

* rendering an entity
* animations
* visual state

Does not:

* move itself
* validate actions

---

## Container Component

Responsible for:

* rendering contents
* layout
* accepting interactions

Does not:

* decide business rules

---

# Future Architecture

The architecture is designed to support:

## More containers

Examples:

* fridge
* cupboard
* oven
* table
* customer tray

---

## More entities

Examples:

* characters
* animals
* machines
* recipes

---

## More systems

Examples:

* physics
* time
* cooking
* economy
* AI planning

---

# Design Principles

## 1. Data before UI

The world model exists independently of React.

---

## 2. Rules before actions

Every action must be validated.

---

## 3. Entities keep identity

Movement changes ownership, not objects.

---

## 4. Containers own behaviour

Rules belong to locations, not items.

---

## 5. Systems change the world

Components only represent the world.

---

# Final Architecture Diagram

```text

                 User
                  |
                  |
                  v

          React Interaction Layer
                  |
                  |
                  v

          Interaction System
                  |
                  |
                  v

             Action Queue
                  |
                  |
                  v

          World Simulation
                  |
        +---------+---------+
        |                   |
        v                   v

    Containers          Entities

        |
        |
        v

     Zustand Store

        |
        |
        v

      React UI

```

Tortilla World is therefore structured as a small simulation engine with a React interface, rather than a traditional CRUD application.
`````

## File: docs/redux-devtools-commands.md
`````markdown
# Redux DevTools & Console Test Commands

This document lists test actions and script sequences for Tortilla mascot automation that can be dispatched via **Redux DevTools** or directly in the **Browser Console**.

---

## 1. Redux DevTools Actions (JSON)

Copy and paste these individual action objects into the **Dispatcher** tab of Redux DevTools:

### Step 1: Look at Despensa (Pantry)
```json
{
  "type": "MASCOT_MOVE",
  "payload": {
    "mascotId": "chef",
    "targetContainerId": "despensa"
  }
}
```

### Step 2: Grab Potato from Despensa
```json
{
  "type": "MASCOT_GRAB",
  "payload": {
    "mascotId": "chef",
    "entityId": "potato",
    "sourceContainerId": "despensa"
  }
}
```

### Step 3: Move gaze to Tabla (Workspace Table / Cutting Board)
```json
{
  "type": "MASCOT_MOVE",
  "payload": {
    "mascotId": "chef",
    "targetContainerId": "board"
  }
}
```

### Step 4: Drop Potato in Tabla
```json
{
  "type": "MASCOT_DROP",
  "payload": {
    "mascotId": "chef",
    "targetContainerId": "board"
  }
}
```

### Step 5: Flip Tortilla
```json
{
  "type": "MASCOT_FLIP",
  "payload": {
    "mascotId": "chef"
  }
}
```

---

## 2. Follow Recipe Automation Script Example (Con Cebolla)

This sequence demonstrates how "Follow the recipe" brings all recipe ingredients (potato, egg, oil, onion, salt, pepper) from the catalog pantry to the table (`board`) one by one:

```js
// Browser Console: Follow Recipe Script Example
(async () => {
  const store = window.__ZUSTAND_STORE__ || (await import('/src/store/worldStore.ts')).worldStore;
  const dispatch = store.getState().dispatch;
  const wait = (ms) => new Promise(res => setTimeout(res, ms));

  const recipeIngredients = ['potato', 'egg', 'oil', 'onion', 'salt', 'pepper'];

  for (const ing of recipeIngredients) {
    console.log(`Bringing ${ing} to table...`);
    dispatch({ type: 'MASCOT_MOVE', payload: { mascotId: 'chef', targetContainerId: 'despensa' } });
    await wait(400);

    dispatch({ type: 'MASCOT_GRAB', payload: { mascotId: 'chef', entityId: ing, sourceContainerId: 'despensa' } });
    await wait(400);

    dispatch({ type: 'MASCOT_MOVE', payload: { mascotId: 'chef', targetContainerId: 'board' } });
    await wait(400);

    dispatch({ type: 'MASCOT_DROP', payload: { mascotId: 'chef', targetContainerId: 'board' } });
    await wait(400);
  }

  console.log('Recipe complete! Flip Tortilla!');
  dispatch({ type: 'MASCOT_FLIP', payload: { mascotId: 'chef' } });
})();
```

---

## 3. Helper Function Example

Alternatively, call the system function directly in console:

```js
const { runFollowRecipeScript } = await import('/src/systems/mascotActions.ts');
await runFollowRecipeScript('concebolla', 'chef', 'board', 500);
```
`````

## File: src/components/Controls/ActionRecorder.scss
`````scss
.action-recorder-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: var(--surface, #ffffff);
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 12px;
  padding: 18px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  .recorder-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;

    .recorder-title {
      font-size: 18px;
      font-weight: 700;
      color: var(--text-h, #1e293b);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .recorder-subtitle {
      font-size: 13px;
      color: #64748b;
      margin-top: 2px;
    }
  }

  .recorder-actions-bar {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;

    .rec-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      border: 1px solid #cbd5e1;
      background: #f8fafc;
      color: #334155;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover:not(:disabled) {
        background: #f1f5f9;
        border-color: #94a3b8;
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      &.start-rec {
        background: #ef4444;
        color: #ffffff;
        border-color: #dc2626;

        &:hover {
          background: #dc2626;
        }

        &.is-recording {
          animation: recPulse 1.5s infinite;
        }
      }

      &.stop-rec {
        background: #475569;
        color: #ffffff;
        border-color: #334155;

        &:hover {
          background: #334155;
        }
      }

      &.translate-btn {
        background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
        color: #ffffff;
        border: none;
        box-shadow: 0 2px 6px rgba(99, 102, 241, 0.3);

        &:hover:not(:disabled) {
          background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);
          transform: translateY(-1px);
        }
      }
    }
  }

  .used-ingredients-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 14px;
    background: #f1f5f9;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 13px;
    flex-wrap: wrap;

    .bar-label {
      font-weight: 700;
      color: #334155;
    }

    .no-ingredients-hint {
      color: #94a3b8;
      font-style: italic;
    }

    .chips-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;

      .ingredient-chip {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        background: #ffffff;
        border: 1px solid #cbd5e1;
        border-radius: 16px;
        padding: 3px 10px;
        font-weight: 600;
        color: #1e293b;
        font-size: 12px;
        box-shadow: 0 1px 2px rgba(0,0,0,0.05);
      }
    }
  }

  .translation-preview-panel {
    margin-top: 12px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    padding: 16px;

    .translation-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;

      h4 {
        margin: 0;
        font-size: 16px;
        color: #1e293b;
        display: flex;
        align-items: center;
        gap: 6px;
      }
    }

    .translation-tabs {
      display: flex;
      gap: 8px;
      margin-bottom: 12px;

      .tab-btn {
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 13px;
        font-weight: 600;
        border: 1px solid #cbd5e1;
        background: #ffffff;
        color: #475569;
        cursor: pointer;

        &.active {
          background: #6366f1;
          color: #ffffff;
          border-color: #4f46e5;
        }
      }
    }

    .translation-content {
      pre {
        background: #0f172a;
        color: #f8fafc;
        padding: 12px;
        border-radius: 8px;
        font-size: 12px;
        max-height: 240px;
        overflow-y: auto;
        white-space: pre-wrap;
        word-break: break-word;
      }
    }

    .translation-actions {
      display: flex;
      gap: 10px;
      margin-top: 12px;
      flex-wrap: wrap;

      .action-btn {
        padding: 8px 14px;
        border-radius: 6px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        border: 1px solid #cbd5e1;
        background: #ffffff;
        color: #1e293b;

        &.primary {
          background: #10b981;
          color: #ffffff;
          border-color: #059669;

          &:hover {
            background: #059669;
          }
        }
      }
    }
  }
}

@keyframes recPulse {
  0% {
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.6);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
  }
}
`````

## File: src/components/Controls/ActionRecorder.tsx
`````typescript
/**
 * FILE: ActionRecorder.tsx
 *
 * PURPOSE:
 * Dedicated UI panel component for recording human kitchen actions, inspecting logs,
 * and translating human actions into mascot-guided recipes.
 */

import React, { useState, useMemo } from 'react';
import { useStore } from 'zustand';
import { worldStore } from '../../store/worldStore';
import { ActionReplayer } from './ActionReplayer';
import { actionPlayer } from '../../systems/actionPlayer';
import {
  translateHumanActionsToMascotActions,
  translateHumanActionsToRecipe,
} from '../../systems/recipeTranslator';
import type { Recipe } from '../../types/Recipe';
import type { WorldAction } from '../../types/actions';
import './ActionRecorder.scss';

export const ActionRecorder: React.FC = () => {
  const isRecording = useStore(worldStore, (state) => state.isRecording);
  const recordedActions = useStore(worldStore, (state) => state.recordedActions);
  const usedIngredients = useStore(worldStore, (state) => state.usedIngredients);
  const startRecording = useStore(worldStore, (state) => state.startRecording);
  const stopRecording = useStore(worldStore, (state) => state.stopRecording);
  const clearRecording = useStore(worldStore, (state) => state.clearRecording);

  const [showTranslator, setShowTranslator] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'mascotActions' | 'recipeFile'>('mascotActions');
  const [isPlayingTranslated, setIsPlayingTranslated] = useState<boolean>(false);

  // Translate human actions to mascot actions sequence
  const translatedMascotActions = useMemo(() => {
    if (recordedActions.length === 0) return [];
    return translateHumanActionsToMascotActions(recordedActions);
  }, [recordedActions]);

  // Translate human actions to declarative Recipe definition
  const translatedRecipe: Recipe | null = useMemo(() => {
    if (recordedActions.length === 0) return null;
    return translateHumanActionsToRecipe(recordedActions, {
      recipeName: 'Custom Translated Recipe',
    });
  }, [recordedActions]);

  // Handle downloading translated recipe JSON
  const handleDownloadRecipe = () => {
    if (!translatedRecipe) return;
    const jsonStr = JSON.stringify(translatedRecipe, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${translatedRecipe.id || 'translated-recipe'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Handle replaying translated mascot action sequence
  const handleReplayTranslatedMascotSequence = async () => {
    if (translatedMascotActions.length === 0) return;
    setIsPlayingTranslated(true);

    await actionPlayer.playLog(translatedMascotActions as unknown as WorldAction[], {
      delayMs: 300,
      resetWorld: true,
      onComplete: () => setIsPlayingTranslated(false),
      onStop: () => setIsPlayingTranslated(false),
    });
  };

  return (
    <div className="action-recorder-container">
      <div className="recorder-header">
        <div>
          <div className="recorder-title">
            <span>🎥 Action Recording & Translator</span>
          </div>
          <div className="recorder-subtitle">
            Record live human interactions, replay logs, or translate actions into a mascot recipe.
          </div>
        </div>

        <div className="recorder-status">
          <span className="badge">
            Captured Actions: <strong>{recordedActions.length}</strong>
          </span>
        </div>
      </div>

      <div className="recorder-actions-bar">
        {!isRecording ? (
          <button
            type="button"
            className="rec-btn start-rec"
            onClick={startRecording}
            title="Start recording live kitchen interactions"
          >
            🔴 Start Recording
          </button>
        ) : (
          <button
            type="button"
            className="rec-btn stop-rec"
            onClick={stopRecording}
            title="Stop recording"
          >
            ⏹ Stop Recording ({recordedActions.length})
          </button>
        )}

        {recordedActions.length > 0 && (
          <button
            type="button"
            className="rec-btn"
            onClick={clearRecording}
            title="Clear current recorded actions log"
          >
            🗑 Clear Log
          </button>
        )}

        <button
          type="button"
          className="rec-btn translate-btn"
          disabled={recordedActions.length === 0}
          onClick={() => setShowTranslator(!showTranslator)}
          title="Translate human recorded actions into a mascot recipe with movement"
        >
          🪄 {showTranslator ? 'Hide Translator' : 'Translate to Mascot Recipe'}
        </button>

        <ActionReplayer defaultDelayMs={300} />
      </div>

      <div className="used-ingredients-bar">
        <span className="bar-label">🛒 Saved Ingredients ({usedIngredients.length}):</span>
        {usedIngredients.length === 0 ? (
          <span className="no-ingredients-hint">
            No ingredients used yet. Drag items from the right panel into the kitchen.
          </span>
        ) : (
          <div className="chips-list">
            {usedIngredients.map((ing) => (
              <span key={ing.id} className="ingredient-chip">
                {ing.icon} {ing.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {showTranslator && translatedRecipe && (
        <div className="translation-preview-panel">
          <div className="translation-header">
            <h4>🪄 Translated Mascot Recipe Preview</h4>
          </div>

          <div className="translation-tabs">
            <button
              type="button"
              className={`tab-btn ${activeTab === 'mascotActions' ? 'active' : ''}`}
              onClick={() => setActiveTab('mascotActions')}
            >
              🤖 Mascot Action Sequence ({translatedMascotActions.length} steps)
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'recipeFile' ? 'active' : ''}`}
              onClick={() => setActiveTab('recipeFile')}
            >
              📜 Declarative Recipe File (.json)
            </button>
          </div>

          <div className="translation-content">
            {activeTab === 'mascotActions' ? (
              <pre>{JSON.stringify(translatedMascotActions, null, 2)}</pre>
            ) : (
              <pre>{JSON.stringify(translatedRecipe, null, 2)}</pre>
            )}
          </div>

          <div className="translation-actions">
            <button
              type="button"
              className="action-btn primary"
              onClick={handleReplayTranslatedMascotSequence}
              disabled={isPlayingTranslated}
            >
              {isPlayingTranslated ? '⏳ Replaying...' : '▶ Replay Translated Mascot Sequence'}
            </button>

            <button type="button" className="action-btn" onClick={handleDownloadRecipe}>
              💾 Download Translated Recipe File (.json)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
`````

## File: src/components/Controls/ActionReplayer.scss
`````scss
/**
 * FILE: src/components/Controls/ActionReplayer.scss
 *
 * PURPOSE:
 * SCSS styles for the ActionReplayer JSON load/playback component.
 */

@use 'sass:color';
@use '../../styles/variables' as *;
@use '../../styles/mixins' as *;

.action-replayer {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;

  .file-input-hidden {
    display: none;
  }

  .step-controls-group {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;

    .step-btn {
      background: #f8fafc;
      border-color: #cbd5e1;
      color: #334155;

      &:hover:not(:disabled) {
        background: #e2e8f0;
        border-color: #94a3b8;
      }

      &.step-forward-btn {
        background: #eff6ff;
        border-color: #93c5fd;
        color: #1d4ed8;

        &:hover:not(:disabled) {
          background: #dbeafe;
          border-color: #3b82f6;
        }
      }
    }

    .play-btn {
      background: #f0fdf4;
      border-color: #86efac;
      color: #15803d;

      &:hover:not(:disabled) {
        background: #dcfce7;
        border-color: #22c55e;
      }
    }

    .reset-btn {
      background: #fef2f2;
      border-color: #fca5a5;
      color: #b91c1c;

      &:hover:not(:disabled) {
        background: #fee2e2;
        border-color: #ef4444;
      }
    }
  }

  .replayer-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    font-size: 13px;
    font-weight: 700;
    border-radius: $radius-sm;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid $warm-border;
    background: #ffffff;
    color: $dark-brown;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

    &:hover:not(:disabled) {
      background: $tortilla-yellow-light;
      border-color: $tortilla-yellow;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &.load-btn {
      border-color: $olive-green;
      color: $olive-green-hover;

      &:hover:not(:disabled) {
        background: rgba(107, 142, 35, 0.1);
      }
    }

    &.stop-btn {
      border-color: $terracotta;
      color: $terracotta;
      background: $terracotta-light;

      &:hover:not(:disabled) {
        background: $terracotta;
        color: #ffffff;
      }
    }
  }

  .playback-status {
    display: flex;
    align-items: center;
    gap: 8px;
    background: $warm-surface;
    border: 1px solid $warm-border;
    padding: 4px 12px;
    border-radius: $radius-sm;
    font-size: 12px;
    font-weight: 700;
    color: $dark-brown;

    .progress-bar-container {
      width: 80px;
      height: 6px;
      background: rgba(0, 0, 0, 0.08);
      border-radius: 3px;
      overflow: hidden;

      .progress-bar-fill {
        height: 100%;
        background: $olive-green;
        transition: width 0.15s ease-out;
      }
    }
  }

  .delay-select {
    padding: 4px 8px;
    font-size: 12px;
    font-weight: 600;
    border-radius: $radius-sm;
    border: 1px solid $warm-border;
    background: #ffffff;
    color: $dark-brown;
    cursor: pointer;

    &:focus {
      outline: none;
      border-color: $tortilla-yellow;
    }
  }

  .error-message {
    font-size: 12px;
    color: $terracotta;
    font-weight: 600;
  }
}
`````

## File: src/components/Controls/IngredientsSidebar.scss
`````scss
.ingredients-sidebar-container {
  width: 280px;
  min-width: 260px;
  background: var(--surface, #ffffff);
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: calc(100vh - 200px);
  overflow-y: auto;

  .sidebar-header {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .sidebar-title {
      font-size: 16px;
      font-weight: 700;
      color: #1e293b;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .sidebar-subtitle {
      font-size: 12px;
      color: #64748b;
    }
  }

  .sidebar-search {
    width: 100%;

    input {
      width: 100%;
      padding: 8px 12px;
      border-radius: 8px;
      border: 1px solid #cbd5e1;
      font-size: 13px;
      outline: none;
      transition: border-color 0.2s ease;

      &:focus {
        border-color: #6366f1;
      }
    }
  }

  .sidebar-category-tabs {
    display: flex;
    gap: 6px;

    .tab-btn {
      flex: 1;
      padding: 5px 8px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      border: 1px solid #cbd5e1;
      background: #f8fafc;
      color: #475569;
      cursor: pointer;
      text-align: center;
      transition: all 0.2s ease;

      &.active {
        background: #8b5cf6;
        color: #ffffff;
        border-color: #7c3aed;
      }
    }
  }

  .items-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    margin-top: 4px;

    .sidebar-item-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 8px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      position: relative;
      transition: all 0.2s ease;

      &:hover {
        background: #f1f5f9;
        border-color: #cbd5e1;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
      }

      .item-entity-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
      }

      .quick-add-btn {
        margin-top: 6px;
        width: 100%;
        padding: 4px 6px;
        font-size: 11px;
        font-weight: 700;
        border-radius: 6px;
        border: 1px solid #cbd5e1;
        background: #ffffff;
        color: #334155;
        cursor: pointer;
        transition: all 0.15s ease;

        &:hover {
          background: #10b981;
          color: #ffffff;
          border-color: #059669;
        }
      }
    }
  }

  .no-results {
    padding: 16px;
    text-align: center;
    font-size: 13px;
    color: #94a3b8;
    font-style: italic;
  }
}
`````

## File: src/components/Controls/IngredientsSidebar.tsx
`````typescript
/**
 * FILE: IngredientsSidebar.tsx
 *
 * PURPOSE:
 * Right-side ingredients and tools catalog panel for recording mode.
 *
 * RESPONSIBILITY:
 * - Displays all available ingredients and tools from the catalog.
 * - Enables drag-and-drop or quick-add into kitchen workstations.
 * - Filters items by category (All, Ingredients, Tools) and search query.
 */

import React, { useState, useMemo } from 'react';
import { useStore } from 'zustand';
import { worldStore } from '../../store/worldStore';
import { ingredients } from '../../data/catalog/ingredients';
import { catalogTools } from '../../data/catalog/tools';
import { EntityView } from '../World/EntityView';
import type { Entity } from '../../types/world';
import './IngredientsSidebar.scss';

export const IngredientsSidebar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'all' | 'ingredients' | 'tools'>('all');

  const entities = useStore(worldStore, (state) => state.entities);
  const containers = useStore(worldStore, (state) => state.containers);

  // Combine ingredients and tools catalog list
  const catalogList = useMemo(() => {
    const ingEntities: Entity[] = ingredients.map((ing) => {
      const existing = entities[ing.id];
      if (existing) return existing;
      return {
        id: ing.id,
        ingredientId: ing.id,
        name: `${ing.icon} ${ing.name}`,
        type: 'ingredient',
        state: {},
      };
    });

    const toolEntities: Entity[] = catalogTools.map((tool) => {
      const existing = entities[tool.id];
      if (existing) return existing;
      return {
        id: tool.id,
        name: `${tool.icon} ${tool.name}`,
        type: 'tool',
        state: {},
      };
    });

    return { ingEntities, toolEntities };
  }, [entities]);

  // Filter items based on activeTab and searchQuery
  const filteredItems = useMemo(() => {
    let items: Entity[] = [];
    if (activeTab === 'all') {
      items = [...catalogList.ingEntities, ...catalogList.toolEntities];
    } else if (activeTab === 'ingredients') {
      items = catalogList.ingEntities;
    } else if (activeTab === 'tools') {
      items = catalogList.toolEntities;
    }

    if (!searchQuery.trim()) return items;

    const query = searchQuery.toLowerCase();
    return items.filter(
      (item) => item.name.toLowerCase().includes(query) || item.id.toLowerCase().includes(query)
    );
  }, [catalogList, activeTab, searchQuery]);

  // Handle quick-adding an entity into the primary workstation (e.g., board or bowl)
  const handleQuickAdd = (entityId: string) => {
    // Find a target container (preferably board or bowl, or first available workstation)
    const targetId =
      containers['board']?.id ||
      containers['bowl']?.id ||
      Object.keys(containers).find((id) => id !== 'despensa') ||
      'board';

    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: {
        entityId,
        targetContainerId: targetId,
      },
    });
  };

  return (
    <div className="ingredients-sidebar-container" data-container-id="despensa">
      <div className="sidebar-header">
        <div className="sidebar-title">
          <span>🧺 Ingredients Catalog</span>
        </div>
        <div className="sidebar-subtitle">
          Drag items or tap ➕ to place into the kitchen workstation
        </div>
      </div>

      <div className="sidebar-search">
        <input
          type="text"
          placeholder="🔍 Search ingredients or tools..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="sidebar-category-tabs">
        <button
          type="button"
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All ({catalogList.ingEntities.length + catalogList.toolEntities.length})
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'ingredients' ? 'active' : ''}`}
          onClick={() => setActiveTab('ingredients')}
        >
          Ingredients ({catalogList.ingEntities.length})
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'tools' ? 'active' : ''}`}
          onClick={() => setActiveTab('tools')}
        >
          Tools ({catalogList.toolEntities.length})
        </button>
      </div>

      <div className="items-grid">
        {filteredItems.map((item) => (
          <div key={item.id} className="sidebar-item-card">
            <div className="item-entity-wrapper">
              <EntityView entity={item} containerId="despensa" readOnly={false} />
            </div>
            <button
              type="button"
              className="quick-add-btn"
              onClick={() => handleQuickAdd(item.id)}
              title={`Add ${item.name} to workstation`}
            >
              ➕ Take
            </button>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="no-results">No ingredients found matching "{searchQuery}"</div>
      )}
    </div>
  );
};
`````

## File: src/components/Ingredients/Ingredients.scss
`````scss
/**
 * FILE: src/components/Ingredients/Ingredients.scss
 *
 * PURPOSE:
 * SCSS styles for ingredient list panels, item lists, and recipe ingredients.
 */

@use 'sass:color';
@use '../../styles/variables' as *;
@use '../../styles/mixins' as *;

.ingredient-list-panel {
  @include ceramic-card($warm-surface, $warm-border);
  min-width: 240px;
  padding: 16px;
}

.ingredient-list-header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;

  h3 {
    color: $dark-brown;
    font-size: 1rem;
    font-weight: 700;
    margin: 0;
  }

  span {
    color: $wood-muted;
    font-size: 0.82rem;
    font-weight: 600;
  }
}

.ingredient-list,
.recipe-ingredient-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.ingredient-list-item,
.recipe-ingredient-item {
  align-items: center;
  background: #ffffff;
  border: 1px solid $warm-border;
  border-radius: $radius-md;
  box-shadow: 0 2px 6px rgba(44, 26, 20, 0.04);
  display: flex;
  gap: 0.5rem;
  padding: 8px 12px;
  user-select: none;
  transition: all 0.2s ease;

  &:hover {
    border-color: color.mix($tortilla-yellow, $warm-border, 50%);
  }

  &:active {
    cursor: grabbing;
  }
}

.ingredient-list-item-body {
  align-items: center;
  cursor: grab;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  gap: 0.5rem;
  min-width: 0;

  &:active {
    cursor: grabbing;
  }
}

.ingredient-remove {
  align-items: center;
  background: transparent;
  border: none;
  border-radius: $radius-sm;
  color: $wood-muted;
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  font-size: 1.15rem;
  height: 1.75rem;
  justify-content: center;
  line-height: 1;
  padding: 0;
  width: 1.75rem;
  transition: all 0.15s ease;

  &:hover {
    background: $warm-beige;
    color: $terracotta;
  }

  &:focus-visible {
    outline: 2px solid $terracotta;
    outline-offset: 2px;
  }
}

.recipe-ingredient-amount {
  margin-left: auto;
  font-size: 0.8rem;
  color: $wood-muted;
  font-weight: 600;
}

.scene-panel {
  display: flex;
  gap: 16px;
  margin-top: 16px;
  flex-wrap: wrap;
}

@media (max-width: 30rem) {
  .recipe-ingredient-amount {
    margin-left: 0;
    width: 100%;
  }
}
`````

## File: src/components/Ingredients/RecipeIngredientItem.tsx
`````typescript
/**
 * FILE: RecipeIngredientItem.tsx
 *
 * PURPOSE:
 * Displays an ingredient used in a recipe.
 *
 * RESPONSIBILITY:
 * - Shows ingredient amount and unit.
 * - Represents recipe-specific ingredient data.
 */

import type { Ingredient } from '../../types/Ingredient'

interface RecipeIngredientItemProps {
  key?: string | number
  ingredient: Ingredient
  amount: number
  unit: string
}

export function RecipeIngredientItem({
  ingredient,
  amount,
  unit,
}: RecipeIngredientItemProps) {
  return (
    <li className="recipe-ingredient-item">
      <span aria-hidden="true">{ingredient.icon}</span>
      <span className="recipe-ingredient-name">{ingredient.name}</span>
      <span className="recipe-ingredient-amount">
        {amount} {unit}
      </span>
    </li>
  )
}
`````

## File: src/components/Ingredients/RecipeIngredientList.tsx
`````typescript
/**
 * FILE: RecipeIngredientList.tsx
 *
 * PURPOSE:
 * Displays the ingredients required by a recipe.
 *
 * RESPONSIBILITY:
 * - Renders recipe ingredient collection.
 * - Provides recipe-oriented presentation.
 */

import type { Ingredient } from '../../types/Ingredient'
import type { RecipeIngredient } from '../../types/RecipeIngredient'
import './Ingredients.scss'
import { RecipeIngredientItem } from './RecipeIngredientItem'

interface RecipeIngredientListProps {
  ingredients: RecipeIngredient[]
  ingredientCatalog: Ingredient[]
}

export function RecipeIngredientList({
  ingredients,
  ingredientCatalog,
}: RecipeIngredientListProps) {
  const ingredientsById = new Map(
    ingredientCatalog.map((ingredient) => [ingredient.id, ingredient]),
  )

  return (
    <ul className="recipe-ingredient-list">
      {ingredients.map((recipeIngredient) => {
        const ingredient = ingredientsById.get(recipeIngredient.ingredientId)

        if (!ingredient) {
          return null
        }

        return (
          <RecipeIngredientItem
            key={recipeIngredient.id}
            amount={recipeIngredient.amount}
            ingredient={ingredient}
            unit={recipeIngredient.unit}
          />
        )
      })}
    </ul>
  )
}
`````

## File: src/components/World/EntityView.tsx
`````typescript
/**
 * FILE: EntityView.tsx
 *
 * PURPOSE:
 * Generic entity renderer component.
 *
 * RESPONSIBILITY:
 * - Renders entities based on entity type via a renderer registry.
 * - Handles drag-and-drop interactions or static read-only presentation.
 */

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import type { Entity } from '../../types/world';
import { EntityIcon } from './EntityIcon';
import { EntityStateBadge } from './EntityStateBadge';
import { entityRendererRegistry, type EntityRendererProps } from './rendererRegistry';

/**
 * Default Entity Renderer used when no custom renderer is registered for an entity type.
 */
export const DefaultEntityRenderer: React.FC<EntityRendererProps> = ({ entity, containerId }) => {
  return (
    <>
      <span className="entity-view__icon">
        <EntityIcon entity={entity} />
      </span>
      <span className="entity-view__name">{entity.name}</span>
      <EntityStateBadge entity={entity} containerId={containerId} />
    </>
  );
};

interface EntityViewProps {
  entity: Entity;
  containerId?: string;
  readOnly?: boolean;
}

/**
 * Inner component for interactive draggable entities (must be used inside a DndContext).
 */
const DraggableEntityView: React.FC<EntityViewProps> = ({ entity, containerId }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: entity.id,
  });

  const style: React.CSSProperties = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.6 : 1,
        zIndex: isDragging ? 1000 : 1,
        cursor: 'grab',
      }
    : {
        cursor: 'grab',
      };

  const CustomRenderer = entityRendererRegistry[entity.type];
  const RendererComponent = CustomRenderer || DefaultEntityRenderer;

  const className = [
    'entity-view',
    `entity-view--type-${entity.type}`,
    isDragging ? 'entity-view--dragging' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      data-entity-id={entity.id}
      data-ingredient-id={entity.ingredientId || entity.id}
      className={className}
    >
      <RendererComponent entity={entity} containerId={containerId} readOnly={false} />
    </div>
  );
};

export const EntityView: React.FC<EntityViewProps> = ({ entity, containerId, readOnly = false }) => {
  if (readOnly) {
    const CustomRenderer = entityRendererRegistry[entity.type];
    const RendererComponent = CustomRenderer || DefaultEntityRenderer;

    const className = [
      'entity-view',
      `entity-view--type-${entity.type}`,
      'entity-view--readonly',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        data-entity-id={entity.id}
        data-ingredient-id={entity.ingredientId || entity.id}
        className={className}
      >
        <RendererComponent entity={entity} containerId={containerId} readOnly />
      </div>
    );
  }

  return <DraggableEntityView entity={entity} containerId={containerId} />;
};
`````

## File: src/data/catalog/recipes/index.ts
`````typescript
/**
 * FILE: index.ts
 *
 * PURPOSE:
 * Master export and catalog for all recipe definitions.
 *
 * RESPONSIBILITY:
 * - Collects all available recipes into a typed RecipeList.
 * - Provides a single entry point for accessing recipes.
 * - New recipes only need to be added here to appear in the catalog.
 */

import type { RecipeList } from '../../../types/Recipe'

import { concebollaRecipe } from './concebolla';
import { clasicaRecipe } from './clasica';

/**
 * Master recipe catalog.
 *
 * Used by systems that need access to all available recipes.
 */
export const recipes: RecipeList = [
  concebollaRecipe,
  clasicaRecipe,
];

export const sincebollaRecipe = clasicaRecipe;

/**
 * Individual recipe exports.
 *
 * Useful for:
 * - Recipe detail views
 * - Testing
 * - Debugging
 * - Future recipe editors
 */
export {
  concebollaRecipe,
  clasicaRecipe,
};
`````

## File: src/data/catalog/workstations.ts
`````typescript
/**
 * FILE: workstations.ts
 *
 * PURPOSE:
 * Static registry of kitchen workstations.
 *
 * RESPONSIBILITY:
 * - Defines all workstations in the kitchen and their supported actions/capabilities.
 */

import type { Workstation, WorkstationId } from '../../types/workstations';

export const KITCHEN_WORKSTATIONS: Record<WorkstationId, Workstation> = {
  pantry: {
    id: 'pantry',
    name: 'Pantry',
    purpose: 'Store ingredients',
    supportedActions: ['take', 'store', 'move', 'grab'],
    defaultContainerId: 'despensa',
  },
  washing_station: {
    id: 'washing_station',
    name: 'Washing Station',
    purpose: 'Clean ingredients',
    supportedActions: ['wash', 'rinse', 'drain'],
    defaultContainerId: 'sink',
  },
  cutting_station: {
    id: 'cutting_station',
    name: 'Cutting Station',
    purpose: 'Change ingredient preparation',
    supportedActions: ['prepare', 'cut', 'peel'],
    defaultContainerId: 'board',
    requiredTools: ['knife'],
    optionalTools: ['peeler', 'mandoline', 'grater'],
  },
  preparation_station: {
    id: 'preparation_station',
    name: 'Preparation Station',
    purpose: 'Combine ingredients',
    supportedActions: ['crack', 'beat', 'whisk', 'mix', 'season', 'knead'],
    defaultContainerId: 'bowl',
    requiredTools: [],
    optionalTools: ['fork', 'whisk', 'spoon'],
  },
  cooking_station: {
    id: 'cooking_station',
    name: 'Cooking Station',
    purpose: 'Apply heat',
    supportedActions: ['heat', 'fry', 'boil', 'steam', 'grill', 'bake', 'roast', 'cook'],
    defaultContainerId: 'pan',
    requiredTools: ['pan'],
    optionalTools: ['pot', 'spatula'],
    isOn: false,
  },
  serving_station: {
    id: 'serving_station',
    name: 'Serving Station',
    purpose: 'Finish recipes',
    supportedActions: ['plate', 'garnish', 'serve'],
    defaultContainerId: 'plate',
  },
};
`````

## File: src/engine/ingredientState.ts
`````typescript
/**
 * FILE: ingredientState.ts
 *
 * PURPOSE:
 * Helpers for deriving ingredient status and display name transformations.
 *
 * RESPONSIBILITY:
 * - Derives preparation status strings (e.g., 'sliced-potatoe', 'peeled').
 * - Derives cooking status strings (e.g., 'fried-sliced-potatoe').
 * - Formats updated ingredient names with emoji and preparation.
 */

import type { Entity } from '../types/world';
import { ingredients as catalogIngredients } from '../data/catalog/ingredients';

/**
 * Normalizes an ingredient entity ID or ingredientId to a singular ingredient key for generic status formatting.
 * Examples: 'potatoes' | 'potato' -> 'potatoe'
 *           'onions' | 'onion' -> 'onion'
 *           'carrots' | 'carrot' -> 'carrot'
 */
export function getIngredientSingularKey(targetEntity: Entity): string {
  const baseKey = (targetEntity.ingredientId || targetEntity.id.split('_')[0] || 'ingredient').toLowerCase();
  if (baseKey.startsWith('potato')) return 'potatoe';
  if (baseKey.startsWith('tomato')) return 'tomato';
  if (baseKey.startsWith('onion')) return 'onion';
  if (baseKey.startsWith('carrot')) return 'carrot';
  if (baseKey.endsWith('es') && baseKey.length > 3) return baseKey.slice(0, -2);
  if (baseKey.endsWith('s') && !['cheese', 'glass'].includes(baseKey) && baseKey.length > 2) return baseKey.slice(0, -1);
  return baseKey;
}

/**
 * Derives the generic status string for a prepared ingredient.
 * Examples:
 * - preparation 'peeled' -> 'peeled'
 * - preparation 'sliced' for potato -> 'sliced-potatoe'
 * - preparation 'diced' for onion -> 'diced-onion'
 */
export function derivePreparationStatus(targetEntity: Entity, preparation: string): string {
  const singularKey = getIngredientSingularKey(targetEntity);
  return preparation === 'peeled' ? 'peeled' : `${preparation}-${singularKey}`;
}

/**
 * Derives the generic status string for a cooked ingredient.
 * Examples:
 * - cooking 'fried' with prep 'sliced' for potato -> 'fried-sliced-potatoe'
 */
export function deriveCookingStatus(targetEntity: Entity, cooking: string): string {
  const singularKey = getIngredientSingularKey(targetEntity);
  const prep = targetEntity.state?.preparation;
  if (cooking === 'raw') {
    return prep ? (prep === 'peeled' ? 'peeled' : `${prep}-${singularKey}`) : 'raw';
  }
  return `${cooking}-${prep ? prep + '-' : ''}${singularKey}`;
}

/**
 * Formats an ingredient entity's display name after preparation.
 */
export function formatPreparedName(targetEntity: Entity, preparation: string): string {
  const singularKey = getIngredientSingularKey(targetEntity);
  const baseKey = (targetEntity.ingredientId || targetEntity.id.split('_')[0] || 'ingredient').toLowerCase();
  const catalogItem = catalogIngredients.find(
    (i) => i.id === targetEntity.ingredientId || i.id === baseKey || i.id === singularKey
  );
  const icon = catalogItem?.icon || (targetEntity.name.match(/^(\p{Emoji}|\p{Extended_Pictographic})/u)?.[0] ?? '');
  const baseName = catalogItem?.name || targetEntity.name.replace(/^(\p{Emoji}|\p{Extended_Pictographic})\s*/u, '');

  const capitalizedPrep = preparation.charAt(0).toUpperCase() + preparation.slice(1);
  return `${icon} ${capitalizedPrep} ${baseName}`.trim();
}

/**
 * Formats an ingredient entity's display name after cooking.
 */
export function formatCookedName(targetEntity: Entity, cooking: string): string {
  if (
    targetEntity.id.startsWith('mixture_') ||
    targetEntity.ingredientId === 'mixture' ||
    targetEntity.name.toLowerCase().includes('mixture')
  ) {
    return targetEntity.name;
  }

  const singularKey = getIngredientSingularKey(targetEntity);
  const baseKey = (targetEntity.ingredientId || targetEntity.id.split('_')[0] || 'ingredient').toLowerCase();
  const catalogItem = catalogIngredients.find(
    (i) => i.id === targetEntity.ingredientId || i.id === baseKey || i.id === singularKey
  );
  const icon = catalogItem?.icon || (targetEntity.name.match(/^(\p{Emoji}|\p{Extended_Pictographic})/u)?.[0] ?? '');
  const baseName = catalogItem?.name || targetEntity.name.replace(/^(\p{Emoji}|\p{Extended_Pictographic})\s*/u, '');

  const cookingWord = cooking === 'fry' || cooking === 'fried' ? 'Cooked' : cooking.charAt(0).toUpperCase() + cooking.slice(1);
  const prep = targetEntity.state?.preparation;
  const prepWord = prep && prep !== 'whole' && prep !== 'raw' ? prep.charAt(0).toUpperCase() + prep.slice(1) + ' ' : '';
  return `${icon} ${cookingWord} ${prepWord}${baseName}`.trim();
}
`````

## File: src/store/middleware/actionLog.test.ts
`````typescript
/**
 * FILE: actionLog.test.ts
 *
 * PURPOSE:
 * Unit tests for actionLog Zustand middleware.
 *
 * RESPONSIBILITY:
 * - Validates action recording, log size limits, and clearing behavior.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { createStore } from 'zustand/vanilla';
import { devtools } from 'zustand/middleware';
import { actionLog, clearActionLog, getActionLog } from './actionLog';

interface CounterState {
  count: number;
  incrementLabelled: () => void;
  incrementUnlabelled: () => void;
}

function makeStore() {
  return createStore<CounterState>()(
    devtools(
      actionLog((set) => ({
        count: 0,
        incrementLabelled: () =>
          set((state) => ({ count: state.count + 1 }), false, 'INCREMENT'),
        incrementUnlabelled: () => set((state) => ({ count: state.count + 1 })),
      })),
      { enabled: false }
    )
  );
}

describe('actionLog middleware', () => {
  beforeEach(() => {
    clearActionLog();
  });

  it('records a labelled set call', () => {
    const store = makeStore();
    store.getState().incrementLabelled();

    const log = getActionLog();
    expect(log).toHaveLength(1);
    expect(log[0].action).toBe('INCREMENT');
    expect(store.getState().count).toBe(1);
  });

  it('does not record an unlabelled set call', () => {
    const store = makeStore();
    store.getState().incrementUnlabelled();

    expect(getActionLog()).toHaveLength(0);
    expect(store.getState().count).toBe(1);
  });

  it('caps the log at 200 entries, dropping the oldest first', () => {
    const store = makeStore();
    for (let i = 0; i < 205; i++) {
      store.getState().incrementLabelled();
    }

    const log = getActionLog();
    expect(log).toHaveLength(200);
    expect(store.getState().count).toBe(205);
  });

  it('clearActionLog empties the log', () => {
    const store = makeStore();
    store.getState().incrementLabelled();
    clearActionLog();

    expect(getActionLog()).toHaveLength(0);
  });
});
`````

## File: src/store/middleware/actionLog.ts
`````typescript
/**
 * FILE: actionLog.ts
 *
 * PURPOSE:
 * Zustand middleware for recording world actions.
 *
 * RESPONSIBILITY:
 * - Observes store mutations.
 * - Creates an action history/debug log.
 *
 * USED FOR:
 * - Debugging.
 * - Future replay systems.
 */

import type { StateCreator, StoreMutatorIdentifier } from 'zustand/vanilla';

export interface ActionLogEntry {
  /** The action's label, e.g. "MOVE_ENTITY". */
  action: string;
  timestamp: number;
}

const MAX_ENTRIES = 200;

let entries: ActionLogEntry[] = [];

/** Read-only snapshot of recorded world actions, oldest first. */
export function getActionLog(): ActionLogEntry[] {
  return [...entries];
}

/** Clears the recorded history. Mainly useful between tests. */
export function clearActionLog(): void {
  entries = [];
}

type ActionLogMiddleware = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  initializer: StateCreator<T, Mps, Mcs>,
) => StateCreator<T, Mps, Mcs>;

/**
 * Records every labelled `set` call into an in-memory action log — the
 * "Action Queue" docs/systems.md describes for debugging, replay, and
 * future AI compatibility.
 *
 * A reducer opts a state change into the log by passing a label as the
 * third argument to `set`, the same convention the `devtools` middleware
 * uses for naming actions in Redux DevTools:
 *
 *   set(nextState, false, 'MOVE_ENTITY')
 *
 * Intended to sit directly beneath `devtools` in the middleware stack
 * (`devtools(actionLog(initializer))`), so it observes the same labelled
 * `set` calls devtools does. Calls without a string label are forwarded
 * unlogged.
 */
export const actionLog: ActionLogMiddleware = (initializer) => (set, get, api) => {
  const loggedSet = ((partial: unknown, replace?: unknown, label?: unknown) => {
    if (typeof label === 'string') {
      entries.push({ action: label, timestamp: Date.now() });
      if (entries.length > MAX_ENTRIES) entries.shift();
    }
    return (set as (...args: unknown[]) => void)(partial, replace, label);
  }) as typeof set;

  return initializer(loggedSet, get, api);
};
`````

## File: src/styles/_mixins.scss
`````scss
/**
 * FILE: src/styles/_mixins.scss
 *
 * PURPOSE:
 * Reusable SCSS mixins for ceramic cards, workstation panels, and interactive elements.
 */

@use 'sass:color';
@use './variables' as *;

// Cozy ceramic card container mixin
@mixin ceramic-card($bg-color: $warm-surface, $border-color: $warm-border) {
  background: $bg-color;
  border: 1px solid $border-color;
  border-radius: $radius-lg;
  box-shadow: $shadow-ceramic;
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}

// Workstation panel header styling
@mixin workstation-header($accent-color, $text-color: $dark-brown) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 2px dashed color.mix($accent-color, white, 35%);
  margin-bottom: 12px;

  h3 {
    color: $text-color;
    font-size: 1.05rem;
    font-weight: 700;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .workstation-badge {
    font-size: 0.75rem;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: $radius-sm;
    background: color.mix($accent-color, white, 18%);
    color: $accent-color;
    border: 1px solid color.mix($accent-color, white, 40%);
  }
}

// Interactive wooden/playful button mixin
@mixin playful-button($bg: $tortilla-yellow, $text: #ffffff) {
  background: $bg;
  color: $text;
  border: none;
  border-radius: $radius-sm;
  padding: 8px 14px;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(44, 26, 20, 0.12);
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(44, 26, 20, 0.18);
    filter: brightness(1.04);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 1px 3px rgba(44, 26, 20, 0.15);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    box-shadow: none;
  }
}

// Flex center helper
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
`````

## File: src/styles/_variables.scss
`````scss
/**
 * FILE: src/styles/_variables.scss
 *
 * PURPOSE:
 * Design system tokens and color variables for Tortilla World simulation app.
 */

// === PRIMARY PALETTE ===
// Warm tortilla yellow: main brand color (cooked egg & golden potato)
$tortilla-yellow: #e8a838;
$tortilla-yellow-hover: #d99729;
$tortilla-yellow-light: #fef7e8;
$tortilla-yellow-border: #f1c875;

// Olive green: secondary actions & natural Mediterranean elements
$olive-green: #5b8a46;
$olive-green-hover: #4b7339;
$olive-green-light: #f1f7ef;
$olive-green-border: #a4c795;

// Terracotta orange/red: highlights, alerts & active kitchen states (Spanish clay cookware)
$terracotta: #c85a32;
$terracotta-hover: #b34b25;
$terracotta-light: #fdf2ee;
$terracotta-border: #e8a58e;

// Warm cream/beige: background surfaces (flour, whitewashed walls, paper)
$warm-cream: #fbf6ee;
$warm-beige: #f5ebd0;
$warm-surface: #faf3e8;
$warm-border: #e6d7c3;

// Dark brown/wood: text, headers & grounding structural elements
$dark-brown: #2c1a14;
$wood-medium: #6b4226;
$wood-muted: #8c6b4a;
$wood-light: #f1e4d1;

// === KITCHEN AREA WORKSTATION COLOR SYSTEM ===
// Pantry / Ingredient Storage
$pantry-bg: #f5ebdc;
$pantry-border: #e2d2bd;
$pantry-accent: #8c6b4a;

// Washing Area (Sink) - Water & cleanliness with natural tones
$washing-bg: #ebf5f8;
$washing-border: #c5e2eb;
$washing-accent: #2b7890;
$washing-text: #1d5466;

// Cutting Area (Board) - Warm wood & neutral preparation space
$cutting-bg: #f8f1e5;
$cutting-border: #e7d7c1;
$cutting-accent: #8b5a2b;
$cutting-text: #4e3217;

// Mixing / Preparation Area (Bowl) - Cream/yellow transformation & creativity
$mixing-bg: #fff8eb;
$mixing-border: #f5e2b8;
$mixing-accent: #d49b2a;
$mixing-text: #6e4e0c;

// Cooking Area (Pan) - Orange/red heat, fire & activity
$cooking-bg: #fdf2ee;
$cooking-border: #f5cbbf;
$cooking-accent: #c85a32;
$cooking-text: #732a10;

// Serving Area (Plate) - Green/terracotta final presentation stage
$serving-bg: #f3f8f2;
$serving-border: #cde0c8;
$serving-accent: #5b8a46;
$serving-text: #2d4c20;

// === INGREDIENT STATE PALETTE ===
// Raw: natural, muted earthy colors
$state-raw-bg: #faf6f0;
$state-raw-border: #d8ccc0;
$state-raw-text: #6e5f53;

// Prepared: brighter, clean preparation teal/emerald
$state-prep-bg: #ebf7f5;
$state-prep-border: #a8e0d6;
$state-prep-text: #206157;

// Cooking: warmer orange/red active heat
$state-cook-bg: #fff2ee;
$state-cook-border: #f8beb0;
$state-cook-text: #a83a14;

// Finished Food: golden, satisfying cooked food yellow/gold
$state-finished-bg: #fff8e7;
$state-finished-border: #e8c872;
$state-finished-text: #8c5a0d;

// === SHADOWS & ELEVATIONS ===
$shadow-ceramic: 0 4px 14px rgba(44, 26, 20, 0.07);
$shadow-ceramic-hover: 0 8px 22px rgba(44, 26, 20, 0.12);
$shadow-floating: 0 12px 28px rgba(44, 26, 20, 0.18);

// === TYPOGRAPHY & RADII ===
$font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
$font-mono: ui-monospace, SFMono-Regular, Consolas, monospace;

$radius-sm: 8px;
$radius-md: 12px;
$radius-lg: 16px;
$radius-xl: 24px;
`````

## File: src/systems/recipeRunner/types.ts
`````typescript
/**
 * FILE: src/systems/recipeRunner/types.ts
 *
 * PURPOSE:
 * Type definitions and execution context contract for RecipeRunner and its step handlers.
 */

import type { Recipe } from '../../types/Recipe';
import type { Entity } from '../../types/world';

export interface RecipeContextData {
  recipeId: string;
  /**
   * Maps key/alias/ingredient name (e.g. 'potatoes', 'egg', 'mixture') to a specific stable Entity ID.
   */
  bindings: Record<string, string>;
}

export interface RecipeRunnerOptions {
  mascotId?: string;
  defaultSourceId?: string;
  defaultTargetId?: string;
  delayMs?: number;
}

export interface RecipeRunnerContext {
  mascotId: string;
  defaultSourceId: string;
  defaultTargetId: string;
  delayMs: number;
  currentRecipe?: Recipe;
  recipeContext: RecipeContextData;

  wait(ms?: number): Promise<void>;

  /**
   * Binds initial recipe ingredients to entity IDs in the world state.
   */
  bindRecipeContext(recipe: Recipe): void;

  /**
   * Retrieves the bound Entity ID for a target or key from RecipeContext.
   */
  getBoundEntityId(targetOrKey?: string): string | undefined;

  /**
   * Validates that an entity exists and is not consumed. Throws descriptive error on failure.
   */
  validateEntity(entityId: string, stepAction?: string): Entity;

  /**
   * Ensures specified bound entity is in target workspace container or held by mascot.
   */
  ensureEntityInWorkspace(
    entityId: string,
    targetContainerId?: string
  ): Promise<string>;

  /**
   * Updates bindings if an entity ID changed (e.g. copied from immutable storage).
   */
  updateBindingIfCopied(oldEntityId: string, newEntityId: string, specificKey?: string): void;

  resolveIngredientId(targetOrKey?: string): string | undefined;
  ensureIngredientInWorkspace(
    ingredientCatalogId: string,
    targetContainerId?: string
  ): Promise<string | undefined>;
}
`````

## File: src/systems/recipeTranslator.test.ts
`````typescript
import { describe, it, expect } from 'vitest';
import {
  translateHumanActionsToMascotActions,
  translateHumanActionsToRecipe,
} from './recipeTranslator';
import type { RecordedAction } from '../types/recording';

describe('recipeTranslator system', () => {
  it('translates human MOVE_ENTITY into interleaved mascot move, grab, move, drop, and move_entity actions', () => {
    const humanActions: RecordedAction[] = [
      {
        type: 'MOVE_ENTITY',
        payload: { entityId: 'patata_1', targetContainerId: 'board', sourceContainerId: 'despensa' },
        timestampMs: 1000,
      },
    ];

    const translated = translateHumanActionsToMascotActions(humanActions);

    expect(translated).toHaveLength(5);
    expect(translated[0].type).toBe('MASCOT_MOVE');
    expect(translated[0].payload.targetContainerId).toBe('despensa');

    expect(translated[1].type).toBe('MASCOT_GRAB');
    expect(translated[1].payload.entityId).toBe('patata_1');

    expect(translated[2].type).toBe('MASCOT_MOVE');
    expect(translated[2].payload.targetContainerId).toBe('board');

    expect(translated[3].type).toBe('MASCOT_DROP');
    expect(translated[3].payload.targetContainerId).toBe('board');

    expect(translated[4].type).toBe('MOVE_ENTITY');
    expect(translated[4].payload.entityId).toBe('patata_1');
  });

  it('translates TOGGLE_BURNER and PREPARE_INGREDIENT with mascot move focus', () => {
    const humanActions: RecordedAction[] = [
      {
        type: 'TOGGLE_BURNER',
        payload: { containerId: 'burner1' },
        timestampMs: 1000,
      },
      {
        type: 'PREPARE_INGREDIENT',
        payload: { entityId: 'cebolla_1', preparation: 'sliced' },
        timestampMs: 1300,
      },
    ];

    const translated = translateHumanActionsToMascotActions(humanActions);

    expect(translated[0].type).toBe('MASCOT_MOVE');
    expect(translated[0].payload.targetContainerId).toBe('burner1');
    expect(translated[1].type).toBe('TOGGLE_BURNER');

    expect(translated[2].type).toBe('MASCOT_MOVE');
    expect(translated[3].type).toBe('PREPARE_INGREDIENT');
  });

  it('translates human action sequence into a declarative Recipe object', () => {
    const humanActions: RecordedAction[] = [
      {
        type: 'MOVE_ENTITY',
        payload: { entityId: 'patata_1', targetContainerId: 'board', sourceContainerId: 'despensa' },
        timestampMs: 1000,
      },
      {
        type: 'PREPARE_INGREDIENT',
        payload: { entityId: 'patata_1', preparation: 'sliced' },
        timestampMs: 1300,
      },
    ];

    const recipe = translateHumanActionsToRecipe(humanActions, { recipeName: 'Test Tortilla' });

    expect(recipe.name).toBe('Test Tortilla');
    expect(recipe.requirements).toHaveProperty('patata');
    expect(recipe.steps.length).toBeGreaterThan(2);

    const moveStep = recipe.steps.find((s) => s.action === 'move');
    expect(moveStep).toBeDefined();
    if (moveStep && moveStep.action === 'move') {
      expect(moveStep.ingredient).toBe('patata');
      expect(moveStep.target).toBe('board');
    }

    const prepStep = recipe.steps.find((s) => s.action === 'prepare');
    expect(prepStep).toBeDefined();
    if (prepStep && prepStep.action === 'prepare') {
      expect(prepStep.preparation).toBe('sliced');
    }
  });
});
`````

## File: src/systems/recipeTranslator.ts
`````typescript
/**
 * FILE: recipeTranslator.ts
 *
 * PURPOSE:
 * Translator system converting human-recorded world actions into mascot-guided recipes
 * and executable mascot action sequences.
 *
 * RESPONSIBILITY:
 * - Infers source/target containers and entity locations for human actions.
 * - Injects explicit Mascot focus, grab, move, and drop actions for raw human interactions.
 * - Generates clean, declarative Recipe definitions (with requirements & steps) compatible with RecipeRunner.
 */

import type { RecordedAction } from '../types/recording';
import type { Recipe } from '../types/Recipe';
import type { RecipeStep } from '../types/RecipeStep';
import type { WorldAction } from '../types/actions';

export interface TranslatorOptions {
  recipeName?: string;
  recipeId?: string;
  mascotId?: string;
  defaultSourceContainer?: string;
}

/**
 * Utility to extract clean entity name or catalog ID from an entityId.
 */
function cleanEntityName(entityId?: string): string {
  if (!entityId) return 'item';
  return entityId
    .replace(/_\d+$/, '')
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .toLowerCase();
}

/**
 * Translates human-recorded actions into an expanded mascot-guided action sequence
 * where mascot focus, grab, move, and drop actions are explicitly interleaved.
 */
export function translateHumanActionsToMascotActions(
  actions: (RecordedAction | WorldAction)[],
  options: TranslatorOptions = {}
): RecordedAction[] {
  const mascotId = options.mascotId || 'chef';
  const defaultSource = options.defaultSourceContainer || 'despensa';

  // Track entity locations in simulated containers
  const entityLocations: Record<string, string> = {};
  const translated: RecordedAction[] = [];

  let nowMs = Date.now();

  const addAction = (type: string, payload: Record<string, unknown>) => {
    translated.push({
      type,
      payload,
      timestampMs: nowMs,
    });
    nowMs += 300;
  };

  for (const rawAct of actions) {
    const act = rawAct as RecordedAction;
    const { type, payload = {} } = act;

    switch (type) {
      case 'MOVE_ENTITY': {
        const entityId = (payload.entityId as string) || '';
        const targetContainerId = (payload.targetContainerId as string) || 'board';
        const sourceContainerId =
          (payload.sourceContainerId as string) || entityLocations[entityId] || defaultSource;

        // 1. Mascot moves to source container
        addAction('MASCOT_MOVE', { mascotId, targetContainerId: sourceContainerId });

        // 2. Mascot grabs ingredient
        addAction('MASCOT_GRAB', { mascotId, entityId, sourceContainerId });

        // 3. Mascot moves to target container
        addAction('MASCOT_MOVE', { mascotId, targetContainerId });

        // 4. Mascot drops ingredient
        addAction('MASCOT_DROP', { mascotId, targetContainerId });

        // 5. Actual entity movement
        addAction('MOVE_ENTITY', { entityId, targetContainerId, sourceContainerId });

        // Update entity location
        if (entityId) {
          entityLocations[entityId] = targetContainerId;
        }
        break;
      }

      case 'ADD_ENTITY': {
        const entity = payload.entity as { id?: string; name?: string } | undefined;
        const entityId = entity?.id || '';
        const containerId = (payload.containerId as string) || defaultSource;

        addAction('MASCOT_MOVE', { mascotId, targetContainerId: containerId });
        addAction('ADD_ENTITY', payload);

        if (entityId) {
          entityLocations[entityId] = containerId;
        }
        break;
      }

      case 'REMOVE_ENTITY': {
        const entityId = (payload.entityId as string) || '';
        const currentLoc = entityLocations[entityId] || defaultSource;

        addAction('MASCOT_MOVE', { mascotId, targetContainerId: currentLoc });
        addAction('REMOVE_ENTITY', payload);

        delete entityLocations[entityId];
        break;
      }

      case 'TOGGLE_BURNER': {
        const containerId = (payload.containerId as string) || 'burner1';
        addAction('MASCOT_MOVE', { mascotId, targetContainerId: containerId });
        addAction('TOGGLE_BURNER', payload);
        break;
      }

      case 'PREPARE_INGREDIENT': {
        const entityId = (payload.entityId as string) || '';
        const currentLoc = entityLocations[entityId] || 'board';

        addAction('MASCOT_MOVE', { mascotId, targetContainerId: currentLoc });
        addAction('PREPARE_INGREDIENT', payload);
        break;
      }

      case 'COOK_INGREDIENT': {
        const entityId = (payload.entityId as string) || '';
        const currentLoc = entityLocations[entityId] || 'pan';

        addAction('MASCOT_MOVE', { mascotId, targetContainerId: currentLoc });
        addAction('COOK_INGREDIENT', payload);
        break;
      }

      case 'MASCOT_FLIP': {
        addAction('MASCOT_FLIP', { mascotId });
        break;
      }

      case 'RESET_WORLD': {
        addAction('RESET_WORLD', {});
        addAction('MASCOT_CLEAR_GAZE', { mascotId });
        // Reset entity locations map
        for (const k of Object.keys(entityLocations)) {
          delete entityLocations[k];
        }
        break;
      }

      default: {
        // Pass through any existing mascot actions or custom actions
        addAction(type, payload);
        break;
      }
    }
  }

  return translated;
}

/**
 * Translates human-recorded world actions into a declarative Recipe object
 * that can be saved as a recipe file or executed directly via RecipeRunner.
 */
export function translateHumanActionsToRecipe(
  actions: (RecordedAction | WorldAction)[],
  options: TranslatorOptions = {}
): Recipe {
  const recipeId = options.recipeId || `translated-recipe-${Date.now()}`;
  const name = options.recipeName || 'Recorded Kitchen Recipe';

  const requirementsMap: Record<string, { entityId: string; amount: number; unit: string; name: string }> = {};
  const steps: RecipeStep[] = [];

  const entityLocations: Record<string, string> = {};

  steps.push({
    action: 'speak',
    message: `Starting ${name}`,
  });

  for (const rawAct of actions) {
    const act = rawAct as RecordedAction;
    const { type, payload = {} } = act;

    switch (type) {
      case 'MOVE_ENTITY': {
        const entityId = (payload.entityId as string) || '';
        const target = (payload.targetContainerId as string) || 'board';
        const source = (payload.sourceContainerId as string) || entityLocations[entityId] || 'despensa';

        const cleanName = cleanEntityName(entityId);
        if (cleanName && !requirementsMap[cleanName]) {
          requirementsMap[cleanName] = {
            entityId: cleanName,
            amount: 1,
            unit: 'unidad',
            name: cleanName.charAt(0).toUpperCase() + cleanName.slice(1),
          };
        }

        steps.push({
          action: 'move',
          ingredient: cleanName || entityId,
          source,
          target,
        });

        if (entityId) {
          entityLocations[entityId] = target;
        }
        break;
      }

      case 'PREPARE_INGREDIENT': {
        const entityId = (payload.entityId as string) || '';
        const preparation = (payload.preparation as string) || 'sliced';
        const cleanName = cleanEntityName(entityId);
        const containerId = entityLocations[entityId] || 'board';

        steps.push({
          action: 'prepare',
          ingredient: cleanName || entityId,
          preparation,
          containerId,
        });
        break;
      }

      case 'COOK_INGREDIENT': {
        const entityId = (payload.entityId as string) || '';
        const cooking = (payload.cooking as string) || 'fried';
        const cleanName = cleanEntityName(entityId);
        const containerId = entityLocations[entityId] || 'pan';

        steps.push({
          action: 'cook',
          ingredient: cleanName || entityId,
          method: cooking,
          containerId,
        });
        break;
      }

      case 'TOGGLE_BURNER': {
        const containerId = (payload.containerId as string) || 'burner1';
        steps.push({
          action: 'instruction',
          text: `Toggle heat on ${containerId}`,
        });
        break;
      }

      case 'MASCOT_FLIP': {
        steps.push({
          action: 'flip',
          target: 'pan',
          instruction: 'Flip tortilla in pan',
        });
        break;
      }

      case 'USE_INGREDIENT': {
        const entityId = (payload.entityId as string) || '';
        const cleanName = cleanEntityName(entityId);
        steps.push({
          action: 'mix',
          inputs: [cleanName || entityId],
          targetContainerId: 'bowl',
        });
        break;
      }

      default:
        // Ignore unhandled non-recipe world state metadata actions
        break;
    }
  }

  steps.push({
    action: 'celebrate',
  });

  return {
    id: recipeId,
    name,
    requirements: requirementsMap,
    steps,
  };
}
`````

## File: src/types/workstations.ts
`````typescript
/**
 * FILE: workstations.ts
 *
 * PURPOSE:
 * Defines workstation structures and capabilities.
 *
 * RESPONSIBILITY:
 * - Represents workstations as functional kitchen areas where actions take place.
 * - Maps cooking/preparation actions to workstations and required tools.
 */

export type WorkstationId =
  | 'pantry'
  | 'washing_station'
  | 'cutting_station'
  | 'preparation_station'
  | 'cooking_station'
  | 'serving_station';

export type Workstation = {
  id: WorkstationId;
  name: string;
  purpose: string;
  supportedActions: string[];
  defaultContainerId: string;
  requiredTools?: string[];
  optionalTools?: string[];
  isOn?: boolean;
};
`````

## File: src/main.tsx
`````typescript
/**
 * FILE: main.tsx
 *
 * PURPOSE:
 * React application bootstrap file.
 *
 * RESPONSIBILITY:
 * - Creates the React root.
 * - Loads global styles.
 * - Starts the application.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
`````

## File: docs/entities.md
`````markdown
# Entities

## Overview

Tortilla World is built around a world model composed of **entities** and **containers**.

Everything that exists in the world is an entity:

* ingredients
* tools
* containers
* future objects such as plates, machines, characters, or decorations

Entities do not decide where they can exist.
Containers own entities and enforce the rules of what they can contain.

The world state is therefore based on:

```
Entity
   |
   | owned by
   v
Container
```

---

# Entity

An entity is a unique object inside the world.

Example:

```ts
{
  id: "potato",
  type: "ingredient"
}
```

or:

```ts
{
  id: "pan-small",
  type: "tool"
}
```

Entities have identity.

Moving an entity does not create a new entity.
A move changes the ownership relationship between containers.

---

# Entity Types

## Ingredient

Ingredients are cooking resources.

Examples:

* potato
* egg
* onion
* oil

Ingredients have special rules:

* an ingredient can only appear once inside the same container
* ingredients can move between containers
* ingredients can be consumed by actions
* ingredients can be transformed by cooking systems

Example:

```ts
{
  id: "potato",
  type: "ingredient",
  name: "Potato",
  icon: "🥔"
}
```

---

## Tool

Tools are reusable objects used by actions at workstations.

Examples:

* knife (`knife`)
* peeler (`peeler`)
* whisk (`whisk`)
* fork (`fork`)
* spatula (`spatula`)
* grater (`grater`)
* mandoline (`mandoline`)
* spoon (`spoon`)

Tools have different rules from ingredients:

* duplicate tools are allowed
* tools can exist multiple times inside a container
* tools are normally not consumed

Example:

```ts
{
  id: "pan-001",
  type: "tool",
  name: "Pan",
  icon: "🍳"
}
```

A kitchen can contain:

```
Kitchen
 ├── pan-001
 └── pan-002
```

Both are valid.

---

# Container

A container is an entity that can own other entities.

Examples:

* kitchen
* pantry
* recipe
* pan
* plate
* fridge

A container is not a simple programming list.

It is a world object with:

* ordered contents
* ownership
* validation rules
* capabilities

Example:

```ts
{
  id: "kitchen",
  type: "container",
  children:[
    "potato",
    "egg",
    "pan-001"
  ]
}
```

---

# Container Rules

Containers define what they allow.

Rules are not stored in the entity itself.

The same entity type can behave differently depending on the container.

Example:

A potato can exist in:

```
Kitchen
Recipe
Pan
Plate
```

but each container decides what happens.

---

## Content ordering

Container contents are ordered.

The order matters for:

* visual rendering
* drag and drop
* animations
* UI positioning

Therefore container contents use an ordered collection.

Example:

```ts
children:[
  "potato",
  "egg",
  "onion"
]
```

---

# Ingredient uniqueness

A container cannot contain two identical ingredients.

Valid:

```
Recipe
 ├── potato
 ├── onion
 └── egg
```

Invalid:

```
Recipe
 ├── potato
 ├── potato
```

This rule applies only to ingredients.

---

# Duplicate entities

Duplicate rules depend on entity type.

Example:

Kitchen:

Valid:

```
Kitchen
 ├── potato
 ├── onion
 ├── pan-001
 └── pan-002
```

Invalid:

```
Kitchen
 ├── potato
 └── potato
```

---

# Ownership

Every movable entity has an owner.

Example:

Initial state:

```
Kitchen
 ├── potato
 ├── egg


Pan
 └── oil
```

After moving potato:

```
Kitchen
 └── egg


Pan
 ├── oil
 └── potato
```

The potato entity did not change.

Only the ownership relation changed.

---

# Static and Dynamic Containers

Containers can have different ownership behaviour.

## Static Container

A static container represents predefined world content.

Examples:

* kitchen ingredients
* initial inventory
* environment objects

Characteristics:

* content is defined by the world
* removing an item does not necessarily delete it
* moving an item out can create a new reference/copy depending on rules

Example:

```
Kitchen
 ├── potato
 ├── onion
 └── egg
```

---

## Dynamic Container

A dynamic container represents changing ownership.

Examples:

* recipe
* pan
* plate
* trash

Characteristics:

* items can be added
* items can be removed
* items can be transferred

Example:

```
Recipe
 ├── potato
 └── egg
```

---

# Container Capabilities

Containers expose capabilities that systems can check.

Example:

```ts
{
  canAdd: true,
  canRemove: true,
  allowsDuplicateIngredients: false,
  acceptedTypes:[
    "ingredient",
    "tool"
  ]
}
```

Before performing an action, systems validate these capabilities.

---

# Relationships

The world is composed of relationships:

```
Kitchen
   owns
      Potato


Pan
   owns
      Oil
```

The Entity itself does not know:

* where it is
* what contains it
* what actions are possible

The world systems decide this.

---

# Future Extensions

This model allows adding:

## Characters

```
Tortilla
  owns
    Knife
```

## Machines

```
Oven
  owns
    Tray
```

## Recipes

```
Recipe
  owns
    Potato
    Egg
```

## Entity State (Preparation & Cooking)

Entities store mutable properties inside their `state` field without changing entity identity:

```ts
{
  id: "potato",
  type: "ingredient",
  name: "Potato",
  state: {
    preparation: "diced", // "whole" | "peeled" | "sliced" | "diced" | "minced"
    cooking: "fried"     // "raw" | "fried" | "boiled" | "burned"
  }
}
```

Preparation and cooking actions mutate this state via `PREPARE_INGREDIENT` and `COOK_INGREDIENT` actions without recreating entities.
`````

## File: docs/roadmap.md
`````markdown
# Tortilla World Roadmap

## Vision

Tortilla World is an interactive cooking simulation built around a living world model.

The goal is not only to create a recipe application, but to create a small simulated environment where:

* objects exist as entities
* containers define relationships
* actions modify the world
* characters and AI can interact with the environment

The long-term vision is a "living kitchen" where the user can interact with objects naturally and where autonomous agents can understand and manipulate the world.

---

# Current Status

## Phase: World Foundation

Status:

🟡 In development

Current focus:

* stable world model
* entity system
* container system
* drag and drop interactions
* predictable state management

Completed foundations:

✅ React + TypeScript application
✅ Zustand world store
✅ Entity-based architecture
✅ Container concept
✅ Drag and drop foundation
✅ Ingredient data model
✅ Documentation structure

---

# Roadmap Overview

```text
Foundation
    |
    v
World Interaction
    |
    v
Cooking Simulation
    |
    v
Living Kitchen
    |
    v
AI Assisted World
```

---

# Phase 1 — World Foundation

## Goal

Create a reliable simulation core.

## Features

### Entity System

Implement:

* ingredients
* tools
* containers
* entity identity

Example:

```text
Potato
Knife
Pan
Kitchen
```

---

### Container System

Implement:

* ownership
* ordered contents
* container rules
* validation

Examples:

```text
Kitchen
Recipe
Pan
Plate
```

---

### Movement System

Implement:

* moving entities
* validating moves
* transfer rules
* ownership changes

Example:

```text
Kitchen

 potato

    |
    v

Pan

 potato
```

---

# Phase 2 — Interaction Layer

## Goal

Make the world feel alive.

## Features

### Improved Drag and Drop

Support:

* visual feedback
* invalid drop states
* animations
* multi-container interactions

---

### Entity Animations

Entities should:

* move naturally
* react to interactions
* have visual states

Examples:

* potato jumps into pan
* knife moves to cutting board
* ingredients combine

---

### Action System

Introduce:

```ts
Action
{
 type
 payload
 timestamp
}
```

Benefits:

* replay
* debugging
* AI compatibility

Status:

✅ Traceability — every `dispatch` call is logged (`devtools` +
`src/store/middleware/actionLog.ts`) and validated through
`engine/containerRules.ts`.
✅ Replay — headless `ActionPlayer` utility (`src/systems/actionPlayer.ts`) and UI `ActionReplayer` component (`src/components/Controls/ActionReplayer.tsx`) allow loading JSON logs, resetting `worldStore`, and stepping through action sequences sequentially with configurable step delays.

---

# Phase 3 — Cooking Simulation

## Goal

Create actual cooking behaviour.

## Features

## Recipe System

Support:

* recipes
* ingredient requirements
* preparation steps

Example:

```text
Potato
Egg
Onion

    +
    
Cooking

    =

Tortilla
```

---

## Cooking States

Entities gain states:

Example:

```text
Potato

raw
 |
 v
cut
 |
 v
fried
```

---

## Tools Become Functional

Examples:

Knife:

```text
ingredient
      |
      v
cut ingredient
```

Pan:

```text
ingredient
      |
      v
cook ingredient
```

---

# Phase 4 — Living Kitchen

## Goal

Create a world that behaves independently.

## Features

### Characters

Introduce:

* player character
* helpers
* customers
* NPCs

---

### Time System

Add:

* cooking duration
* events
* schedules

Example:

```text
Egg on pan

0s
 |
30s
 |
Cooked
```

---

### Environment

Add:

* fridge
* cupboards
* tables
* oven
* restaurant area

---

# Phase 5 — AI Kitchen Assistant

## Goal

Allow AI agents to understand and interact with the world.

The AI does not directly change state.

The AI creates actions.

Example:

```json
{
"type":"MOVE_ENTITY",
"entity":"egg",
"target":"pan"
}
```

The world validates and executes the action.

---

## AI Features

Possible future capabilities:

* recipe planning
* cooking assistance
* autonomous helpers
* explanations
* suggestions
* learning user preferences

---

# Phase 6 — Multiplayer / Shared World (Future)

Possible future direction:

* shared kitchens
* collaborative cooking
* synchronized worlds
* multiple AI agents

---

# Development Principles

## Keep the World Model Independent

The simulation should not depend on React.

---

## Prefer Systems Over Component Logic

Components display.

Systems decide.

---

## Preserve Entity Identity

Objects are moved, not recreated.

---

## Document Decisions

Important architecture changes should be recorded in:

```text
docs/decisions.md
```

---

# Current Priority

The immediate goal is:

> Build a stable interactive kitchen world where every object follows predictable rules.

Everything else depends on this foundation.
`````

## File: src/components/Controls/ActionReplayer.test.tsx
`````typescript
/**
 * FILE: ActionReplayer.test.tsx
 *
 * PURPOSE:
 * Unit tests for ActionReplayer component logic.
 */

import { describe, it, expect } from 'vitest';
import { actionPlayer } from '../../systems/actionPlayer';
import { worldStore } from '../../store/worldStore';
import type { WorldAction } from '../../types/actions';

describe('ActionReplayer component logic', () => {
  it('integrates with ActionPlayer to replay uploaded actions', async () => {
    worldStore.getState().resetWorld();

    const actions: WorldAction[] = [
      {
        type: 'TOGGLE_BURNER',
        payload: { containerId: 'burner1' },
      },
      {
        type: 'ADD_ENTITY',
        payload: {
          entity: {
            id: 'potato_test_1',
            name: 'Potato',
            type: 'ingredient',
          },
          containerId: 'burner1',
        },
      },
    ];

    await actionPlayer.playLog(actions, { delayMs: 10 });

    const store = worldStore.getState();
    expect(store.containers.burner1.isOn).toBe(true);
    expect(store.containers.burner1.entityIds).toContain('potato_test_1');
  });

  it('syncs uploaded actions with setRecordedActions in worldStore', () => {
    worldStore.getState().resetWorld();

    const sampleActions = [
      {
        type: 'MOVE_ENTITY',
        payload: { entityId: 'patata', targetContainerId: 'board' },
        timestampMs: Date.now(),
      },
    ];

    worldStore.getState().setRecordedActions(sampleActions);

    expect(worldStore.getState().recordedActions).toHaveLength(1);
    expect(worldStore.getState().recordedActions[0].type).toBe('MOVE_ENTITY');
  });
});
`````

## File: src/components/Recipe/RequirementView.tsx
`````typescript
/**
 * FILE: RequirementView.tsx
 *
 * PURPOSE:
 * Displays a single required entity inside a recipe.
 *
 * RESPONSIBILITY:
 * - Uses EntityView in readOnly mode to visualize required entity.
 * - Always uses fresh catalog data to keep Required Materials immutable.
 *
 * NOTE: Required Materials should show the original, uncooked state of ingredients.
 * Even if an ingredient gets cooked (e.g., oil heated), the Required Materials list
 * should always display the same original names. We achieve this by always using
 * fresh catalog data instead of world state (which gets mutated during cooking).
 * - Renders requirement quantity and unit.
 */

import React, { useEffect } from 'react';
import type { Requirement } from '../../types/Requirement';
import type { Entity } from '../../types/world';
import { worldStore } from '../../store/worldStore';
import { ingredients } from '../../data/catalog/ingredients';
import { catalogTools as tools } from '../../data/catalog/tools';
import { EntityView } from '../World/EntityView';

interface RequirementViewProps {
  requirement: Requirement;
}

export const RequirementView: React.FC<RequirementViewProps> = ({ requirement }) => {
  // const entities = useStore(worldStore, (state) => state.entities);
  const catalogIng = ingredients.find((i) => i.id === requirement.entityId);
  const catalogTool = tools.find((t: { id: string }) => t.id === requirement.entityId);

  /**
   * CHANGE: Always use fresh catalog data for Required Materials.
   *
   * WHY: This ensures Required Materials remain visually immutable throughout the recipe,
   * regardless of any state changes (cooking, consumed, etc.) in the world state.
   *
   * EXAMPLE:
   *   - Catalog says: { icon: '🫒', name: 'Olive Oil' }
   *   - After heating: world state has { cooking: 'heat' } but display stays "Olive Oil"
   *   - Not: "Heat Olive Oil" (which would be wrong)
   *
   * We intentionally ignore realEntity to keep the UI clean and consistent.
   */
  const entity: Entity = {
    id: requirement.entityId,
    name: requirement.name || catalogIng?.name || catalogTool?.name || requirement.entityId,
    type: (catalogTool ? 'tool' : 'ingredient') as 'tool' | 'ingredient',
    icon: catalogIng?.icon || catalogTool?.icon,
    ingredientId: requirement.entityId,
    state: {}, // Always fresh, never mutated
  };

  useEffect(() => {
    const store = worldStore.getState();
    const existing = store.entities[requirement.entityId];
    if (!existing) {
      // If entity doesn't exist in world state yet, create it in pantry
      store.dispatch({
        type: 'ADD_ENTITY',
        payload: {
          entity: {
            id: requirement.entityId,
            name: requirement.name || catalogIng?.name || catalogTool?.name || requirement.entityId,
            type: (catalogTool ? 'tool' : 'ingredient') as 'tool' | 'ingredient',
            icon: catalogIng?.icon || catalogTool?.icon,
            ingredientId: requirement.entityId,
            state: {},
          },
          containerId: 'despensa',
        },
      });
    } else {
      // If entity exists, ensure it's in the pantry (source container)
      const despensa = store.containers['despensa'];
      if (despensa && !despensa.entityIds.includes(requirement.entityId)) {
        store.dispatch({
          type: 'MOVE_ENTITY',
          payload: { entityId: requirement.entityId, targetContainerId: 'despensa' },
        });
      }
    }
  }, [requirement.entityId, catalogIng?.name, catalogIng?.icon, catalogTool?.name, catalogTool?.icon, catalogTool, requirement.name]);

  return (
    <li className="requirement-view">
      <EntityView entity={entity} containerId="despensa" readOnly={false} />
      <span className="requirement-view__amount">
        {requirement.amount} {requirement.unit}
      </span>
    </li>
  );
};
`````

## File: src/data/catalog/ingredients.ts
`````typescript
/**
 * FILE: ingredients.ts
 *
 * PURPOSE:
 * Catalog of available ingredient definitions.
 *
 * RESPONSIBILITY:
 * - Provides master list of ingredient metadata (names, icons, ids).
 */

import type { Ingredient } from "../../types/Ingredient";


export const ingredients: Ingredient[] = [

  {
    id: "potato",
    icon: "🥔",
    name: "Potatoes",
  },

  {
    id: "egg",
    icon: "🥚",
    name: "Eggs",
  },

  {
    id: "oil",
    icon: "🫒",
    name: "Olive Oil",
  },

  {
    id: "onion",
    icon: "🧅",
    name: "Onion",
  },

  {
    id: "chorizo",
    icon: "🌭",
    name: "Chorizo",
  },

  {
    id: "salt",
    icon: "🧂",
    name: "Salt",
  },

  {
    id: "pepper",
    icon: "🫑",
    name: "Bell Pepper",
  },

  {
    id: "garlic",
    icon: "🧄",
    name: "Garlic",
  },

  {
    id: "tomato",
    icon: "🍅",
    name: "Tomato",
  },

  {
    id: "cheese",
    icon: "🧀",
    name: "Cheese",
  },

  {
    id: "bread",
    icon: "🍞",
    name: "Bread",
  },

  {
    id: "milk",
    icon: "🥛",
    name: "Milk",
  },

  {
    id: "butter",
    icon: "🧈",
    name: "Butter",
  },

  // --- Expanded Ingredients ---

  {
    id: "black_pepper",
    icon: "🌶️",
    name: "Black Pepper",
  },

  {
    id: "flour",
    icon: "🌾",
    name: "Flour",
  },

  {
    id: "sugar",
    icon: "🍚",
    name: "Sugar",
  },

  {
    id: "rice",
    icon: "🍚",
    name: "Rice",
  },

  {
    id: "chicken",
    icon: "🍗",
    name: "Chicken",
  },

  {
    id: "beef",
    icon: "🥩",
    name: "Beef",
  },

  {
    id: "mushroom",
    icon: "🍄",
    name: "Mushroom",
  },

  {
    id: "spinach",
    icon: "🥬",
    name: "Spinach",
  },

  {
    id: "lemon",
    icon: "🍋",
    name: "Lemon",
  },

];
`````

## File: src/store/slices/mascotSlice.ts
`````typescript
/**
 * FILE: mascotSlice.ts
 *
 * PURPOSE:
 * Zustand slice for mascot (Chef Tortilla) state actions.
 *
 * RESPONSIBILITY:
 * - Mutates mascot gaze, flip, grab, and drop states.
 */

import type { StateCreator } from 'zustand/vanilla';
import type { Entity } from '../../types/world';
import type { WorldStateStore } from '../types';
import { validateContainerRules } from '../../engine/containerRules';
import type { GazeTarget } from '../../systems/gaze';

export interface MascotSlice {
  mascotFlip: (mascotId?: string) => void;
  mascotMove: (targetContainerId: string, mascotId?: string) => void;
  mascotGrab: (entityId: string, sourceContainerId?: string, mascotId?: string) => void;
  mascotDrop: (targetContainerId: string, positionIndex?: number, mascotId?: string) => void;
  mascotClearGaze: (mascotId?: string) => void;
}

export const createMascotSlice: StateCreator<
  WorldStateStore,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  MascotSlice
> = (set, get) => ({
  mascotFlip: (mascotId = 'chef') => {
    set(
      (draft) => {
        const mascot = draft.entities[mascotId];
        if (!mascot) return;
        mascot.state = {
          ...mascot.state,
          state: 'flipping',
          isFlipping: true,
        };
      },
      false,
      'MASCOT_FLIP'
    );

    setTimeout(() => {
      set(
        (draft) => {
          const mascot = draft.entities[mascotId];
          if (!mascot || mascot.state?.state !== 'flipping') return;
          mascot.state = {
            ...mascot.state,
            state: 'idle',
            isFlipping: false,
          };
        },
        false,
        'RESET_MASCOT_FLIP'
      );
    }, 800);
  },

  mascotMove: (targetContainerId, mascotId = 'chef') => {
    set(
      (draft) => {
        const mascot = draft.entities[mascotId];
        if (!mascot) return;
        const gaze: GazeTarget = { type: 'entity', entityId: targetContainerId };
        mascot.state = {
          ...mascot.state,
          gazingAt: gaze,
          targetContainerId,
        };
      },
      false,
      'MASCOT_MOVE'
    );
  },

  mascotGrab: (entityId, sourceContainerId, mascotId = 'chef') => {
    const state = get();
    const mascot = state.entities[mascotId];
    if (!mascot) return;
    const grabbedEntity = state.entities[entityId];
    if (!grabbedEntity) return;

    const foundSource = sourceContainerId
      ? state.containers[sourceContainerId]
      : Object.values(state.containers).find((c) => c.entityIds.includes(entityId));

    set(
      (draft) => {
        const m = draft.entities[mascotId];
        if (!m) return;
        const grabGaze: GazeTarget = { type: 'entity', entityId };
        m.state = {
          ...m.state,
          holdingEntityId: entityId,
          sourceContainerId: foundSource?.id,
          gazingAt: grabGaze,
        };
      },
      false,
      'MASCOT_GRAB'
    );
  },

  mascotClearGaze: (mascotId = 'chef') => {
    set(
      (draft) => {
        const mascot = draft.entities[mascotId];
        if (!mascot) return;
        mascot.state = { ...mascot.state, gazingAt: null, targetContainerId: undefined };
      },
      false,
      'MASCOT_CLEAR_GAZE'
    );
  },

  mascotDrop: (targetContainerId, positionIndex, mascotId = 'chef') => {
    const state = get();
    const mascot = state.entities[mascotId];
    if (!mascot) return;

    const holdingEntityId = mascot.state?.holdingEntityId as string | undefined;

    if (!holdingEntityId) {
      set(
        (draft) => {
          const m = draft.entities[mascotId];
          if (m) {
            m.state = { ...m.state, gazingAt: { type: 'entity', entityId: targetContainerId } };
          }
        },
        false,
        'MASCOT_DROP'
      );
      return;
    }

    const entityToMove = state.entities[holdingEntityId];
    const targetContainer = state.containers[targetContainerId];
    if (!entityToMove || !targetContainer) return;

    const sourceContainerId = mascot.state?.sourceContainerId as string | undefined;
    const sourceContainer = sourceContainerId
      ? state.containers[sourceContainerId]
      : Object.values(state.containers).find((c) => c.entityIds.includes(holdingEntityId));

    const isSourceImmutable =
      sourceContainer?.rules?.isImmutable || sourceContainer?.rules?.consumesOnDrag === false;

    let finalEntityId = holdingEntityId;
    let copyEntity: Entity | undefined;

    if (sourceContainer && sourceContainer.id !== targetContainerId && isSourceImmutable) {
      const copyId = `${entityToMove.id}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      copyEntity = {
        ...entityToMove,
        id: copyId,
        ingredientId: entityToMove.ingredientId || entityToMove.id.split('_')[0],
      };

      const currentEntities = targetContainer.entityIds
        .map((id) => state.entities[id])
        .filter((e): e is Entity => Boolean(e));
      const result = validateContainerRules(targetContainer, copyEntity, currentEntities);
      if (!result.allowed) return;

      finalEntityId = copyId;
    } else {
      const currentEntities = targetContainer.entityIds
        .map((id) => state.entities[id])
        .filter((e): e is Entity => Boolean(e) && e.id !== holdingEntityId);
      const result = validateContainerRules(targetContainer, entityToMove, currentEntities);
      if (!result.allowed) return;
    }

    set(
      (draft) => {
        if (copyEntity) {
          draft.entities[copyEntity.id] = copyEntity;
        }

        if (sourceContainer && !isSourceImmutable) {
          draft.containers[sourceContainer.id].entityIds = draft.containers[
            sourceContainer.id
          ].entityIds.filter((id) => id !== holdingEntityId);
        }

        if (typeof positionIndex === 'number') {
          draft.containers[targetContainerId].entityIds.splice(positionIndex, 0, finalEntityId);
        } else {
          draft.containers[targetContainerId].entityIds.push(finalEntityId);
        }

        const m = draft.entities[mascotId];
        if (m) {
          m.state = {
            ...m.state,
            holdingEntityId: undefined,
            sourceContainerId: undefined,
            gazingAt: { type: 'entity', entityId: targetContainerId } satisfies GazeTarget,
          };
        }
      },
      false,
      'MASCOT_DROP'
    );
  },
});
`````

## File: src/store/slices/recordSlice.ts
`````typescript
/**
 * FILE: recordSlice.ts
 *
 * PURPOSE:
 * Zustand slice for recording user interactions into a serialized WorldState recipe.
 *
 * RESPONSIBILITY:
 * - Manages recording state (active/inactive, start time).
 * - Captures initial and final WorldState snapshots (entities + containers).
 * - Logs dispatched WorldActions with relative timestamps.
 * - Serializes recorded data into JSON blob with download URL generation.
 */

import type { StateCreator } from 'zustand/vanilla';
import type { WorldAction } from '../../types/world';
import type { RecordedAction, SerializedRecipeExport, SerializedWorldState } from '../../types/recording';
import type { WorldStateStore } from '../types';
import { ingredients } from '../../data/catalog/ingredients';
import { catalogTools } from '../../data/catalog/tools';

export interface UsedIngredientInfo {
  id: string;
  name: string;
  icon?: string;
}

export interface RecordSlice {
  isRecording: boolean;
  recordingStartTime: number | null;
  recordedActions: RecordedAction[];
  usedIngredients: UsedIngredientInfo[];
  initialRecordingState: SerializedWorldState | null;
  recordedDownloadUrl: string | null;
  recordedFilename: string | null;

  startRecording: () => void;
  stopRecording: () => void;
  recordAction: (action: WorldAction) => void;
  clearRecording: () => void;
  setRecordedActions: (actions: RecordedAction[]) => void;
}

export const createRecordSlice: StateCreator<
  WorldStateStore,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  RecordSlice
> = (set, get) => ({
  isRecording: false,
  recordingStartTime: null,
  recordedActions: [],
  usedIngredients: [],
  initialRecordingState: null,
  recordedDownloadUrl: null,
  recordedFilename: null,

  startRecording: () => {
    const prevUrl = get().recordedDownloadUrl;
    if (prevUrl) {
      URL.revokeObjectURL(prevUrl);
    }

    const { entities, containers } = get();

    set((state) => {
      state.isRecording = true;
      state.recordingStartTime = Date.now();
      state.recordedActions = [];
      state.usedIngredients = [];
      state.recordedDownloadUrl = null;
      state.recordedFilename = null;
      state.initialRecordingState = JSON.parse(
        JSON.stringify({
          entities,
          containers,
        })
      );
    });
  },

  recordAction: (action: WorldAction) => {
    const { isRecording, recordingStartTime } = get();
    if (!isRecording) return;

    const timestampMs = Date.now() - (recordingStartTime || Date.now());
    set((state) => {
      state.recordedActions.push({
        type: action.type,
        payload: JSON.parse(JSON.stringify(action.payload)),
        timestampMs,
      });

      // Track used ingredients / entities during recording
      const payload = action.payload || {};
      let rawEntityId: string | undefined;

      if (action.type === 'MOVE_ENTITY') {
        const target = (payload as { targetContainerId?: string }).targetContainerId;
        if (target && target !== 'despensa') {
          rawEntityId = (payload as { entityId?: string }).entityId;
        }
      } else if (action.type === 'ADD_ENTITY') {
        const target = (payload as { containerId?: string }).containerId;
        if (target && target !== 'despensa') {
          const ent = (payload as { entity?: { id?: string; ingredientId?: string } }).entity;
          rawEntityId = ent?.ingredientId || ent?.id;
        }
      } else if (['PREPARE_INGREDIENT', 'COOK_INGREDIENT', 'USE_INGREDIENT'].includes(action.type)) {
        rawEntityId = (payload as { entityId?: string }).entityId;
      }

      if (rawEntityId) {
        // Strip timestamp/unique suffix if present (e.g., "potato_1729384" -> "potato")
        const baseId = rawEntityId.split('_')[0] || rawEntityId;
        const catalogIng = ingredients.find((i) => i.id === baseId || i.id === rawEntityId);
        const catalogTool = catalogTools.find((t) => t.id === baseId || t.id === rawEntityId);

        const cleanName =
          catalogIng?.name ||
          catalogTool?.name ||
          baseId.charAt(0).toUpperCase() + baseId.slice(1).replace(/_/g, ' ');
        const icon = catalogIng?.icon || catalogTool?.icon || '📦';

        if (!state.usedIngredients.some((u) => u.id === baseId)) {
          state.usedIngredients.push({
            id: baseId,
            name: cleanName,
            icon,
          });
        }
      }
    });
  },

  stopRecording: () => {
    const { isRecording, recordingStartTime, recordedActions, usedIngredients, initialRecordingState, recordedDownloadUrl } = get();
    if (!isRecording) return;

    if (recordedDownloadUrl) {
      URL.revokeObjectURL(recordedDownloadUrl);
    }

    const { entities, containers } = get();
    const finalState = JSON.parse(
      JSON.stringify({
        entities,
        containers,
      })
    );

    const durationMs = Date.now() - (recordingStartTime || Date.now());
    const exportData: SerializedRecipeExport = {
      version: '1.0.0',
      title: 'Recorded Tortilla Recipe',
      recordedAt: new Date().toISOString(),
      durationMs,
      actionCount: recordedActions.length,
      usedIngredients,
      initialState: initialRecordingState || { entities: {}, containers: {} },
      finalState,
      actions: recordedActions,
    };

    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const downloadUrl = URL.createObjectURL(blob);
    const dateStr = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const filename = `tortilla-recorded-recipe-${dateStr}.json`;

    set((state) => {
      state.isRecording = false;
      state.recordedDownloadUrl = downloadUrl;
      state.recordedFilename = filename;
    });
  },

  clearRecording: () => {
    const prevUrl = get().recordedDownloadUrl;
    if (prevUrl) {
      URL.revokeObjectURL(prevUrl);
    }
    set((state) => {
      state.isRecording = false;
      state.recordingStartTime = null;
      state.recordedActions = [];
      state.usedIngredients = [];
      state.initialRecordingState = null;
      state.recordedDownloadUrl = null;
      state.recordedFilename = null;
    });
  },

  setRecordedActions: (actions: RecordedAction[]) => {
    const prevUrl = get().recordedDownloadUrl;
    if (prevUrl) {
      URL.revokeObjectURL(prevUrl);
    }
    set((state) => {
      state.recordedActions = actions;
      state.usedIngredients = [];
      state.recordedDownloadUrl = null;
      state.recordedFilename = null;
    });
  },
});
`````

## File: src/store/gazeStore.ts
`````typescript
/**
 * FILE: gazeStore.ts
 *
 * PURPOSE:
 * Stores mascot gaze/attention state.
 *
 * RESPONSIBILITY:
 * - Tracks what the mascot is looking at.
 * - Provides gaze information to UI components.
 */

import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { GazeTarget } from '../systems/gaze';
import { gazeEntityId } from '../systems/gaze';

interface GazeState {
  /**
   * Whatever the mascot should be looking at right now.
   * null → fall back to idle eye position.
   */
  target: GazeTarget;
  setTarget: (target: GazeTarget) => void;
  clearTarget: () => void;
}

/**
 * Standalone gaze store — separate from worldStore so UI components
 * (TortillaSvg, eye-tracking overlays) can subscribe to gaze changes
 * with fine-grained selectors and zero coupling to world state shape.
 *
 * Uses subscribeWithSelector middleware so callers can subscribe to
 * slices of gaze state without triggering on unrelated updates.
 *
 * @example
 *   // React component: only re-renders when entityId changes
 *   const entityId = useGazeStore((s) => gazeEntityId(s.target));
 *
 *   // Outside React: subscribe to entity-gaze changes only
 *   useGazeStore.subscribe(
 *     (s) => gazeEntityId(s.target),
 *     (id) => console.log('now gazing at entity', id)
 *   );
 */
export const useGazeStore = create<GazeState>()(
  subscribeWithSelector((set) => ({
    target: null,
    setTarget: (target) => set({ target }),
    clearTarget: () => set({ target: null }),
  }))
);

// Re-export the narrow helper so consumers don't need a separate import.
export { gazeEntityId };
`````

## File: src/systems/recipeRunner/handlers/cookHandlers.test.ts
`````typescript
/**
 * FILE: src/systems/recipeRunner/handlers/cookHandlers.test.ts
 *
 * PURPOSE:
 * Unit tests for cooking step handlers and oil heating behavior.
 *
 * RESPONSIBILITY:
 * - Verify oil heating doesn't mark oil as consumed
 * - Verify oil stays in the burner1/container after heating
 * - Verify oil IS consumed when it's used as a cooking medium
 * - Distinguish between oil as target vs oil as cooking medium
 * - Test garlic cooking and other ingredients
 * - Verify Required Materials immutability concept
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { worldStore } from '../../../store/worldStore';
import { handleCookStep, handleFlipStep } from './cookHandlers';
import type { RecipeStep } from '../../../types/RecipeStep';
import type { RecipeRunnerContext } from '../types';

type CookStep = Extract<RecipeStep, { action: 'cook' }>;
type FlipStep = Extract<RecipeStep, { action: 'flip' }>;

/**
 * Helper: Create mock RecipeRunnerContext
 */
function createMockContext(overrides?: Partial<RecipeRunnerContext>): RecipeRunnerContext {
  return {
    mascotId: 'chef_1',
    defaultSourceId: 'burner1try',
    defaultTargetId: 'board',
    delayMs: 0, // No delay in tests
    recipeContext: {
      recipeId: 'test_recipe',
      bindings: {},
    },
    getBoundEntityId: vi.fn((key: string) => {
      const mapping: Record<string, string> = {
        oil: 'oil_1',
        potatoes: 'potatoes_1',
        garlic: 'garlic_1',
        mixture: 'mixture_1',
      };
      return mapping[key] || null;
    }),
    validateEntity: vi.fn(),
    updateBindingIfCopied: vi.fn(),
    wait: vi.fn(async () => {}),
    bindStepsContext: vi.fn(),
    ensureEntityInWorkspace: vi.fn(async (id: string) => id),
    ensureIngredientInWorkspace: vi.fn(async (id: string) => id),
    resolveIngredientId: vi.fn((key: string) => key),
    currentRecipe: undefined,
    bindRecipeContext: vi.fn(),
    runRecipe: vi.fn(),
    runSteps: vi.fn(),
    executeStep: vi.fn(),
    ...overrides,
  } as unknown as RecipeRunnerContext;
}

/**
 * Helper: Setup world state with ingredients
 */
function seedWorld() {
  worldStore.setState({
    entities: {
      oil_1: {
        id: 'oil_1',
        name: '🫒 Olive Oil',
        type: 'ingredient',
        ingredientId: 'oil',
        state: {},
      },
      potatoes_1: {
        id: 'potatoes_1',
        name: '🥔 Potatoes',
        type: 'ingredient',
        ingredientId: 'potatoes',
        state: { preparation: 'sliced' },
      },
      garlic_1: {
        id: 'garlic_1',
        name: '🧄 Garlic',
        type: 'ingredient',
        ingredientId: 'garlic',
        state: { preparation: 'peeled' },
      },
      eggs_1: {
        id: 'eggs_1',
        name: '🥚 Eggs',
        type: 'ingredient',
        ingredientId: 'egg',
        state: {},
      },
    },
    containers: {
      burner1: {
        id: 'burner1',
        name: 'burner1',
        type: 'workstation',
        entityIds: [],
      },
      burner1try: {
        id: 'burner1try',
        name: 'burner1try',
        type: 'storage',
        entityIds: ['oil_1', 'potatoes_1', 'garlic_1', 'eggs_1'],
      },
      board: {
        id: 'board',
        name: 'Board',
        type: 'workstation',
        entityIds: [],
      },
    },
    events: [],
  });
}

describe('Cook Handlers - Oil & Ingredient Cooking', () => {
  beforeEach(() => {
    seedWorld();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Test Group 1: Oil Heating (Primary Target)', () => {
    it('1.1: Heat oil - Oil should NOT be marked as consumed', async () => {
      const ctx = createMockContext();

      const heatOilStep: CookStep = {
        action: 'cook',
        target: 'oil',
        method: 'heat',
      };

      await handleCookStep(ctx, heatOilStep, 'burner1');

      const state = worldStore.getState();
      const oil = state.entities.oil_1;

      expect(oil.state?.consumed).not.toBe(true);
      expect(oil.state?.consumedBy).toBeUndefined();
    });

    it('1.2: Heat oil - Oil should be moved to burner1', async () => {
      const ctx = createMockContext();

      const heatOilStep: CookStep = {
        action: 'cook',
        target: 'oil',
        method: 'heat',
      };

      await handleCookStep(ctx, heatOilStep, 'burner1');

      const state = worldStore.getState();
      const burner1Container = state.containers.burner1;

      expect(burner1Container.entityIds).toContain('oil_1');
    });

    it('1.3: Heat oil - Oil state should show cooking method "heat"', async () => {
      const ctx = createMockContext();

      const heatOilStep: CookStep = {
        action: 'cook',
        target: 'oil',
        method: 'heat',
      };

      await handleCookStep(ctx, heatOilStep, 'burner1');

      const state = worldStore.getState();
      const oil = state.entities.oil_1;

      expect(oil.state?.cooking).toBe('heat');
    });

  });

  describe('Test Group 2: Garlic Cooking & Removal', () => {
    it('2.1: Fry garlic - Garlic should be marked with cooking state', async () => {
      const ctx = createMockContext();

      const fryGarlicStep: CookStep = {
        action: 'cook',
        target: 'garlic',
        method: 'fry',
        instruction: 'Que no se quemen.', // Don't let them burn
      };

      await handleCookStep(ctx, fryGarlicStep, 'burner1');

      const state = worldStore.getState();
      const garlic = state.entities.garlic_1;

      expect(garlic.state?.cooking).toBe('fry');
    });

    it('2.2: Fry garlic - Garlic should be moved to burner1', async () => {
      const ctx = createMockContext();

      const fryGarlicStep: CookStep = {
        action: 'cook',
        target: 'garlic',
        method: 'fry',
      };

      await handleCookStep(ctx, fryGarlicStep, 'burner1');

      const state = worldStore.getState();
      const burner1Container = state.containers.burner1;

      expect(burner1Container.entityIds).toContain('garlic_1');
    });

    it('2.3: Fry garlic - Garlic should NOT be consumed (it\'s the target)', async () => {
      const ctx = createMockContext();

      const fryGarlicStep: CookStep = {
        action: 'cook',
        target: 'garlic',
        method: 'fry',
      };

      await handleCookStep(ctx, fryGarlicStep, 'burner1');

      const state = worldStore.getState();
      const garlic = state.entities.garlic_1;

      expect(garlic.state?.consumed).not.toBe(true);
      expect(garlic.state?.consumedBy).toBeUndefined();
    });

    it('2.4: Fry garlic - Oil should be consumed as cooking medium', async () => {
      const ctx = createMockContext();

      // First heat oil
      const heatOilStep: CookStep = {
        action: 'cook',
        target: 'oil',
        method: 'heat',
      };
      await handleCookStep(ctx, heatOilStep, 'burner1');

      // Now fry garlic
      const fryGarlicStep: CookStep = {
        action: 'cook',
        target: 'garlic',
        method: 'fry',
      };
      await handleCookStep(ctx, fryGarlicStep, 'burner1');

      const state = worldStore.getState();
      const oil = state.entities.oil_1;

      // Oil should be consumed since garlic (not oil) is the target
      expect(oil.state?.consumed).toBe(true);
      expect(oil.state?.consumedBy).toBe('garlic_1');
    });
  });

  describe('Test Group 3: Frying with Oil (Oil as Cooking Medium)', () => {
    it('3.1: Fry potatoes - Oil should be consumed as cooking medium', async () => {
      const ctx = createMockContext();

      // Heat oil first
      const heatOilStep: CookStep = {
        action: 'cook',
        target: 'oil',
        method: 'heat',
      };
      await handleCookStep(ctx, heatOilStep, 'burner1');

      // Move potatoes to burner1 manually for test
      worldStore.getState().dispatch({
        type: 'MOVE_ENTITY',
        payload: {
          entityId: 'potatoes_1',
          targetContainerId: 'burner1',
        },
      });

      // Fry potatoes
      const fryPotatoesStep: CookStep = {
        action: 'cook',
        target: 'potatoes',
        method: 'fry',
      };
      await handleCookStep(ctx, fryPotatoesStep, 'burner1');

      const state = worldStore.getState();
      const oil = state.entities.oil_1;

      // Oil SHOULD be consumed when potatoes are fried
      expect(oil.state?.consumed).toBe(true);
      expect(oil.state?.consumedBy).toBe('potatoes_1');
    });

    it('3.2: Potatoes should NOT be consumed (they are the target)', async () => {
      const ctx = createMockContext();

      // Heat oil
      const heatOilStep: CookStep = {
        action: 'cook',
        target: 'oil',
        method: 'heat',
      };
      await handleCookStep(ctx, heatOilStep, 'burner1');

      // Move potatoes to burner1
      worldStore.getState().dispatch({
        type: 'MOVE_ENTITY',
        payload: {
          entityId: 'potatoes_1',
          targetContainerId: 'burner1',
        },
      });

      // Fry potatoes
      const fryPotatoesStep: CookStep = {
        action: 'cook',
        target: 'potatoes',
        method: 'fry',
      };
      await handleCookStep(ctx, fryPotatoesStep, 'burner1');

      const state = worldStore.getState();
      const potatoes = state.entities.potatoes_1;

      expect(potatoes.state?.consumed).not.toBe(true);
      expect(potatoes.state?.consumedBy).toBeUndefined();
    });
  });

  describe('Test Group 4: Complete Cooking Sequence', () => {
    it('4.1: Full sequence - Heat oil, fry garlic, fry potatoes', async () => {
      const ctx = createMockContext();

      // Step 1: Heat oil
      const heatOilStep: CookStep = {
        action: 'cook',
        target: 'oil',
        method: 'heat',
      };
      await handleCookStep(ctx, heatOilStep, 'burner1');

      // Verify oil is in burner1 but not consumed
      let state = worldStore.getState();
      let oil = state.entities.oil_1;
      expect(state.containers.burner1.entityIds).toContain('oil_1');
      expect(oil.state?.consumed).not.toBe(true);
      expect(oil.state?.cooking).toBe('heat');

      // Step 2: Fry garlic
      const fryGarlicStep: CookStep = {
        action: 'cook',
        target: 'garlic',
        method: 'fry',
      };
      await handleCookStep(ctx, fryGarlicStep, 'burner1');

      // Verify garlic is in burner1, oil is consumed
      state = worldStore.getState();
      const garlic = state.entities.garlic_1;
      oil = state.entities.oil_1;
      expect(state.containers.burner1.entityIds).toContain('garlic_1');
      expect(garlic.state?.cooking).toBe('fry');
      expect(oil.state?.consumed).toBe(true);

      // Step 3: Move potatoes to burner1 (simulating move step)
      worldStore.getState().dispatch({
        type: 'MOVE_ENTITY',
        payload: {
          entityId: 'potatoes_1',
          targetContainerId: 'burner1',
        },
      });

      // Step 4: Fry potatoes (oil already consumed, won't be consumed again)
      const fryPotatoesStep: CookStep = {
        action: 'cook',
        target: 'potatoes',
        method: 'fry',
      };
      await handleCookStep(ctx, fryPotatoesStep, 'burner1');

      // Final state check
      state = worldStore.getState();
      const potatoes = state.entities.potatoes_1;
      oil = state.entities.oil_1;

      expect(state.containers.burner1.entityIds).toContain('potatoes_1');
      expect(potatoes.state?.cooking).toBe('fry');
      expect(oil.state?.consumed).toBe(true); // Still consumed from garlic step
    });

    it('4.2: Oil consumption happens only once per session', async () => {
      const ctx = createMockContext();

      // Heat oil
      const heatOilStep: CookStep = {
        action: 'cook',
        target: 'oil',
        method: 'heat',
      };
      await handleCookStep(ctx, heatOilStep, 'burner1');

      // Fry garlic (consumes oil)
      worldStore.getState().dispatch({
        type: 'MOVE_ENTITY',
        payload: {
          entityId: 'garlic_1',
          targetContainerId: 'burner1',
        },
      });

      const fryGarlicStep: CookStep = {
        action: 'cook',
        target: 'garlic',
        method: 'fry',
      };
      await handleCookStep(ctx, fryGarlicStep, 'burner1');

      let state = worldStore.getState();
      let oil = state.entities.oil_1;
      const firstConsumption = oil.state?.consumedBy;

      // Fry potatoes (oil already consumed, shouldn't be consumed again)
      worldStore.getState().dispatch({
        type: 'MOVE_ENTITY',
        payload: {
          entityId: 'potatoes_1',
          targetContainerId: 'burner1',
        },
      });

      const fryPotatoesStep: CookStep = {
        action: 'cook',
        target: 'potatoes',
        method: 'fry',
      };
      await handleCookStep(ctx, fryPotatoesStep, 'burner1');

      state = worldStore.getState();
      oil = state.entities.oil_1;

      // Oil should still be consumed by garlic, not potatoes
      expect(oil.state?.consumedBy).toBe(firstConsumption);
      expect(oil.state?.consumedBy).toBe('garlic_1');
    });
  });

  describe('Test Group 5: Flip Step', () => {
    it('5.1: Flip mixture - Should mark mixture as flipped', async () => {
      const ctx = createMockContext();

      // Create a mixture entity
      worldStore.getState().dispatch({
        type: 'ADD_ENTITY',
        payload: {
          entity: {
            id: 'mixture_1',
            name: '🍳 Mixture',
            type: 'ingredient',
            ingredientId: 'mixture',
            state: {},
          },
          containerId: 'burner1',
        },
      });

      const flipStep: FlipStep = {
        action: 'flip',
        target: 'mixture',
        instruction: 'Dale la vuelta a la tortilla.',
      };

      await handleFlipStep(ctx, flipStep);

      const state = worldStore.getState();
      const mixture = state.entities.mixture_1;

      expect(mixture.state?.isFlipped).toBe(true);
    });
  });

  describe('Test Group 6: Edge Cases', () => {
    it('6.1: Cook oil again - Should NOT consume it again', async () => {
      const ctx = createMockContext();

      // Heat oil first time
      const heatOilStep1: CookStep = {
        action: 'cook',
        target: 'oil',
        method: 'heat',
      };
      await handleCookStep(ctx, heatOilStep1, 'burner1');

      let state = worldStore.getState();
      let oil = state.entities.oil_1;
      expect(oil.state?.cooking).toBe('heat');

      // Try to heat oil again (should just update state)
      const heatOilStep2: CookStep = {
        action: 'cook',
        target: 'oil',
        method: 'heat',
      };
      await handleCookStep(ctx, heatOilStep2, 'burner1');

      state = worldStore.getState();
      oil = state.entities.oil_1;

      // Oil should still not be consumed
      expect(oil.state?.consumed).not.toBe(true);
    });

    it('6.2: Multiple ingredients in burner1 - Only oil consumed', async () => {
      const ctx = createMockContext();

      // Setup: Move multiple items to burner1
      worldStore.getState().dispatch({
        type: 'MOVE_ENTITY',
        payload: {
          entityId: 'oil_1',
          targetContainerId: 'burner1',
        },
      });

      worldStore.getState().dispatch({
        type: 'MOVE_ENTITY',
        payload: {
          entityId: 'eggs_1',
          targetContainerId: 'burner1',
        },
      });

      // Fry potatoes
      worldStore.getState().dispatch({
        type: 'MOVE_ENTITY',
        payload: {
          entityId: 'potatoes_1',
          targetContainerId: 'burner1',
        },
      });

      const fryStep: CookStep = {
        action: 'cook',
        target: 'potatoes',
        method: 'fry',
      };

      await handleCookStep(ctx, fryStep, 'burner1');

      const state = worldStore.getState();
      const oil = state.entities.oil_1;
      const eggs = state.entities.eggs_1;

      // Oil should be consumed
      expect(oil.state?.consumed).toBe(true);

      // Eggs should not be consumed (not detected as cooking medium)
      expect(eggs.state?.consumed).not.toBe(true);
    });

    it('6.3: Fire control - Mascot turns fire ON before cooking and OFF after cooking', async () => {
      const fireStates: boolean[] = [];

      const ctx = createMockContext({
        wait: vi.fn(async () => {
          // Record burner1 isOn state during wait
          const isOn = Boolean(worldStore.getState().containers.burner1?.isOn);
          fireStates.push(isOn);
        }),
      });

      // Ensure burner1 is off initially
      worldStore.setState({
        containers: {
          ...worldStore.getState().containers,
          burner1: {
            id: 'burner1',
            name: 'burner1',
            type: 'workstation',
            entityIds: [],
            isOn: false,
          },
        },
      });

      const cookStep: CookStep = {
        action: 'cook',
        target: 'potatoes',
        method: 'fry',
      };

      await handleCookStep(ctx, cookStep, 'burner1');

      // During cooking (in first wait after toggle or second wait), fire was turned ON
      expect(fireStates).toContain(true);

      // After cooking step finishes, burner1 fire is turned OFF
      const finalBurnerState = worldStore.getState().containers.burner1;
      expect(finalBurnerState.isOn).toBe(false);
    });
  });
});
`````

## File: src/systems/recipeRunner/handlers/prepHandlers.ts
`````typescript
/**
 * FILE: src/systems/recipeRunner/handlers/prepHandlers.ts
 *
 * PURPOSE:
 * Step handlers for ingredient preparation steps ('cut', 'prepare', 'peel', 'wash', 'rinse', 'drain').
 */

import { worldStore } from '../../../store/worldStore';
import { moveTortillaTo } from '../../mascotActions';
import type { RecipeStep } from '../../../types/RecipeStep';
import type { RecipeRunnerContext } from '../types';

type PrepStep = Extract<
  RecipeStep,
  { action: 'cut' | 'prepare' | 'peel' | 'wash' | 'rinse' | 'drain' }
>;

export async function handlePrepStep(
  ctx: RecipeRunnerContext,
  step: PrepStep,
  workstationDefaultContainerId?: string
): Promise<void> {
  const rawKey = step.target || step.ingredient;
  let entityId = ctx.getBoundEntityId(rawKey);

  if (!entityId) {
    return;
  }

  ctx.validateEntity(entityId, step.action);

  const targetContainerId = step.containerId || workstationDefaultContainerId || ctx.defaultTargetId;

  // Ensure bound entity is in workspace
  entityId = await ctx.ensureEntityInWorkspace(entityId, targetContainerId);

  moveTortillaTo(targetContainerId, ctx.mascotId);
  await ctx.wait();

  const prepStyle = (() => {
    if ('preparation' in step && step.preparation) return step.preparation;
    if ('style' in step && step.style) return step.style;
    if (step.action === 'peel') return 'peeled';
    if (step.action === 'wash') return 'washed';
    return 'prepared';
  })();

  worldStore.getState().dispatch({
    type: 'PREPARE_INGREDIENT',
    payload: {
      entityId,
      preparation: prepStyle,
    },
  });

  await ctx.wait();
}
`````

## File: src/systems/movement.ts
`````typescript
/**
 * FILE: movement.ts
 *
 * PURPOSE:
 * Handles entity movement calculations.
 *
 * RESPONSIBILITY:
 * - Calculates position changes.
 * - Provides movement behavior.
 */

import { worldStore } from '../store/worldStore';

/**
 * Requests that an entity be moved to another container.
 * The reducer determines the source container automatically.
 */
export function moveEntity(
  entityId: string,
  targetContainerId: string,
  positionIndex?: number
): void {
  worldStore.getState().dispatch({
    type: 'MOVE_ENTITY',
    payload: {
      entityId,
      targetContainerId,
      positionIndex,
    },
  });
}
`````

## File: src/systems/recipeMatcher.test.ts
`````typescript
import { describe, expect, it } from 'vitest'
import { countMatchingRequirements } from './recipeMatcher'
import type { Recipe } from '../types/Recipe'
import type { Entity } from '../types/world'

describe('countMatchingRequirements', () => {
  const sampleRecipe: Recipe = {
    id: 'test-recipe',
    name: 'Test Recipe',
    requirements: [
      { id: 'req-1', entityId: 'potato', amount: 3, unit: 'pcs' },
      { id: 'req-2', entityId: 'egg', amount: 4, unit: 'pcs' },
      { id: 'req-3', entityId: 'onion', amount: 1, unit: 'pcs' },
    ],
    steps: [],
  }

  it('returns zeros when recipe is undefined', () => {
    const result = countMatchingRequirements(undefined, [])
    expect(result.matchingCount).toBe(0)
    expect(result.totalCount).toBe(0)
    expect(result.matchingRequirementIds).toEqual([])
    expect(result.missingRequirementIds).toEqual([])
  })

  it('returns zero matching count when workspace is empty', () => {
    const result = countMatchingRequirements(sampleRecipe, [])
    expect(result.matchingCount).toBe(0)
    expect(result.totalCount).toBe(3)
    expect(result.matchingRequirementIds).toEqual([])
    expect(result.missingRequirementIds).toEqual(['potato', 'egg', 'onion'])
  })

  it('correctly matches entities present in workspace', () => {
    const workspaceEntities: Entity[] = [
      { id: 'potato_123', ingredientId: 'potato', name: 'Potato', type: 'ingredient' },
      { id: 'egg_456', ingredientId: 'egg', name: 'Egg', type: 'ingredient' },
    ]

    const result = countMatchingRequirements(sampleRecipe, workspaceEntities)
    expect(result.matchingCount).toBe(2)
    expect(result.totalCount).toBe(3)
    expect(result.matchingRequirementIds).toEqual(['potato', 'egg'])
    expect(result.missingRequirementIds).toEqual(['onion'])
  })

  it('handles entities without explicit ingredientId field by fallback prefix parsing', () => {
    const workspaceEntities: Entity[] = [
      { id: 'onion_999', name: 'Onion', type: 'ingredient' },
    ]

    const result = countMatchingRequirements(sampleRecipe, workspaceEntities)
    expect(result.matchingCount).toBe(1)
    expect(result.matchingRequirementIds).toEqual(['onion'])
  })

  it('matches tool or product entities in workspace', () => {
    const workspaceEntities: Entity[] = [
      { id: 'knife_1', name: 'Knife', type: 'tool' },
      { id: 'potato_100', ingredientId: 'potato', name: 'Potato', type: 'ingredient' },
    ]

    const result = countMatchingRequirements(sampleRecipe, workspaceEntities)
    expect(result.matchingCount).toBe(1)
    expect(result.matchingRequirementIds).toEqual(['potato'])
  })
})
`````

## File: src/systems/recipeMatcher.ts
`````typescript
/**
 * FILE: recipeMatcher.ts
 *
 * PURPOSE:
 * Utility functions for evaluating recipe completion and matching requirements against workspace entities.
 *
 * RESPONSIBILITY:
 * - Computes matching requirements and counts for a recipe given active world entities.
 * - Identifies matched and missing entity IDs.
 */

import { getRecipeRequirementsArray } from '../types/Recipe'
import type { Recipe } from '../types/Recipe'
import type { Entity } from '../types/world'
import { getIngredientCatalogId } from '../engine/containerRules'

export interface RecipeMatchResult {
  matchingCount: number
  totalCount: number
  matchingRequirementIds: string[]
  missingRequirementIds: string[]
  // Backward compatibility aliases
  matchingIngredientIds: string[]
  missingIngredientIds: string[]
}

/**
 * Calculates matching requirement count and detailed breakdown for a given recipe
 * based on entities present in workspace containers.
 */
export function countMatchingRequirements(
  recipe: Recipe | undefined | null,
  entities: Entity[]
): RecipeMatchResult {
  if (!recipe) {
    return {
      matchingCount: 0,
      totalCount: 0,
      matchingRequirementIds: [],
      missingRequirementIds: [],
      matchingIngredientIds: [],
      missingIngredientIds: [],
    }
  }

  const requirements = getRecipeRequirementsArray(recipe)

  const workspaceEntityIds = new Set(
    entities
      .filter((e) => Boolean(e))
      .map((e) => e.ingredientId || getIngredientCatalogId(e) || e.id)
  )

  const matchingRequirementIds: string[] = []
  const missingRequirementIds: string[] = []

  for (const req of requirements) {
    const reqId = req.entityId || (req as unknown as { ingredientId?: string }).ingredientId || ''
    if (workspaceEntityIds.has(reqId)) {
      matchingRequirementIds.push(reqId)
    } else {
      missingRequirementIds.push(reqId)
    }
  }

  return {
    matchingCount: matchingRequirementIds.length,
    totalCount: requirements.length,
    matchingRequirementIds,
    missingRequirementIds,
    matchingIngredientIds: matchingRequirementIds,
    missingIngredientIds: missingRequirementIds,
  }
}

/** Alias for backward compatibility */
export const countMatchingIngredients = countMatchingRequirements
`````

## File: src/types/Recipe.ts
`````typescript
/**
 * FILE: Recipe.ts
 *
 * PURPOSE:
 * Defines recipe data structure.
 *
 * RESPONSIBILITY:
 * - Represents a recipe with required entities (requirements) and steps.
 * - Supports both array and key-based dictionary requirement declarations.
 */

import type { Requirement, RequirementDictItem } from './Requirement';
import type { RecipeStep } from './RecipeStep';

export type RecipeRequirementDictItem = RequirementDictItem;

export type RecipeRequirements =
  | Requirement[]
  | Record<string, RequirementDictItem>;

export interface Recipe {
  id: string;
  name: string;
  requirements: RecipeRequirements;
  steps: RecipeStep[];
}

export type RecipeList = Recipe[];

/**
 * Normalizes a Recipe's requirements into a standard array of Requirement objects.
 */
export function getRecipeRequirementsArray(recipe: Recipe): Requirement[] {
  const reqs = recipe.requirements;
  if (Array.isArray(reqs)) {
    return reqs.map((item) => ({
      ...item,
      entityId: item.entityId || (item as unknown as { ingredientId?: string }).ingredientId || '',
    }));
  }

  if (reqs && typeof reqs === 'object') {
    return Object.entries(reqs).map(([key, item]) => ({
      id: `${recipe.id}-${key}`,
      entityId: item.entityId || item.ingredientId || key,
      amount: item.amount,
      unit: item.unit,
      name: item.name,
    }));
  }

  return [];
}

/** Legacy alias helper for backward compatibility during transition */
export const getRecipeIngredientsArray = getRecipeRequirementsArray;
`````

## File: src/types/RecipeStep.ts
`````typescript
/**
 * FILE: RecipeStep.ts
 *
 * PURPOSE:
 * Defines declarative steps for recipes.
 *
 * RESPONSIBILITY:
 * - Replaces hardcoded recipe logic with pure data declarations.
 * - Supports cooking actions (prepare, cook, mix, flip, serve, move, grab, drop, wait, speak, celebrate).
 */

export type PreparationStyle = 'whole' | 'peeled' | 'sliced' | 'diced' | 'minced' | 'beaten' | string;
export type CookingMethod = 'raw' | 'fried' | 'boiled' | 'burned' | 'heat' | string;

export type RecipeStep =
  | {
      action: 'prepare' | 'cut' | 'peel' | 'wash';
      target?: string;
      ingredient?: string;
      preparation?: PreparationStyle;
      style?: PreparationStyle;
      containerId?: string;
    }
  | {
      action: 'cook';
      target?: string;
      ingredient?: string;
      method?: CookingMethod;
      containerId?: string;
      duration?: number;
      unit?: string;
      instruction?: string;
      mascotId?: string;
    }
  | {
      action: 'wash' | 'rinse' | 'drain';
      target?: string;
      ingredient?: string;
      containerId?: string;
    }
  | {
      action: 'mix' | 'beat' | 'combine';
      inputs?: string[];
      ingredients?: string[];
      output?: string;
      targetContainerId?: string;
    }
  | {
      action: 'instruction';
      text?: string;
      instruction?: string;
      mascotId?: string;
    }
  | {
      action: 'flip';
      target?: string;
      instruction?: string;
      mascotId?: string;
    }
  | {
      action: 'serve';
      target?: string;
      containerId?: string;
    }
  | {
      action: 'move';
      ingredient?: string;
      target?: string;
      source?: string;
    }
  | {
      action: 'grab';
      ingredient: string;
      source?: string;
    }
  | {
      action: 'drop';
      target?: string;
      positionIndex?: number;
    }
  | {
      action: 'wait';
      durationMs?: number;
    }
  | {
      action: 'speak';
      message: string;
      mascotId?: string;
    }
  | {
      action: 'celebrate';
      mascotId?: string;
    };
`````

## File: src/types/recording.ts
`````typescript
/**
 * FILE: recording.ts
 *
 * PURPOSE:
 * Type definitions for serialized world state recipes and recorded user interaction sequences.
 *
 * RESPONSIBILITY:
 * - Defines the JSON schema for serialized recipe exports.
 * - Captures initial and final WorldState snapshots (entities + containers).
 * - Stores interaction sequences with relative timestamps for replay / serialization.
 */

import type { Container, Entity, WorldAction } from './world';

export interface RecordedAction {
  type: WorldAction['type'] | string;
  payload: Record<string, unknown>;
  timestampMs: number;
}

export interface SerializedWorldState {
  entities: Record<string, Entity>;
  containers: Record<string, Container>;
}

export interface SerializedRecipeExport {
  version: '1.0.0';
  title: string;
  recordedAt: string;
  durationMs: number;
  actionCount: number;
  usedIngredients?: Array<{ id: string; name: string; icon?: string }>;
  initialState: SerializedWorldState;
  finalState: SerializedWorldState;
  actions: RecordedAction[];
}
`````

## File: src/components/Controls/ActionReplayer.tsx
`````typescript
/**
 * FILE: ActionReplayer.tsx
 *
 * PURPOSE:
 * React UI component for uploading, validating, and playing back JSON action logs.
 *
 * RESPONSIBILITY:
 * - Handles JSON file loading via FileReader input.
 * - Validates JSON structure into WorldAction[].
 * - Controls playback execution using ActionPlayer.
 * - Displays active progress and stop/cancel controls during playback.
 */

import React, { useRef, useState, useCallback } from 'react';
import { actionPlayer } from '../../systems/actionPlayer';
import { worldStore } from '../../store/worldStore';
import { useStore } from 'zustand';
import type { WorldAction } from '../../types/actions';
import type { RecordedAction } from '../../types/recording';
import './ActionReplayer.scss';

export interface ActionReplayerProps {
  /** Optional custom delay default in ms. Default: 300 */
  defaultDelayMs?: number;
  /** Optional class name override */
  className?: string;
  /** Callback fired when playback starts */
  onPlaybackStart?: () => void;
  /** Callback fired when playback completes */
  onPlaybackComplete?: () => void;
}

export const ActionReplayer: React.FC<ActionReplayerProps> = ({
  defaultDelayMs = 300,
  className = '',
  onPlaybackStart,
  onPlaybackComplete,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recordedActions = useStore(worldStore, (state) => state.recordedActions);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [delayMs, setDelayMs] = useState<number>(defaultDelayMs);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const totalSteps = recordedActions.length;
  const effectiveCurrentStep = Math.min(currentStep, totalSteps);

  const handleUploadClick = () => {
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const validateActions = (parsed: unknown): WorldAction[] | null => {
    let actionArray: unknown[] | null = null;

    if (Array.isArray(parsed)) {
      actionArray = parsed;
    } else if (parsed && typeof parsed === 'object') {
      const obj = parsed as Record<string, unknown>;
      if (Array.isArray(obj.actions)) {
        actionArray = obj.actions;
      } else if (Array.isArray(obj.actionLog)) {
        actionArray = obj.actionLog;
      }
    }

    if (!actionArray || !Array.isArray(actionArray) || actionArray.length === 0) {
      return null;
    }

    const isValid = actionArray.every(
      (item) => item && typeof item === 'object' && typeof (item as Record<string, unknown>).type === 'string'
    );

    return isValid ? (actionArray as WorldAction[]) : null;
  };

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const content = e.target?.result as string;
          const parsed = JSON.parse(content);
          const actions = validateActions(parsed);

          if (!actions) {
            setErrorMessage('Invalid JSON format: Expected array of WorldActions.');
            return;
          }

          setErrorMessage(null);
          worldStore.getState().setRecordedActions(actions as unknown as RecordedAction[]);
          setCurrentStep(0);
        } catch (err) {
          console.error('Failed to parse action log JSON:', err);
          setErrorMessage('Failed to read or parse JSON file.');
        }
      };

      reader.readAsText(file);
    },
    []
  );

  const handlePlayAll = useCallback(async () => {
    if (recordedActions.length === 0) return;
    setIsPlaying(true);
    onPlaybackStart?.();

    const reset = currentStep === 0;
    const remainingActions = recordedActions.slice(currentStep) as unknown as WorldAction[];
    const startOffset = currentStep;

    await actionPlayer.playLog(remainingActions, {
      delayMs,
      resetWorld: reset,
      onStep: (curr) => {
        setCurrentStep(startOffset + curr);
      },
      onComplete: () => {
        setIsPlaying(false);
        onPlaybackComplete?.();
      },
      onStop: () => {
        setIsPlaying(false);
      },
    });
  }, [recordedActions, currentStep, delayMs, onPlaybackStart, onPlaybackComplete]);

  const handleStop = () => {
    actionPlayer.stop();
    setIsPlaying(false);
  };

  const handleStepForward = useCallback(() => {
    if (currentStep < recordedActions.length) {
      const nextAction = recordedActions[currentStep];
      worldStore.getState().dispatch(nextAction as unknown as WorldAction);
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, recordedActions]);

  const handleStepBack = useCallback(() => {
    if (currentStep > 0) {
      const targetIndex = currentStep - 1;
      worldStore.getState().dispatch({ type: 'RESET_WORLD' });
      for (let i = 0; i < targetIndex; i++) {
        worldStore.getState().dispatch(recordedActions[i] as unknown as WorldAction);
      }
      setCurrentStep(targetIndex);
    }
  }, [currentStep, recordedActions]);

  const handleResetSteps = useCallback(() => {
    worldStore.getState().dispatch({ type: 'RESET_WORLD' });
    setCurrentStep(0);
  }, []);

  const percent = totalSteps > 0 ? Math.round((effectiveCurrentStep / totalSteps) * 100) : 0;

  return (
    <div className={`action-replayer ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        className="file-input-hidden"
        onChange={handleFileChange}
      />

      <button
        type="button"
        className="replayer-btn load-btn"
        onClick={handleUploadClick}
        title="Upload and replay a recorded action log JSON file"
      >
        📂 Load Action Log (.json)
      </button>

      {totalSteps > 0 && !isPlaying && (
        <div className="step-controls-group">
          <button
            type="button"
            className="replayer-btn step-btn"
            onClick={handleStepBack}
            disabled={effectiveCurrentStep === 0}
            title="Step back to previous recorded action"
          >
            ⏮️ Step Back
          </button>

          <button
            type="button"
            className="replayer-btn step-btn step-forward-btn"
            onClick={handleStepForward}
            disabled={effectiveCurrentStep >= totalSteps}
            title="Step forward to next recorded action"
          >
            ⏭️ Step Forward
          </button>

          <button
            type="button"
            className="replayer-btn play-btn"
            onClick={handlePlayAll}
            title="Play all remaining actions"
          >
            ▶️ Play
          </button>

          <button
            type="button"
            className="replayer-btn reset-btn"
            onClick={handleResetSteps}
            title="Reset world state to step 0"
          >
            🔄 Reset
          </button>
        </div>
      )}

      {isPlaying && (
        <button
          type="button"
          className="replayer-btn stop-btn"
          onClick={handleStop}
          title="Stop action playback"
        >
          ⏹ Stop Playback
        </button>
      )}

      {!isPlaying && (
        <select
          className="delay-select"
          value={delayMs}
          onChange={(e) => setDelayMs(Number(e.target.value))}
          title="Playback speed step delay"
        >
          <option value={100}>Fast (100ms)</option>
          <option value={300}>Normal (300ms)</option>
          <option value={600}>Slow (600ms)</option>
        </select>
      )}

      {totalSteps > 0 && (
        <div className="playback-status">
          <span>
            Step {effectiveCurrentStep} / {totalSteps}
          </span>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
          </div>
        </div>
      )}

      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
};
`````

## File: src/components/Mascot/TortillaSvg.scss
`````scss
/**
 * FILE: src/components/Mascot/TortillaSvg.scss
 *
 * PURPOSE:
 * Styles and animations for TortillaSvg mascot using SCSS variables and mixins.
 */

@use 'sass:color';
@use '../../styles/variables' as *;
@use '../../styles/mixins' as *;

/* === Root SVG Styles & State Animations === */
.tortilla-svg {
  transform-origin: center;
  overflow: visible;

  &.is-idle {
    animation: tortillaIdle 2.5s infinite ease-in-out;
  }

  &.is-flipping {
    animation: tortillaFlip 0.8s ease-in-out forwards;
  }
}

@keyframes tortillaIdle {
  0%, 100% {
    transform: translateY(0) scaleY(1);
  }
  50% {
    transform: translateY(-3px) scaleY(1.02);
  }
}

@keyframes tortillaFlip {
  0% {
    transform: translateY(0) rotateX(0deg) scale(1);
  }
  50% {
    transform: translateY(-60px) rotateX(180deg) scale(1.15);
  }
  100% {
    transform: translateY(0) rotateX(360deg) scale(1);
  }
}

/* === Physical Movement & Wrapper Animations === */
.mascot-card {
  @include ceramic-card($warm-surface, $warm-border);
  padding: 12px 16px;
}

.mascot-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  transform: translate3d(var(--offset-x, 0px), var(--offset-y, 0px), 0);
  transition: transform 0.65s cubic-bezier(0.34, 1.25, 0.64, 1), filter 0.3s ease;
  will-change: transform, filter;
  z-index: 1;

  &.is-floating {
    z-index: 1000;
    filter: drop-shadow(0 14px 22px rgba(44, 26, 20, 0.25));
  }

  &.is-holding {
    animation: mascotGrabPulse 0.4s ease-in-out;
  }
}

@keyframes mascotGrabPulse {
  0% { transform: translate3d(var(--offset-x, 0px), var(--offset-y, 0px), 0) scale(1); }
  50% { transform: translate3d(var(--offset-x, 0px), var(--offset-y, 0px), 0) scale(1.1); }
  100% { transform: translate3d(var(--offset-x, 0px), var(--offset-y, 0px), 0) scale(1); }
}

/* === Held Ingredient Badge CSS Animations === */
.mascot-held-badge {
  position: absolute;
  bottom: -8px;
  right: -12px;
  background: #ffffff;
  border: 2px solid $tortilla-yellow;
  border-radius: 20px;
  padding: 3px 8px;
  box-shadow: 0 4px 14px rgba(44, 26, 20, 0.18);
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: bold;
  color: $dark-brown;
  white-space: nowrap;
  pointer-events: none;
  z-index: 1001;
  animation: heldBadgeEnter 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards, heldBadgeFloat 2.5s ease-in-out infinite 0.35s;
}

@keyframes heldBadgeEnter {
  0% {
    opacity: 0;
    transform: translateY(15px) scale(0);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes heldBadgeFloat {
  0%, 100% {
    transform: translateY(0) rotate(-2deg);
  }
  50% {
    transform: translateY(-4px) rotate(3deg);
  }
}

/* === Internal Element Animations === */
.tortilla-blink {
  animation: tortillaBlink 4s infinite;
  transform-box: fill-box;
  transform-origin: center;
}

@keyframes tortillaBlink {
  0%, 92%, 100% {
    transform: scaleY(0);
    opacity: 0;
  }
  94%, 98% {
    transform: scaleY(1);
    opacity: 1;
  }
}
`````

## File: src/components/Recipe/RecipePanel.scss
`````scss
/**
 * FILE: src/components/Recipe/RecipePanel.scss
 *
 * PURPOSE:
 * SCSS styles for the Recipe selection and execution panel.
 */

@use 'sass:color';
@use '../../styles/variables' as *;
@use '../../styles/mixins' as *;

.recipe-panel {
  @include ceramic-card($warm-surface, $warm-border);
  padding: 12px 16px;
  margin-bottom: 16px;

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }
}

.recipe-selector {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
}

.recipe-tab {
  background: #ffffff;
  border: 1px solid $warm-border;
  font-size: 13px;
  font-weight: 700;
  color: $dark-brown;
  cursor: pointer;
  padding: 6px 14px;
  border-radius: $radius-sm;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);

  &:hover {
    border-color: $tortilla-yellow;
    color: $dark-brown;
    background: $tortilla-yellow-light;
  }

  &.active {
    background: $tortilla-yellow;
    color: #ffffff;
    border-color: $tortilla-yellow-hover;
    box-shadow: 0 2px 6px rgba(232, 168, 56, 0.3);
  }
}

.recipe-header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.recipe-status {
  font-size: 13px;
  color: $wood-muted;
  font-weight: 600;
}

.highlight-count {
  color: $terracotta;
  font-weight: 800;
}

.recipe-reset-btn {
  background: #ffffff;
  border: 2px solid $terracotta;
  border-radius: $radius-sm;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 800;
  color: $terracotta;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:hover {
    background: $terracotta;
    color: #ffffff;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  }

  &:active {
    transform: translateY(0);
  }
}

.recipe-toggle-btn {
  background: #ffffff;
  border: 1px solid $warm-border;
  border-radius: $radius-sm;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 700;
  color: $dark-brown;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: $olive-green;
    color: $olive-green;
    background: $olive-green-light;
  }
}

.recipe-content.compact {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px dashed $warm-border;
}

.recipe-requirements {
  display: flex;
  flex-direction: column;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.requirement-view {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  &__amount {
    font-size: 0.8rem;
    color: $wood-muted;
    font-weight: 600;
  }
}

.recipe-title {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: $dark-brown;
  font-weight: 700;
}
`````

## File: src/data/catalog/recipes/recipes.test.ts
`````typescript
import { describe, expect, it } from 'vitest';
import { recipes, concebollaRecipe, clasicaRecipe } from './index';
import { ingredients as ingredientCatalog } from '../ingredients';
import type { RecipeList } from '../../../types/Recipe';
import { getRecipeRequirementsArray } from '../../../types/Recipe';

describe('Recipe Catalog', () => {
  it('exports a valid RecipeList array', () => {
    const list: RecipeList = recipes;
    expect(Array.isArray(list)).toBe(true);
    expect(list.length).toBeGreaterThanOrEqual(2);
  });

  it('contains concebolla and clasica recipes', () => {
    const ids = recipes.map((r) => r.id);
    expect(ids).toContain('concebolla');
    expect(ids).toContain('clasica');
  });

  it('validates that every recipe has required properties', () => {
    recipes.forEach((recipe) => {
      expect(recipe.id).toBeTruthy();
      expect(recipe.name).toBeTruthy();
      const requirements = getRecipeRequirementsArray(recipe);
      expect(Array.isArray(requirements)).toBe(true);
      expect(requirements.length).toBeGreaterThan(0);
    });
  });

  it('ensures all recipe requirements refer to valid catalog entities', () => {
    const catalogIds = ingredientCatalog.map((i) => i.id);

    recipes.forEach((recipe) => {
      const requirements = getRecipeRequirementsArray(recipe);
      requirements.forEach((req) => {
        expect(req.id).toBeTruthy();
        expect(req.entityId).toBeTruthy();
        expect(catalogIds).toContain(req.entityId);
        expect(req.amount).toBeGreaterThan(0);
        expect(req.unit).toBeTruthy();
      });
    });
  });

  it('distinguishes concebolla (with onion) and clasica (without onion)', () => {
    const concebollaOnion = getRecipeRequirementsArray(concebollaRecipe).find((i) => i.entityId === 'onion');
    const clasicaOnion = getRecipeRequirementsArray(clasicaRecipe).find((i) => i.entityId === 'onion');

    expect(concebollaOnion).toBeDefined();
    expect(clasicaOnion).toBeUndefined();
  });
});
`````

## File: src/engine/containerRules.ts
`````typescript
/**
 * FILE: containerRules.ts
 *
 * PURPOSE:
 * Generic container behavior rules.
 *
 * RESPONSIBILITY:
 * - Defines reusable rules for lists/containers.
 * - Determines allowed contents and constraints.
 *
 * DOMAIN:
 * Game engine logic independent from React.
 */

import type { Container, Entity } from '../types/world';

export interface ValidationResult {
  allowed: boolean;
  reason?: string;
}

export function getIngredientCatalogId(entity: Entity): string {
  if (entity.ingredientId) return entity.ingredientId;
  return entity.id.split('_')[0];
}

export function validateContainerRules(
  container: Container,
  entity: Entity,
  currentEntitiesInContainer: Entity[]
): ValidationResult {
  const rules = container.rules;

  // 1. Ingredient Uniqueness Check (Rule 6: A container cannot contain two identical ingredients)
  if (entity.type === 'ingredient') {
    const targetIngredientId = getIngredientCatalogId(entity);
    const hasDuplicateIngredient = currentEntitiesInContainer.some(
      (e) => e.type === 'ingredient' && getIngredientCatalogId(e) === targetIngredientId
    );
    if (hasDuplicateIngredient) {
      return {
        allowed: false,
        reason: `Container '${container.name}' already contains ingredient '${targetIngredientId}'.`,
      };
    }
  }

  if (!rules) {
    return { allowed: true };
  }

  // 2. Capacity Check
  if (
    rules.maxCapacity !== undefined &&
    container.entityIds.length >= rules.maxCapacity
  ) {
    return {
      allowed: false,
      reason: `Container '${container.name}' capacity reached (${rules.maxCapacity} items max).`,
    };
  }

  // 3. Allowed Types Check
  if (rules.allowedTypes && !rules.allowedTypes.includes(entity.type)) {
    return {
      allowed: false,
      reason: `Container '${container.name}' does not accept entity type '${entity.type}'.`,
    };
  }

  // 4. Unique Types Check
  if (rules.uniqueTypesOnly) {
    const hasTypeAlready = currentEntitiesInContainer.some(
      (e) => e.type === entity.type
    );
    if (hasTypeAlready) {
      return {
        allowed: false,
        reason: `Container '${container.name}' already contains an entity of type '${entity.type}'.`,
      };
    }
  }

  // 5. Custom Validator Check
  if (rules.customValidator) {
    const passesCustom = rules.customValidator(
      container,
      entity,
      currentEntitiesInContainer
    );
    if (!passesCustom) {
      return {
        allowed: false,
        reason: `Entity '${entity.name}' failed custom container rules for '${container.name}'.`,
      };
    }
  }

  return { allowed: true };
}
`````

## File: src/store/slices/entitySlice.ts
`````typescript
/**
 * FILE: entitySlice.ts
 *
 * PURPOSE:
 * Zustand slice for entity management (ingredients, tools, mascot entities).
 *
 * RESPONSIBILITY:
 * - Mutates entity records in world state.
 * - Handles adding, removing, updating, preparing, and cooking entities.
 */

import type { StateCreator } from 'zustand/vanilla';
import type { Entity } from '../../types/world';
import type { PreparationStyle, CookingMethod } from '../../types/RecipeStep';
import type { WorldStateStore } from '../types';
import { validateContainerRules } from '../../engine/containerRules';
import {
  derivePreparationStatus,
  deriveCookingStatus,
  formatPreparedName,
  formatCookedName,
} from '../../engine/ingredientState';

export interface EntitySlice {
  entities: Record<string, Entity>;
  addEntity: (
    entity: { id: string; name: string; type: Entity['type']; state?: Record<string, unknown> },
    containerId: string
  ) => void;
  removeEntity: (entityId: string) => void;
  updateEntityState: (entityId: string, changes: Record<string, unknown>) => void;
  prepareIngredient: (entityId: string, preparation: PreparationStyle) => void;
  cookIngredient: (entityId: string, cooking: CookingMethod) => void;
  useIngredient: (entityId: string, usedIn?: string) => void;
  revertIngredientUsage: (entityId: string, previousContainerId?: string) => void;
  consumeIngredient: (entityId: string, consumedBy?: string) => void;
}

export const createEntitySlice: StateCreator<
  WorldStateStore,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  EntitySlice
> = (set, get) => ({
  entities: {},

  addEntity: (entity, containerId) => {
    const targetContainer = get().containers[containerId];
    if (!targetContainer) return;

    const currentEntities = targetContainer.entityIds
      .map((id) => get().entities[id])
      .filter((e): e is Entity => Boolean(e));

    const result = validateContainerRules(
      targetContainer,
      entity as Entity,
      currentEntities
    );
    if (!result.allowed) return;

    set(
      (state) => {
        state.entities[entity.id] = entity as Entity;
        state.containers[containerId].entityIds.push(entity.id);
      },
      false,
      'ADD_ENTITY'
    );
  },

  removeEntity: (entityId) => {
    set(
      (state) => {
        delete state.entities[entityId];
        for (const cId in state.containers) {
          state.containers[cId].entityIds = state.containers[cId].entityIds.filter(
            (id) => id !== entityId
          );
        }
      },
      false,
      'REMOVE_ENTITY'
    );
  },

  updateEntityState: (entityId, changes) => {
    set(
      (state) => {
        const targetEntity = state.entities[entityId];
        if (!targetEntity) return;

        targetEntity.state = {
          ...targetEntity.state,
          ...changes,
        };
      },
      false,
      'UPDATE_ENTITY_STATE'
    );
  },

  prepareIngredient: (entityId, preparation) => {
    const targetEntity = get().entities[entityId];
    if (!targetEntity) return;

    const status = derivePreparationStatus(targetEntity, preparation);
    const updatedName = formatPreparedName(targetEntity, preparation);

    set(
      (state) => {
        const entity = state.entities[entityId];
        if (!entity) return;

        entity.name = updatedName;
        entity.state = {
          ...entity.state,
          preparation,
          status,
        };
      },
      false,
      'PREPARE_INGREDIENT'
    );
  },

  cookIngredient: (entityId, cooking) => {
    const targetEntity = get().entities[entityId];
    if (!targetEntity) return;

    const status = deriveCookingStatus(targetEntity, cooking);
    const updatedName = formatCookedName(targetEntity, cooking);

    set(
      (state) => {
        const entity = state.entities[entityId];
        if (!entity) return;

        entity.name = updatedName;
        entity.state = {
          ...entity.state,
          cooking,
          status,
        };
      },
      false,
      'COOK_INGREDIENT'
    );
  },

  useIngredient: (entityId, usedIn) => {
    const state = get();
    const entity = state.entities[entityId];
    if (!entity) return;

    let previousContainerId: string | undefined;
    for (const cId in state.containers) {
      if (state.containers[cId].entityIds.includes(entityId)) {
        previousContainerId = cId;
        break;
      }
    }

    set(
      (draft) => {
        const targetEntity = draft.entities[entityId];
        if (!targetEntity) return;

        // Remove from current container(s)
        for (const cId in draft.containers) {
          draft.containers[cId].entityIds = draft.containers[cId].entityIds.filter(
            (id) => id !== entityId
          );
        }

        // If usedIn matches an existing container ID, add to that container
        if (usedIn && draft.containers[usedIn]) {
          draft.containers[usedIn].entityIds.push(entityId);
        }

        // Mark consumed and update entity state
        targetEntity.state = {
          ...targetEntity.state,
          consumed: true,
          consumedBy: usedIn,
          previousContainerId: previousContainerId || (targetEntity.state?.previousContainerId as string | undefined),
          status: 'consumed',
        };
      },
      false,
      'USE_INGREDIENT'
    );

    // Emit domain event
    get().emitEvent({
      type: 'INGREDIENT_CONSUMED',
      payload: {
        entityId,
        consumedBy: usedIn,
      },
    });
  },

  revertIngredientUsage: (entityId, previousContainerId) => {
    set(
      (draft) => {
        const targetEntity = draft.entities[entityId];
        if (!targetEntity) return;

        const targetContainerId =
          previousContainerId || (targetEntity.state?.previousContainerId as string | undefined);

        // Remove from current containers
        for (const cId in draft.containers) {
          draft.containers[cId].entityIds = draft.containers[cId].entityIds.filter(
            (id) => id !== entityId
          );
        }

        // Restore to previous container if valid
        if (targetContainerId && draft.containers[targetContainerId]) {
          draft.containers[targetContainerId].entityIds.push(entityId);
        }

        // Revert consumed state
        if (targetEntity.state) {
          delete targetEntity.state.consumed;
          delete targetEntity.state.consumedBy;
          delete targetEntity.state.previousContainerId;
          if (targetEntity.state.status === 'consumed') {
            delete targetEntity.state.status;
          }
        }
      },
      false,
      'REVERT_INGREDIENT_USAGE'
    );
  },

  consumeIngredient: (entityId, consumedBy) => {
    get().useIngredient(entityId, consumedBy);
  },
});
`````

## File: src/store/types.ts
`````typescript
/**
 * FILE: types.ts
 *
 * PURPOSE:
 * Type contract for Zustand world store and its slices.
 */

import type { Container, Entity, WorldAction, WorldEvent } from '../types/world';
import type { EntitySlice } from './slices/entitySlice';
import type { ContainerSlice } from './slices/containerSlice';
import type { MascotSlice } from './slices/mascotSlice';
import type { RecordSlice } from './slices/recordSlice';

export type WorldStateStore = {
  entities: Record<string, Entity>;
  containers: Record<string, Container>;
  events: WorldEvent[];
  dispatch: (action: WorldAction) => void;
  emitEvent: (event: WorldEvent) => void;
  onEvent: (listener: (event: WorldEvent) => void) => () => void;
  resetWorld: () => void;
} & EntitySlice &
  ContainerSlice &
  MascotSlice &
  RecordSlice;
`````

## File: src/systems/recipeRunner/handlers/mixHandlers.ts
`````typescript
/**
 * FILE: src/systems/recipeRunner/handlers/mixHandlers.ts
 *
 * PURPOSE:
 * Step handlers for combination steps ('mix', 'beat', 'combine').
 */

import { worldStore } from '../../../store/worldStore';
import { moveTortillaTo, flipTortilla } from '../../mascotActions';
import type { RecipeStep } from '../../../types/RecipeStep';
import type { RecipeRunnerContext } from '../types';

type MixStep = Extract<RecipeStep, { action: 'mix' | 'beat' | 'combine' }>;

export async function handleMixStep(
  ctx: RecipeRunnerContext,
  step: MixStep,
  workstationDefaultContainerId?: string
): Promise<void> {
  const targetContainerId = step.targetContainerId || workstationDefaultContainerId || 'bowl';
  const inputKeys = step.inputs || step.ingredients || [];
  const inputEntityIds: string[] = [];

  // 1. Resolve each input entity ID from RecipeContext and ensure it is moved to target container
  for (const rawInput of inputKeys) {
    const inputEntityId = ctx.getBoundEntityId(rawInput);
    if (!inputEntityId) {
      throw new Error(`[RecipeRunner] Cannot mix: No bound entity found for input "${rawInput}"`);
    }

    const realEntityId = await ctx.ensureEntityInWorkspace(inputEntityId, targetContainerId);
    inputEntityIds.push(realEntityId);
  }

  // Format descriptive speech message for mascot speech bubble and Zustand store state
  const formattedInputs = inputKeys.map((key) => {
    const boundId = ctx.getBoundEntityId(key);
    const entity = boundId ? worldStore.getState().entities[boundId] : undefined;

    const parts: string[] = [];
    if (entity?.state) {
      const cooking = entity.state.cooking as string | undefined;
      if (cooking && cooking !== 'raw') {
        if (cooking === 'fry' || cooking === 'fried' || cooking === 'cooked') {
          parts.push('cooked');
        } else {
          parts.push(cooking);
        }
      }
      const prep = entity.state.preparation as string | undefined;
      if (prep && prep !== 'whole' && prep !== 'raw') {
        parts.push(prep);
      }
    }

    if (parts.length === 0) {
      if (key === 'potatoes') {
        parts.push('cooked', 'sliced');
      } else if (key === 'eggs') {
        parts.push('beaten');
      } else if (key === 'onions') {
        parts.push('cooked', 'diced');
      }
    }

    parts.push(key);
    return parts.join(' ');
  });

  const containerName =
    targetContainerId === 'bowl' || targetContainerId === 'preparation_bowl'
      ? 'preparation bowl'
      : targetContainerId.replace('_', ' ');
  const mixMessage = `Mix ${formattedInputs.join(', ')} in the ${containerName} -> ${step.output || 'mixture'}`;

  worldStore.getState().dispatch({
    type: 'UPDATE_ENTITY_STATE',
    payload: {
      entityId: ctx.mascotId,
      changes: { speechMessage: mixMessage },
    },
  });

  moveTortillaTo(targetContainerId, ctx.mascotId);
  await ctx.wait();
  flipTortilla(ctx.mascotId);
  await ctx.wait();

  // Wait for a moment while mixing before creating the mixture
  await ctx.wait();

  // 2. Create real mixture entity in target container
  const recipeId = ctx.recipeContext.recipeId || 'recipe';
  const mixtureId = `mixture_${recipeId}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  const outputName = step.output || 'Mixture';

  worldStore.getState().dispatch({
    type: 'ADD_ENTITY',
    payload: {
      entity: {
        id: mixtureId,
        name: outputName,
        type: 'ingredient',
        state: {
          preparation: 'mixed',
          cooking: 'raw',
          status: 'mixed',
          components: inputEntityIds,
        },
      },
      containerId: targetContainerId,
    },
  });

  // 3. Use inputs
  for (const inputId of inputEntityIds) {
    worldStore.getState().dispatch({
      type: 'USE_INGREDIENT',
      payload: {
        entityId: inputId,
        usedIn: mixtureId,
      },
    });
  }

  // 4. Bind mixture entity in RecipeContext
  ctx.recipeContext.bindings['mixture'] = mixtureId;
  if (step.output) {
    ctx.recipeContext.bindings[step.output] = mixtureId;
  }
}
`````

## File: src/systems/recipeRunner/handlers/moveHandlers.ts
`````typescript
/**
 * FILE: src/systems/recipeRunner/handlers/moveHandlers.ts
 *
 * PURPOSE:
 * Step handlers for item relocation steps ('move', 'grab', 'drop').
 */

import { worldStore } from '../../../store/worldStore';
import { moveTortillaTo, grabIngredient, dropIngredient } from '../../mascotActions';
import type { RecipeStep } from '../../../types/RecipeStep';
import type { RecipeRunnerContext } from '../types';

type MoveStep = Extract<RecipeStep, { action: 'move' }>;
type GrabStep = Extract<RecipeStep, { action: 'grab' }>;
type DropStep = Extract<RecipeStep, { action: 'drop' }>;

export async function handleMoveStep(
  ctx: RecipeRunnerContext,
  step: MoveStep,
  workstationDefaultContainerId?: string
): Promise<void> {
  const source = step.source || ctx.defaultSourceId;
  const target = step.target || workstationDefaultContainerId || ctx.defaultTargetId;
  const rawKey = step.ingredient || step.target;


  const entityId = ctx.getBoundEntityId(rawKey);

  if (!entityId) {
    return;
  }

  ctx.validateEntity(entityId, 'move');

  const state = worldStore.getState();
  const targetContainer = state.containers[target];


  if (targetContainer && targetContainer.entityIds.includes(entityId)) {
    return; // Skip move if entity is already in target container
  }

  // 1. Move mascot gaze to source container
  moveTortillaTo(source, ctx.mascotId);
  await ctx.wait();

  // 2. Grab ingredient from source container
  grabIngredient(entityId, source, ctx.mascotId);
  await ctx.wait();

  // 3. Move mascot gaze to target container
  moveTortillaTo(target, ctx.mascotId);
  await ctx.wait();

  // 4. Drop ingredient into target container
  dropIngredient(target, undefined, ctx.mascotId);
  await ctx.wait();

  // Check if drop created a copy entity (from immutable storage)
  const newState = worldStore.getState();
  const newTargetContainer = newState.containers[target];
  if (newTargetContainer && !newTargetContainer.entityIds.includes(entityId)) {
    const copiedId = newTargetContainer.entityIds[newTargetContainer.entityIds.length - 1];
    if (copiedId) {
      ctx.updateBindingIfCopied(entityId, copiedId, rawKey);
    }
  }
}

export async function handleGrabStep(
  ctx: RecipeRunnerContext,
  step: GrabStep
): Promise<void> {
  const source = step.source || ctx.defaultSourceId;
  const entityId = ctx.getBoundEntityId(step.ingredient) || step.ingredient;

  if (entityId) {
    ctx.validateEntity(entityId, 'grab');
  }

  moveTortillaTo(source, ctx.mascotId);
  await ctx.wait();

  if (entityId) {
    grabIngredient(entityId, source, ctx.mascotId);
    await ctx.wait();
  }
}

export async function handleDropStep(
  ctx: RecipeRunnerContext,
  step: DropStep,
  workstationDefaultContainerId?: string
): Promise<void> {
  const target = step.target || workstationDefaultContainerId || ctx.defaultTargetId;
  moveTortillaTo(target, ctx.mascotId);
  await ctx.wait();

  dropIngredient(target, step.positionIndex, ctx.mascotId);
  await ctx.wait();
}
`````

## File: src/systems/recipeRunner/RecipeRunner.ts
`````typescript
/**
 * FILE: src/systems/recipeRunner/RecipeRunner.ts
 *
 * PURPOSE:
 * Workstation and tool-driven recipe execution engine (RecipeRunner).
 *
 * RESPONSIBILITY:
 * - Iterates over declarative RecipeSteps sequentially.
 * - Dynamically determines required workstation and tools for each step.
 * - Dispatches appropriate world and mascot actions via step handlers.
 * - Modifies existing entity state for preparation/cooking without destroying/recreating entities.
 * - Preserves data-driven architecture and keeps recipes decoupled from kitchen locations.
 */

import { worldStore } from '../../store/worldStore';
import { getIngredientCatalogId } from '../../engine/containerRules';
import { findWorkstationForStep } from '../../engine/workstations';
import type { Recipe, RecipeRequirementDictItem } from '../../types/Recipe';
import type { RecipeStep } from '../../types/RecipeStep';
import type { Entity } from '../../types/world';
import type { RecipeRunnerOptions, RecipeRunnerContext, RecipeContextData } from './types';
import { handleMoveStep, handleGrabStep, handleDropStep } from './handlers/moveHandlers';
import { handlePrepStep } from './handlers/prepHandlers';
import { handleCookStep, handleFlipStep } from './handlers/cookHandlers';
import { handleMixStep } from './handlers/mixHandlers';
import {
  handleServeStep,
  handleWaitStep,
  handleInstructionStep,
  handleSpeakStep,
  handleCelebrateStep,
} from './handlers/utilityHandlers';

export class RecipeRunner implements RecipeRunnerContext {
  public mascotId: string;
  public defaultSourceId: string;
  public defaultTargetId: string;
  public delayMs: number;
  public currentRecipe?: Recipe;
  public recipeContext: RecipeContextData;

  constructor(options: RecipeRunnerOptions = {}) {
    this.mascotId = options.mascotId || 'chef';
    this.defaultSourceId = options.defaultSourceId || 'despensa';
    this.defaultTargetId = options.defaultTargetId || 'board';
    this.delayMs = options.delayMs ?? 600;
    this.recipeContext = {
      recipeId: '',
      bindings: {},
    };
  }

  public async wait(ms?: number): Promise<void> {
    const duration = ms ?? this.delayMs;
    if (duration <= 0) return;
    await new Promise((resolve) => setTimeout(resolve, duration));
  }

  public bindRecipeContext(recipe: Recipe): void {
    this.currentRecipe = recipe;
    this.recipeContext = {
      recipeId: recipe.id,
      bindings: {},
    };

    const boundIds = new Set<string>();

    const findOrCreateAvailableEntity = (
      ingredientCatalogId: string,
      aliasKey?: string
    ): string => {
      const state = worldStore.getState();
      const allEntities = Object.values(state.entities);

      // 1. Check for unconsumed, unbound entity in active workspace containers
      const activeWorkspaceContainerIds = Object.values(state.containers)
        .filter((c) => c.type !== 'storage' && c.id !== 'despensa')
        .map((c) => c.id);

      for (const cId of activeWorkspaceContainerIds) {
        const container = state.containers[cId];
        if (container) {
          const workspaceCandidate = container.entityIds
            .map((id) => state.entities[id])
            .find((e) => {
              if (!e || e.type !== 'ingredient' || e.state?.consumed || boundIds.has(e.id)) {
                return false;
              }
              const catId = getIngredientCatalogId(e);
              return (
                catId === ingredientCatalogId ||
                e.ingredientId === ingredientCatalogId ||
                e.id === ingredientCatalogId ||
                (aliasKey && e.id === aliasKey)
              );
            });
          if (workspaceCandidate) {
            boundIds.add(workspaceCandidate.id);
            return workspaceCandidate.id;
          }
        }
      }

      // 2. Check for unconsumed, unbound entity anywhere in world
      const unboundCandidate = allEntities.find((e) => {
        if (!e || e.type !== 'ingredient' || e.state?.consumed || boundIds.has(e.id)) {
          return false;
        }
        const catId = getIngredientCatalogId(e);
        return (
          catId === ingredientCatalogId ||
          e.ingredientId === ingredientCatalogId ||
          e.id === ingredientCatalogId ||
          (aliasKey && e.id === aliasKey)
        );
      });

      if (unboundCandidate) {
        boundIds.add(unboundCandidate.id);
        return unboundCandidate.id;
      }

      // 3. If no unbound entity exists, check for template entity in immutable storage (e.g. despensa)
      const immutableCandidate = allEntities.find((e) => {
        if (!e || e.type !== 'ingredient' || e.state?.consumed) return false;
        const catId = getIngredientCatalogId(e);
        return (
          catId === ingredientCatalogId ||
          e.ingredientId === ingredientCatalogId ||
          e.id === ingredientCatalogId ||
          (aliasKey && e.id === aliasKey)
        );
      });

      if (immutableCandidate) {
        return immutableCandidate.id;
      }

      // 4. Fallback: spawn new ingredient entity in despensa or board
      const newEntityId = `${ingredientCatalogId}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      const newEntity: Entity = {
        id: newEntityId,
        name: ingredientCatalogId.charAt(0).toUpperCase() + ingredientCatalogId.slice(1),
        type: 'ingredient',
        ingredientId: ingredientCatalogId,
        state: { preparation: 'whole', cooking: 'raw' },
      };

      const targetContainerId = state.containers[this.defaultSourceId] ? this.defaultSourceId : 'board';
      worldStore.getState().dispatch({
        type: 'ADD_ENTITY',
        payload: {
          entity: newEntity,
          containerId: targetContainerId,
        },
      });

      boundIds.add(newEntityId);
      return newEntityId;
    };

    const reqs = recipe.requirements || (recipe as unknown as { ingredients?: unknown }).ingredients;

    if (Array.isArray(reqs)) {
      for (const item of reqs) {
        const rawItem = item as { entityId?: string; ingredientId?: string; id?: string };
        const entityIdKey = rawItem.entityId || rawItem.ingredientId || '';
        const entityId = findOrCreateAvailableEntity(entityIdKey, rawItem.id);
        this.recipeContext.bindings[entityIdKey] = entityId;
        if (rawItem.id) {
          this.recipeContext.bindings[rawItem.id] = entityId;
        }
      }
    } else if (reqs && typeof reqs === 'object') {
      for (const [key, item] of Object.entries(
        reqs as Record<string, RecipeRequirementDictItem>
      )) {
        const rawItem = item as { entityId?: string; ingredientId?: string };
        const entityIdKey = rawItem.entityId || rawItem.ingredientId || key;
        const entityId = findOrCreateAvailableEntity(entityIdKey, key);
        this.recipeContext.bindings[key] = entityId;
        this.recipeContext.bindings[entityIdKey] = entityId;
      }
    }

    this.bindStepsContext(recipe.steps, boundIds);
  }

  private bindStepsContext(steps: RecipeStep[], boundIds: Set<string>): void {
    const state = worldStore.getState();

    for (const step of steps) {
      if (step.action === 'mix' || step.action === 'beat' || step.action === 'combine') {
        const inputs = step.inputs || step.ingredients || [];
        for (const inputKey of inputs) {
          if (!this.recipeContext.bindings[inputKey]) {
            const catId = this.resolveIngredientId(inputKey) || inputKey;
            const candidate = Object.values(state.entities).find(
              (e) =>
                e &&
                e.type === 'ingredient' &&
                !e.state?.consumed &&
                !boundIds.has(e.id) &&
                (getIngredientCatalogId(e) === catId || e.ingredientId === catId || e.id === inputKey)
            );
            if (candidate) {
              this.recipeContext.bindings[inputKey] = candidate.id;
              this.recipeContext.bindings[catId] = candidate.id;
              boundIds.add(candidate.id);
            }
          }
        }
      } else if ('ingredient' in step || 'target' in step) {
        const rawKey =
          ('ingredient' in step ? step.ingredient : undefined) ||
          ('target' in step ? step.target : undefined);
        if (rawKey && rawKey !== 'mixture' && !this.recipeContext.bindings[rawKey]) {
          const catId = this.resolveIngredientId(rawKey) || rawKey;
          const candidate = Object.values(state.entities).find(
            (e) =>
              e &&
              e.type === 'ingredient' &&
              !e.state?.consumed &&
              !boundIds.has(e.id) &&
              (getIngredientCatalogId(e) === catId || e.ingredientId === catId || e.id === rawKey)
          );
          if (candidate) {
            this.recipeContext.bindings[rawKey] = candidate.id;
            this.recipeContext.bindings[catId] = candidate.id;
            boundIds.add(candidate.id);
          }
        }
      }
    }
  }

  public getBoundEntityId(targetOrKey?: string): string | undefined {
    if (!targetOrKey) return undefined;
    if (this.recipeContext.bindings[targetOrKey]) {
      return this.recipeContext.bindings[targetOrKey];
    }
    const resolvedCatId = this.resolveIngredientId(targetOrKey);
    if (resolvedCatId && this.recipeContext.bindings[resolvedCatId]) {
      return this.recipeContext.bindings[resolvedCatId];
    }
    const state = worldStore.getState();
    if (state.entities[targetOrKey]) {
      return targetOrKey;
    }
    return undefined;
  }

  public validateEntity(entityId: string, stepAction: string = 'step'): Entity {
    const state = worldStore.getState();
    const entity = state.entities[entityId];
    if (!entity) {
      throw new Error(
        `[RecipeRunner] Validation failed for ${stepAction}: Entity "${entityId}" does not exist in world state.`
      );
    }
    if (entity.state?.consumed) {
      throw new Error(
        `[RecipeRunner] Validation failed for ${stepAction}: Entity "${entityId}" (${entity.name}) has already been consumed.`
      );
    }
    return entity;
  }

  public updateBindingIfCopied(
    oldEntityId: string,
    newEntityId: string,
    specificKey?: string
  ): void {
    if (oldEntityId === newEntityId) return;
    if (specificKey && this.recipeContext.bindings[specificKey] === oldEntityId) {
      this.recipeContext.bindings[specificKey] = newEntityId;
    } else {
      for (const key in this.recipeContext.bindings) {
        if (this.recipeContext.bindings[key] === oldEntityId) {
          this.recipeContext.bindings[key] = newEntityId;
        }
      }
    }
  }

  public async ensureEntityInWorkspace(
    entityId: string,
    targetContainerId: string = this.defaultTargetId
  ): Promise<string> {
    const state = worldStore.getState();
    this.validateEntity(entityId, 'ensureEntityInWorkspace');

    const targetContainer = state.containers[targetContainerId];
    if (targetContainer && targetContainer.entityIds.includes(entityId)) {
      return entityId;
    }

    const mascot = state.entities[this.mascotId];
    if (mascot?.state?.holdingEntityId === entityId) {
      return entityId;
    }

    let currentContainerId = this.defaultSourceId;
    for (const container of Object.values(state.containers)) {
      if (container.entityIds.includes(entityId)) {
        currentContainerId = container.id;
        break;
      }
    }

    await handleMoveStep(
      this,
      {
        action: 'move',
        ingredient: entityId,
        source: currentContainerId,
        target: targetContainerId,
      },
      targetContainerId
    );

    const updatedState = worldStore.getState();
    const updatedTargetContainer = updatedState.containers[targetContainerId];
    if (updatedTargetContainer) {
      if (updatedTargetContainer.entityIds.includes(entityId)) {
        return entityId;
      }
      const copyId = updatedTargetContainer.entityIds[updatedTargetContainer.entityIds.length - 1];
      if (copyId) {
        this.updateBindingIfCopied(entityId, copyId);
        return copyId;
      }
    }
    return entityId;
  }

  public resolveIngredientId(targetOrKey?: string): string | undefined {
    if (!targetOrKey) return undefined;
    const reqs = this.currentRecipe?.requirements || (this.currentRecipe as unknown as { ingredients?: unknown })?.ingredients;
    if (reqs && !Array.isArray(reqs)) {
      const dict = reqs as Record<string, { entityId?: string; ingredientId?: string }>;
      if (dict[targetOrKey]) {
        return dict[targetOrKey].entityId || dict[targetOrKey].ingredientId;
      }
      const match = Object.values(dict).find(
        (item) => (item.entityId || item.ingredientId) === targetOrKey
      );
      if (match) {
        return match.entityId || match.ingredientId;
      }
    }
    return targetOrKey;
  }

  public async ensureIngredientInWorkspace(
    ingredientCatalogId: string,
    targetContainerId: string = this.defaultTargetId
  ): Promise<string | undefined> {
    const boundId = this.getBoundEntityId(ingredientCatalogId);
    if (boundId) {
      return this.ensureEntityInWorkspace(boundId, targetContainerId);
    }
    return undefined;
  }

  public async runRecipe(recipe: Recipe): Promise<void> {
    this.bindRecipeContext(recipe);
    await this.runSteps(recipe.steps);
  }

  public async runSteps(steps: RecipeStep[]): Promise<void> {
    if (!this.recipeContext.recipeId) {
      this.recipeContext.recipeId = 'steps_run';
      this.bindStepsContext(steps, new Set<string>());
    }
    for (const step of steps) {
      await this.executeStep(step);
    }
  }

  public async executeStep(step: RecipeStep): Promise<void> {
    const workstation = findWorkstationForStep(step);

    switch (step.action) {
      case 'move':
        return handleMoveStep(this, step, workstation.defaultContainerId);
      case 'grab':
        return handleGrabStep(this, step);
      case 'drop':
        return handleDropStep(this, step, workstation.defaultContainerId);

      case 'cut':
      case 'prepare':
      case 'peel':
      case 'wash':
      case 'rinse':
      case 'drain':
        return handlePrepStep(this, step, workstation.defaultContainerId);

      case 'cook':
        return handleCookStep(this, step, workstation.defaultContainerId);
      case 'flip':
        return handleFlipStep(this, step);

      case 'mix':
      case 'beat':
      case 'combine':
        return handleMixStep(this, step, workstation.defaultContainerId);

      case 'serve':
        return handleServeStep(this, step, workstation.defaultContainerId);

      case 'wait':
        return handleWaitStep(this, step);
      case 'instruction':
        return handleInstructionStep(this, step);
      case 'speak':
        return handleSpeakStep(this, step);
      case 'celebrate':
        return handleCelebrateStep(this, step);
    }
  }
}
`````

## File: src/systems/recipeRunner.ts
`````typescript
/**
 * FILE: src/systems/recipeRunner.ts
 *
 * PURPOSE:
 * Public entry point for RecipeRunner module.
 * Re-exports RecipeRunner class and related options/types.
 */

export { RecipeRunner } from './recipeRunner/RecipeRunner';
export type { RecipeRunnerOptions, RecipeRunnerContext } from './recipeRunner/types';
`````

## File: src/types/IngredientList.ts
`````typescript
/**
 * FILE: IngredientList.ts
 *
 * PURPOSE:
 * Defines container/list data structures.
 *
 * RESPONSIBILITY:
 * - Represents collections of entities.
 */

import type { Ingredient } from './Ingredient'

export interface IngredientList {
  id: string
  name: string
  ingredients: Ingredient[]
}

export interface List {
  id: string
  title: string
  seedFromCatalog?: boolean
  seedIngredients?: string[]
  consumesOnDrag?: boolean   // true = item is removed from this list when dragged out
}
`````

## File: src/components/Scene/RecipePlayer.tsx
`````typescript
/**
 * FILE: RecipePlayer.tsx
 *
 * PURPOSE:
 * Interactive recipe playback and step navigation control component.
 *
 * RESPONSIBILITY:
 * - Provides play/pause, slow, fast, step up (forward), and step down (backward) controls.
 * - Displays active recipe progress, current step index, and human-readable step description.
 * - Manages automated execution using RecipeRunner engine.
 * - Supports instant step navigation and timeline jumping while maintaining simulation world state.
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useStore } from 'zustand';
import { recipes } from '../../data/catalog/recipes';
import { ingredients } from '../../data/catalog/ingredients';
import { catalogTools as tools } from '../../data/catalog/tools';
import { RecipeRunner } from '../../systems/recipeRunner';
import { worldStore } from '../../store/worldStore';
import type { RecipeStep } from '../../types/RecipeStep';
import type { Recipe } from '../../types/Recipe';
import type { WorldAction } from '../../types/actions';
import type { RecordedAction } from '../../types/recording';
import { getRecipeRequirementsArray } from '../../types/Recipe';
import { RecipeRequirements } from '../Recipe/RecipeRequirements';
import { ActionReplayer } from '../Controls/ActionReplayer';
import './RecipePlayer.scss';

// Speed options and corresponding delays in ms
const SPEED_DELAYS: Record<number, number> = {
  0.5: 1200, // Slow
  1: 600,    // Normal
  2: 300,    // Fast
  3: 150,    // Turbo
};

/**
 * Generates human-readable step details for a recorded WorldAction.
 */
function getActionDetails(recordedAction?: RecordedAction | WorldAction): {
  icon: string;
  text: string;
  actionName: string;
} {
  if (!recordedAction) {
    return {
      icon: '🎥',
      text: 'Recording mode active. Perform kitchen actions or press Play / Step Up to replay recorded actions.',
      actionName: 'Recording Mode',
    };
  }

  const { type, payload } = recordedAction as { type: string; payload?: Record<string, unknown> };
  const p = payload || {};

  const formatName = (id?: unknown) => {
    if (typeof id !== 'string' || !id) return '';
    return id
      .replace(/_\d+$/, '')
      .replace(/_/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .trim();
  };

  switch (type) {
    case 'MOVE_ENTITY': {
      const entity = formatName(p.entityId);
      const target = formatName(p.targetContainerId);
      return {
        icon: '🚚',
        actionName: 'Move Entity',
        text: `Move ${entity || 'item'} to ${target || 'container'}`,
      };
    }
    case 'ADD_ENTITY': {
      const entityObj = p.entity as { name?: string; id?: string } | undefined;
      const entity = entityObj?.name || formatName(entityObj?.id);
      const target = formatName(p.containerId);
      return {
        icon: '➕',
        actionName: 'Add Entity',
        text: `Add ${entity || 'item'} into ${target || 'container'}`,
      };
    }
    case 'REMOVE_ENTITY': {
      const entity = formatName(p.entityId);
      return {
        icon: '🗑️',
        actionName: 'Remove Entity',
        text: `Remove ${entity || 'item'} from container`,
      };
    }
    case 'TOGGLE_BURNER': {
      const container = formatName(p.containerId);
      return {
        icon: '🔥',
        actionName: 'Toggle Heat',
        text: `Toggle heat on ${container || 'burner'}`,
      };
    }
    case 'PREPARE_INGREDIENT': {
      const entity = formatName(p.entityId);
      return {
        icon: '🔪',
        actionName: 'Prepare',
        text: `Prepare ${entity || 'ingredient'} (${p.preparation || 'prepared'})`,
      };
    }
    case 'COOK_INGREDIENT': {
      const entity = formatName(p.entityId);
      return {
        icon: '🍳',
        actionName: 'Cook',
        text: `Cook ${entity || 'ingredient'} (${p.cooking || 'cooked'})`,
      };
    }
    case 'USE_INGREDIENT': {
      const entity = formatName(p.entityId);
      return {
        icon: '🥣',
        actionName: 'Use Ingredient',
        text: `Use ${entity || 'ingredient'} in recipe`,
      };
    }
    case 'UPDATE_ENTITY_STATE': {
      const entity = formatName(p.entityId);
      const changesObj = (p.changes as Record<string, unknown>) || {};
      const keys = Object.keys(changesObj).join(', ');
      return {
        icon: '✨',
        actionName: 'Update State',
        text: `Update ${keys || 'state'} for ${entity || 'entity'}`,
      };
    }
    case 'MASCOT_MOVE': {
      return {
        icon: '🤖',
        actionName: 'Mascot Move',
        text: `Mascot moves to ${formatName(p.targetContainerId)}`,
      };
    }
    case 'MASCOT_GRAB': {
      return {
        icon: '🫳',
        actionName: 'Mascot Grab',
        text: `Mascot grabs ${formatName(p.entityId)}`,
      };
    }
    case 'MASCOT_DROP': {
      return {
        icon: '⬇️',
        actionName: 'Mascot Drop',
        text: `Mascot drops item into ${formatName(p.targetContainerId)}`,
      };
    }
    case 'MASCOT_FLIP': {
      return {
        icon: '🍳',
        actionName: 'Mascot Flip',
        text: 'Mascot performs pan flip',
      };
    }
    case 'RESET_WORLD': {
      return {
        icon: '🔄',
        actionName: 'Reset World',
        text: 'Reset world state to default initial layout',
      };
    }
    default: {
      return {
        icon: '⚡',
        actionName: type || 'Action',
        text: `Execute recorded action ${type}`,
      };
    }
  }
}

/**
 * Formats an ingredient key with its current preparation and cooking state from worldStore.
 */
function formatIngredientWithState(inputKey: string): string {
  const store = worldStore.getState();

  const singularKey =
    inputKey.endsWith('es') && inputKey.length > 3
      ? inputKey.slice(0, -2)
      : inputKey.endsWith('s') && inputKey.length > 2
      ? inputKey.slice(0, -1)
      : inputKey;

  const entity = Object.values(store.entities).find(
    (e) =>
      e &&
      (e.id === inputKey ||
        e.ingredientId === inputKey ||
        e.ingredientId === singularKey ||
        e.id.startsWith(inputKey + '_') ||
        e.id.startsWith(singularKey + '_'))
  );

  const parts: string[] = [];

  if (entity?.state) {
    // Cooking state
    const cooking = entity.state.cooking as string | undefined;
    if (cooking && cooking !== 'raw') {
      if (cooking === 'fry' || cooking === 'fried' || cooking === 'cooked') {
        parts.push('cooked');
      } else {
        parts.push(cooking);
      }
    }

    // Preparation state
    const prep = entity.state.preparation as string | undefined;
    if (prep && prep !== 'whole' && prep !== 'raw') {
      parts.push(prep);
    }
  }

  // Fallback defaults for recipe step descriptions when state is not yet populated
  if (parts.length === 0) {
    if (inputKey === 'potatoes') {
      parts.push('cooked', 'sliced');
    } else if (inputKey === 'eggs') {
      parts.push('beaten');
    } else if (inputKey === 'onions') {
      parts.push('cooked', 'diced');
    }
  }

  parts.push(inputKey);
  return parts.join(' ');
}

/**
 * Generates human-readable step details (icon, text label, badge) for a given RecipeStep.
 */
function getStepDetails(step?: RecipeStep): { icon: string; text: string; actionName: string } {
  if (!step) {
    return { icon: '✨', text: 'Select a recipe and press Play or Step Up to begin!', actionName: 'Ready' };
  }

  switch (step.action) {
    case 'move':
      return {
        icon: '🚚',
        text: `Move ${step.ingredient || 'ingredient'} from ${step.source || 'storage'} to ${step.target || 'workspace'}`,
        actionName: 'Move',
      };
    case 'grab':
      return {
        icon: '🫳',
        text: `Grab ${step.ingredient} from ${step.source || 'storage'}`,
        actionName: 'Grab',
      };
    case 'drop':
      return {
        icon: '⬇️',
        text: `Drop held ingredient into ${step.target || 'workspace'}`,
        actionName: 'Drop',
      };
    case 'cut':
    case 'prepare':
    case 'peel':
      return {
        icon: '🔪',
        text: `${step.action.toUpperCase()} ${step.ingredient || step.target || ''} (${step.preparation || step.style || 'prepared'})`,
        actionName: step.action,
      };
    case 'wash':
    case 'rinse':
    case 'drain':
      return {
        icon: '💧',
        text: `${step.action.toUpperCase()} ${step.ingredient || step.target || ''}`,
        actionName: step.action,
      };
    case 'cook':
      return {
        icon: '🍳',
        text: `Cook ${step.target || step.ingredient || ''} (${step.method || 'fry'}${step.duration ? `, ${step.duration} ${step.unit || 'min'}` : ''})`,
        actionName: 'Cook',
      };
    case 'flip':
      return {
        icon: '🍳',
        text: step.instruction || `Flip ${step.target || 'tortilla'} in the pan`,
        actionName: 'Flip',
      };
    case 'mix':
    case 'beat':
    case 'combine': {
      const formattedInputs = (step.inputs || step.ingredients || []).map(formatIngredientWithState);
      const targetContainer = step.targetContainerId;
      const containerName =
        !targetContainer || targetContainer === 'bowl' || targetContainer === 'preparation_bowl'
          ? 'preparation bowl'
          : targetContainer.replace('_', ' ');
      return {
        icon: '🥣',
        text: `Mix ${formattedInputs.join(', ')} in the ${containerName} -> ${step.output || 'mixture'}`,
        actionName: step.action,
      };
    }
    case 'serve':
      return {
        icon: '🍽️',
        text: `Serve ${step.target || 'dish'} to ${step.containerId || 'plate'}`,
        actionName: 'Serve',
      };
    case 'instruction':
      return {
        icon: '👨‍🍳',
        text: step.text || step.instruction || 'Follow recipe instruction',
        actionName: 'Instruction',
      };
    case 'speak':
      return {
        icon: '💬',
        text: `Tortilla says: "${step.message}"`,
        actionName: 'Speak',
      };
    case 'celebrate':
      return {
        icon: '🎉',
        text: 'Flip celebration! Recipe completed successfully!',
        actionName: 'Celebrate',
      };
    case 'wait':
      return {
        icon: '⏳',
        text: `Wait for ${step.durationMs || 600}ms`,
        actionName: 'Wait',
      };
    default:
      return {
        icon: '📝',
        text: 'Execute recipe step',
        actionName: 'Step',
      };
  }
}

interface RecipePlayerProps {
  renderWorkspace?: (requirementsNode: React.ReactNode) => React.ReactNode;
}

export const RecipePlayer: React.FC<RecipePlayerProps> = ({ renderWorkspace }) => {
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>(recipes[0]?.id || 'concebolla');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1); // 0.5, 1, 2, 3

  // WorldStore recording state
  const isRecording = useStore(worldStore, (state) => state.isRecording);
  const recordedActions = useStore(worldStore, (state) => state.recordedActions);
  const recordedDownloadUrl = useStore(worldStore, (state) => state.recordedDownloadUrl);
  const recordedFilename = useStore(worldStore, (state) => state.recordedFilename);
  const startRecording = useStore(worldStore, (state) => state.startRecording);
  const stopRecording = useStore(worldStore, (state) => state.stopRecording);

  const isRecordingMode = selectedRecipeId === 'recording' || isRecording;

  const activeRecipe: Recipe = useMemo(
    () => recipes.find((r) => r.id === selectedRecipeId) || recipes[0],
    [selectedRecipeId]
  );
  const steps: RecipeStep[] = useMemo(() => activeRecipe?.steps || [], [activeRecipe]);

  const totalSteps = isRecordingMode ? recordedActions.length : steps.length;

  const runnerRef = useRef<RecipeRunner | null>(null);
  const isExecutingRef = useRef<boolean>(false);

  // Get delay in ms based on active speed multiplier
  const currentDelayMs = SPEED_DELAYS[speed] || 600;

  // Details for current step / recorded action
  const stepDetails = useMemo(() => {
    if (isRecordingMode) {
      if (recordedActions.length === 0) {
        return getActionDetails(undefined);
      }
      const activeIndex =
        currentStepIndex < recordedActions.length
          ? currentStepIndex
          : recordedActions.length - 1;
      return getActionDetails(recordedActions[activeIndex]);
    } else {
      const activeStep = steps[currentStepIndex < steps.length ? currentStepIndex : steps.length - 1];
      return getStepDetails(currentStepIndex < steps.length ? activeStep : undefined);
    }
  }, [isRecordingMode, recordedActions, steps, currentStepIndex]);

  // Synchronize required materials for active recipe in despensa container
  useEffect(() => {
    if (isRecordingMode) return;
    const store = worldStore.getState();
    const reqs = getRecipeRequirementsArray(activeRecipe);
    reqs.forEach((req) => {
      const existing = store.entities[req.entityId];
      if (!existing) {
        const catalogIng = ingredients.find((i) => i.id === req.entityId);
        const catalogTool = tools.find((t: { id: string }) => t.id === req.entityId);
        store.dispatch({
          type: 'ADD_ENTITY',
          payload: {
            entity: {
              id: req.entityId,
              name: req.name || catalogIng?.name || catalogTool?.name || req.entityId,
              type: (catalogTool ? 'tool' : 'ingredient') as 'tool' | 'ingredient',
              icon: catalogIng?.icon || catalogTool?.icon,
              ingredientId: req.entityId,
              state: {},
            },
            containerId: 'despensa',
          },
        });
      }
    });
  }, [activeRecipe, isRecordingMode]);

  // Re-sync runner context or reset when recipe changes
  const handleRecipeChange = (newRecipeId: string) => {
    setIsPlaying(false);
    setSelectedRecipeId(newRecipeId);
    setCurrentStepIndex(0);
    runnerRef.current = null;
    worldStore.getState().dispatch({ type: 'RESET_WORLD' });
  };

  // Full reset of world and player step
  const handleReset = useCallback(() => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
    runnerRef.current = null;
    worldStore.getState().dispatch({ type: 'RESET_WORLD' });
  }, []);

  // Jump to a specific target step index
  const jumpToStep = useCallback(
    async (targetIndex: number) => {
      if (isExecutingRef.current) return;
      setIsPlaying(false);

      const clampedTarget = Math.min(Math.max(0, targetIndex), totalSteps);
      isExecutingRef.current = true;

      try {
        // Reset world state to initial kitchen
        worldStore.getState().dispatch({ type: 'RESET_WORLD' });

        if (isRecordingMode) {
          // Replay recorded actions up to targetIndex
          for (let i = 0; i < clampedTarget; i++) {
            const act = recordedActions[i];
            if (act) {
              worldStore.getState().dispatch(act as unknown as WorldAction);
            }
          }
          setCurrentStepIndex(clampedTarget);
        } else {
          // Fast-forward recipe runner
          const fastRunner = new RecipeRunner({
            mascotId: 'chef',
            defaultTargetId: 'board',
            delayMs: 0,
          });
          fastRunner.bindRecipeContext(activeRecipe);

          for (let i = 0; i < clampedTarget; i++) {
            await fastRunner.executeStep(steps[i]);
          }

          fastRunner.delayMs = currentDelayMs;
          runnerRef.current = fastRunner;
          setCurrentStepIndex(clampedTarget);
        }
      } catch (err) {
        console.error('[RecipePlayer] Error jumping to step:', err);
      } finally {
        isExecutingRef.current = false;
      }
    },
    [activeRecipe, totalSteps, steps, currentDelayMs, isRecordingMode, recordedActions]
  );

  // Step Up (Step forward 1 step)
  const handleStepUp = useCallback(async () => {
    if (isExecutingRef.current) return;
    setIsPlaying(false);

    if (currentStepIndex >= totalSteps) return;

    isExecutingRef.current = true;

    try {
      if (isRecordingMode) {
        const act = recordedActions[currentStepIndex];
        if (act) {
          worldStore.getState().dispatch(act as unknown as WorldAction);
        }
        setCurrentStepIndex((prev) => Math.min(prev + 1, totalSteps));
      } else {
        if (!runnerRef.current || currentStepIndex === 0) {
          if (currentStepIndex === 0) {
            worldStore.getState().dispatch({ type: 'RESET_WORLD' });
          }
          runnerRef.current = new RecipeRunner({
            mascotId: 'chef',
            defaultTargetId: 'board',
            delayMs: currentDelayMs,
          });
          runnerRef.current.bindRecipeContext(activeRecipe);
        } else {
          runnerRef.current.delayMs = currentDelayMs;
        }

        const stepToRun = steps[currentStepIndex];
        await runnerRef.current.executeStep(stepToRun);
        setCurrentStepIndex((prev) => Math.min(prev + 1, totalSteps));
      }
    } catch (err) {
      console.error('[RecipePlayer] Error stepping up:', err);
    } finally {
      isExecutingRef.current = false;
    }
  }, [currentStepIndex, totalSteps, activeRecipe, steps, currentDelayMs, isRecordingMode, recordedActions]);

  // Step Down (Step back 1 step)
  const handleStepDown = useCallback(() => {
    if (currentStepIndex <= 0) return;
    jumpToStep(currentStepIndex - 1);
  }, [currentStepIndex, jumpToStep]);

  // Toggle Play / Pause
  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      // If at end of steps, restart from beginning
      if (currentStepIndex >= totalSteps) {
        handleReset();
      }
      setIsPlaying(true);
    }
  };

  // Decrease speed (Slow button)
  const handleSlow = () => {
    if (speed === 3) setSpeed(2);
    else if (speed === 2) setSpeed(1);
    else if (speed === 1) setSpeed(0.5);
    else setSpeed(0.5);
  };

  // Increase speed (Fast button)
  const handleFast = () => {
    if (speed === 0.5) setSpeed(1);
    else if (speed === 1) setSpeed(2);
    else if (speed === 2) setSpeed(3);
    else setSpeed(3);
  };

  // Auto-play step loop effect
  useEffect(() => {
    if (!isPlaying) return;

    let isCancelled = false;

    const playNextStep = async () => {
      if (currentStepIndex >= totalSteps) {
        setIsPlaying(false);
        return;
      }

      if (isExecutingRef.current) return;
      isExecutingRef.current = true;

      try {
        if (isRecordingMode) {
          const act = recordedActions[currentStepIndex];
          if (act) {
            worldStore.getState().dispatch(act as unknown as WorldAction);
          }
          if (!isCancelled) {
            const nextIndex = currentStepIndex + 1;
            setCurrentStepIndex(nextIndex);
            if (nextIndex >= totalSteps) {
              setIsPlaying(false);
            }
          }
        } else {
          if (!runnerRef.current || currentStepIndex === 0) {
            if (currentStepIndex === 0) {
              worldStore.getState().dispatch({ type: 'RESET_WORLD' });
            }
            runnerRef.current = new RecipeRunner({
              mascotId: 'chef',
              defaultTargetId: 'board',
              delayMs: currentDelayMs,
            });
            runnerRef.current.bindRecipeContext(activeRecipe);
          } else {
            runnerRef.current.delayMs = currentDelayMs;
          }

          const stepToRun = steps[currentStepIndex];
          await runnerRef.current.executeStep(stepToRun);

          if (!isCancelled) {
            const nextIndex = currentStepIndex + 1;
            setCurrentStepIndex(nextIndex);
            if (nextIndex >= totalSteps) {
              setIsPlaying(false);
            }
          }
        }
      } catch (err) {
        console.error('[RecipePlayer] Playback loop error:', err);
        if (!isCancelled) setIsPlaying(false);
      } finally {
        isExecutingRef.current = false;
      }
    };

    const timeoutId = setTimeout(() => {
      playNextStep();
    }, isRecordingMode ? currentDelayMs : 0);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [isPlaying, currentStepIndex, totalSteps, activeRecipe, steps, currentDelayMs, isRecordingMode, recordedActions]);

  const progressPercent = totalSteps > 0 ? Math.min(100, (currentStepIndex / totalSteps) * 100) : 0;

  const requirementsNode = (
    <div className="recipe-requirements-section" data-container-id="despensa">
      <div className="requirements-header">
        <span className="requirements-title">📋 Required Materials</span>
        <span className="requirements-subtitle">(Drag items to workstation)</span>
      </div>
      <RecipeRequirements requirements={getRecipeRequirementsArray(activeRecipe)} />
    </div>
  );

  return (
    <>
      <div className="recipe-player-container">
        {/* Header Row */}
        <div className="player-header">
          <div className="recipe-select-group">
            <span className="recipe-label">Recipe:</span>
            <div className="recipe-buttons">
              {recipes.map((r) => {
                const isActive = r.id === selectedRecipeId;
                const recipeIcon = r.id === 'concebolla' ? '🧅' : '🥔';
                return (
                  <button
                    key={r.id}
                    type="button"
                    className={`recipe-btn ${isActive ? 'active' : ''}`}
                    onClick={() => handleRecipeChange(r.id)}
                  >
                    <span className="recipe-btn-icon">{recipeIcon}</span>
                    <span className="recipe-btn-text">{r.name}</span>
                  </button>
                );
              })}

              {(recordedActions.length > 0 || isRecording) && (
                <button
                  type="button"
                  className={`recipe-btn recording-mode-btn ${selectedRecipeId === 'recording' ? 'active' : ''}`}
                  onClick={() => handleRecipeChange('recording')}
                >
                  <span className="recipe-btn-icon">{isRecording ? '🔴' : '🎥'}</span>
                  <span className="recipe-btn-text">
                    {isRecording
                      ? `Recording (${recordedActions.length})`
                      : `Recorded Session (${recordedActions.length})`}
                  </span>
                </button>
              )}
            </div>
          </div>

          <div className="player-status-badge">
            <span className="step-count">
              Step <strong>{currentStepIndex}</strong> / {totalSteps}
            </span>
            <span className={`speed-badge speed-${speed.toString().replace('.', '_')}`}>
              ⚡ {speed}x
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="player-progress-track">
          <div
            className="player-progress-bar"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Active Step Description Card */}
        <div className="current-step-card">
          <div className="step-icon-area">{stepDetails.icon}</div>
          <div className="step-text-area">
            <div className="step-action-badge">{stepDetails.actionName}</div>
            <p className="step-description">{stepDetails.text}</p>
          </div>
        </div>

        {/* Main Controls Row */}
        <div className="player-controls-bar">
          {/* Slow Control */}
          <button
            type="button"
            className="ctrl-btn slow-btn"
            onClick={handleSlow}
            title="Slow down playback speed (0.5x)"
          >
            🐢 Slow
          </button>

          {/* Step Down (Step Back) */}
          <button
            type="button"
            className="ctrl-btn step-down-btn"
            onClick={handleStepDown}
            disabled={currentStepIndex <= 0}
            title="Step Down: Go back to previous step"
          >
            ⏮ Step Down
          </button>

          {/* Play / Pause Toggle */}
          <button
            type="button"
            className={`ctrl-btn play-btn ${isPlaying ? 'is-playing' : ''}`}
            onClick={handleTogglePlay}
            title={isPlaying ? 'Pause recipe auto-play' : 'Play recipe step-by-step'}
          >
            {isPlaying ? '⏸ Pause' : currentStepIndex >= totalSteps ? '🔄 Replay' : '▶ Play'}
          </button>

          {/* Step Up (Step Forward) */}
          <button
            type="button"
            className="ctrl-btn step-up-btn"
            onClick={handleStepUp}
            disabled={currentStepIndex >= totalSteps}
            title="Step Up: Advance to next step"
          >
            Step Up ⏭
          </button>

          {/* Fast Control */}
          <button
            type="button"
            className="ctrl-btn fast-btn"
            onClick={handleFast}
            title="Speed up playback speed (2x/3x)"
          >
            Fast ⚡
          </button>

          {/* Record / Stop Recording Toggle */}
          <button
            type="button"
            className={`ctrl-btn record-btn ${isRecording ? 'is-recording' : ''}`}
            onClick={
              isRecording
                ? stopRecording
                : () => {
                    startRecording();
                    setSelectedRecipeId('recording');
                    setCurrentStepIndex(0);
                  }
            }
            title={
              isRecording
                ? 'Stop recording world interactions'
                : 'Record world interactions into a serialized recipe'
            }
          >
            <span className={`record-indicator ${isRecording ? 'active' : ''}`}></span>
            {isRecording ? `⏹ Stop (${recordedActions.length})` : '⏺ Record'}
          </button>

          {/* Download Recipe JSON Link */}
          {recordedDownloadUrl && (
            <a
              href={recordedDownloadUrl}
              download={recordedFilename || 'tortilla-recorded-recipe.json'}
              className="ctrl-btn download-btn"
              title="Download serialized recipe JSON file"
            >
              💾 Download Recipe (.json)
            </a>
          )}

          {/* Action Log Replayer */}
          <ActionReplayer
            onPlaybackStart={() => {
              setSelectedRecipeId('recording');
              setCurrentStepIndex(0);
            }}
          />

          {/* Kitchen Reset Button */}
          <button
            type="button"
            className="ctrl-btn reset-btn"
            onClick={handleReset}
            title="Reset kitchen world to starting state"
          >
            🔄 Reset
          </button>
        </div>

        {/* Speed Presets & Step Timeline Dots */}
        <div className="player-footer">
          <div className="speed-pills">
            <span className="speed-title">Speed:</span>
            {[0.5, 1, 2, 3].map((sp) => (
              <button
                key={sp}
                type="button"
                className={`speed-pill ${speed === sp ? 'active' : ''}`}
                onClick={() => setSpeed(sp)}
              >
                {sp}x
              </button>
            ))}
          </div>

          {/* Interactive Step Stepper Dots */}
          <div className="stepper-dots">
            {Array.from({ length: totalSteps }).map((_, idx) => (
              <button
                key={`step-dot-${idx}`}
                type="button"
                className={`step-dot ${idx < currentStepIndex ? 'completed' : ''} ${
                  idx === currentStepIndex ? 'active' : ''
                }`}
                onClick={() => jumpToStep(idx)}
                title={`Jump to step ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {!renderWorkspace && requirementsNode}
      </div>
      {renderWorkspace && renderWorkspace(requirementsNode)}
    </>
  );
};
`````

## File: src/store/defaults.ts
`````typescript
/**
 * FILE: defaults.ts
 *
 * PURPOSE:
 * Initial seed data for world state.
 *
 * RESPONSIBILITY:
 * - Provides default entity definitions (mascot, ingredients, tools).
 * - Provides default container definitions (despensa, sink, board, bowl, burner, plate).
 */

import type { Container, Entity } from '../types/world';
import type { GazeTarget } from '../systems/gaze';
import { ingredients as catalogIngredients } from '../data/catalog/ingredients';
import { catalogTools } from '../data/catalog/tools';

export const defaultEntities: Record<string, Entity> = {
  chef: {
    id: 'chef',
    name: 'Chef Tortilla 🍳',
    type: 'mascot',
    state: { gazingAt: { type: 'entity', entityId: 'despensa' } satisfies GazeTarget },
  },
  ...catalogIngredients.reduce((acc, item) => {
    acc[item.id] = {
      id: item.id,
      ingredientId: item.id,
      name: `${item.icon} ${item.name}`,
      type: 'ingredient',
      state: {},
    };
    return acc;
  }, {} as Record<string, Entity>),
  ...catalogTools.reduce((acc, item) => {
    acc[item.id] = {
      id: item.id,
      name: `${item.icon} ${item.name}`,
      type: 'tool',
      state: {},
    };
    return acc;
  }, {} as Record<string, Entity>),
};

export const defaultContainers: Record<string, Container> = {
  despensa: {
    id: 'despensa',
    name: 'Despensa (All Ingredients - Immutable Catalog)',
    type: 'storage',
    entityIds: [...catalogIngredients.map((i) => i.id), ...catalogTools.map((t) => t.id)],
    rules: {
      maxCapacity: 30,
      allowedTypes: ['ingredient', 'tool'],
      consumesOnDrag: false,
      isImmutable: true,
    },
  },
  sink: {
    id: 'sink',
    name: 'Fregadero (Sink)',
    type: 'sink',
    entityIds: [],
    rules: { maxCapacity: 10, allowedTypes: ['ingredient', 'tool'] },
  },
  board: {
    id: 'board',
    name: 'Tabla (Cutting Board)',
    type: 'board',
    entityIds: [],
    rules: { maxCapacity: 10, allowedTypes: ['ingredient', 'tool'] },
  },
  bowl: {
    id: 'bowl',
    name: 'Bol (Preparation Bowl)',
    type: 'bowl',
    entityIds: [],
    rules: { maxCapacity: 10, allowedTypes: ['ingredient', 'tool'] },
  },
  burner1: {
    id: 'burner1',
    name: 'Fuego 1',
    type: 'burner',
    entityIds: [],
    rules: { maxCapacity: 5, allowedTypes: ['ingredient', 'tool'] },
    isOn: false,
  },
  burner2: {
    id: 'burner2',
    name: 'Fuego 2',
    type: 'burner',
    entityIds: [],
    isOn: true,
    rules: { maxCapacity: 5, allowedTypes: ['ingredient', 'tool'] },
  },
  plate: {
    id: 'plate',
    name: 'Plato (Plate)',
    type: 'plate',
    entityIds: [],
    rules: { maxCapacity: 5, allowedTypes: ['ingredient', 'tool'] },
  },
};
`````

## File: src/systems/clasicaCompletion.test.ts
`````typescript
/**
 * FILE: src/systems/clasicaCompletion.test.ts
 *
 * PURPOSE:
 * Integration tests verifying entity states and container cleanups at the completion of clasicaRecipe.
 *
 * VERIFIES:
 * - Preparation bowl (bowl) is empty at the end.
 * - Plato (plate) contains ONLY mixture at the end.
 * - Mixed input ingredients disappear from all world containers.
 */

import { beforeEach, describe, expect, it } from 'vitest';
import { worldStore } from '../store/worldStore';
import { RecipeRunner } from './recipeRunner';
import { clasicaRecipe } from '../data/catalog/recipes/clasica';
import { clearActionLog } from '../store/middleware/actionLog';

function seedTestWorld() {
  worldStore.setState({
    entities: {
      chef: { id: 'chef', name: 'Chef Tortilla 🍳', type: 'mascot', state: { gazingAt: null } },
      potato: { id: 'potato', ingredientId: 'potato', name: 'Potato', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
      egg: { id: 'egg', ingredientId: 'egg', name: 'Egg', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
      oil: { id: 'oil', ingredientId: 'oil', name: 'Oil', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
      salt: { id: 'salt', ingredientId: 'salt', name: 'Salt', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
      black_pepper: { id: 'black_pepper', ingredientId: 'black_pepper', name: 'Pepper', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
    },
    containers: {
      despensa: {
        id: 'despensa',
        name: 'Despensa',
        type: 'storage',
        entityIds: ['potato', 'egg', 'oil', 'salt', 'black_pepper'],
        rules: { isImmutable: true },
      },
      sink: {
        id: 'sink',
        name: 'Sink',
        type: 'sink',
        entityIds: [],
        rules: { maxCapacity: 10 },
      },
      board: {
        id: 'board',
        name: 'Board',
        type: 'board',
        entityIds: [],
        rules: { maxCapacity: 10 },
      },
      bowl: {
        id: 'bowl',
        name: 'Bowl',
        type: 'bowl',
        entityIds: [],
        rules: { maxCapacity: 10 },
      },
      burner1: {
        id: 'burner1',
        name: 'burner1',
        type: 'burner',
        entityIds: [],
        rules: { maxCapacity: 5 },
      },
      plate: {
        id: 'plate',
        name: 'Plate',
        type: 'plate',
        entityIds: [],
        rules: { maxCapacity: 5 },
      },
    },
    dispatch: worldStore.getState().dispatch,
  });
}

describe('Clásica Recipe Completion State', () => {
  beforeEach(() => {
    seedTestWorld();
    clearActionLog();
  });

  it('ensures preparation bowl is empty, and plato contains ONLY mixture', async () => {
    const runner = new RecipeRunner({ mascotId: 'chef', delayMs: 1 });
    await runner.runRecipe(clasicaRecipe);

    const state = worldStore.getState();

    // 1. Preparation bowl is empty
    expect(state.containers.bowl.entityIds).toEqual([]);

    // 2. fireplace is empty
    //expect(state.containers.pan.entityIds).toEqual([]);

    // 3. Plato (plate) contains ONLY mixture
    expect(state.containers.plate.entityIds).toHaveLength(1);
    const servedEntityId = state.containers.plate.entityIds[0];
    const servedEntity = state.entities[servedEntityId];
    expect(servedEntity).toBeDefined();
    expect(servedEntity.name).toBe('mixture');

    // 4. Input ingredients and cooking oil are marked as consumed
    const mixtureId = runner.recipeContext.bindings['mixture'];
    expect(mixtureId).toBe(servedEntityId);

    const potatoesId = runner.recipeContext.bindings['potatoes'];
    const eggsId = runner.recipeContext.bindings['eggs'];
    const saltId = runner.recipeContext.bindings['salt'];
    const pepperId = runner.recipeContext.bindings['black_pepper'];

    expect(state.entities[potatoesId]?.state?.consumed).toBe(true);
    expect(state.entities[eggsId]?.state?.consumed).toBe(true);
    expect(state.entities[saltId]?.state?.consumed).toBe(true);
    expect(state.entities[pepperId]?.state?.consumed).toBe(true);

    // Verify none of the consumed ingredients remain in any workstation container
    const workstationContainerIds = ['sink', 'board', 'bowl', 'burner1', 'plate'];
    for (const cId of workstationContainerIds) {
      expect(state.containers[cId].entityIds).not.toContain(potatoesId);
      expect(state.containers[cId].entityIds).not.toContain(eggsId);
      expect(state.containers[cId].entityIds).not.toContain(saltId);
      expect(state.containers[cId].entityIds).not.toContain(pepperId);
    }
  });
});
`````

## File: package.json
`````json
{
  "name": "tortilla-world",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "test": "vitest run"
  },
  "dependencies": {
    "@dnd-kit/core": "^6.3.1",
    "@dnd-kit/sortable": "^10.0.0",
    "@dnd-kit/utilities": "^3.2.2",
    "framer-motion": "^12.42.2",
    "immer": "^11.1.15",
    "react": "^19.2.7",
    "react-dom": "^19.2.7",
    "zustand": "^5.0.14"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/node": "^24.13.2",
    "@types/react": "^19.2.17",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.3",
    "eslint": "^10.6.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.3",
    "globals": "^17.7.0",
    "repomix": "^1.16.1",
    "sass-embedded": "^1.100.0",
    "typescript": "~6.0.2",
    "typescript-eslint": "^8.62.0",
    "vite": "^8.1.1",
    "vitest": "^4.1.10"
  }
}
`````

## File: src/components/Scene/RecipePlayer.scss
`````scss
/**
 * FILE: RecipePlayer.scss
 *
 * PURPOSE:
 * Stylesheet for RecipePlayer component.
 * Uses warm Spanish kitchen ceramic palette with sleek interactive controls.
 */

@use 'sass:color';
@use '../../styles/variables' as *;
@use '../../styles/mixins' as *;

.recipe-player-container {
  @include ceramic-card($warm-surface, $warm-border);
  padding: 16px 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: $shadow-ceramic;
  position: relative;
  overflow: hidden;

  // Header Row
  .player-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;

    .recipe-select-group {
      display: flex;
      align-items: center;
      gap: 12px;

      .recipe-label {
        font-weight: 800;
        font-size: 0.9rem;
        color: $dark-brown;
      }

      .recipe-buttons {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;

        .recipe-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #ffffff;
          border: 2px solid $warm-border;
          border-radius: $radius-sm;
          padding: 6px 14px;
          font-size: 0.88rem;
          font-weight: 700;
          color: $dark-brown;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 2px 4px rgba(44, 26, 20, 0.04);
          user-select: none;

          .recipe-btn-icon {
            font-size: 1.1rem;
            line-height: 1;
            transition: transform 0.2s ease;
          }

          &:hover {
            border-color: $tortilla-yellow;
            background: $tortilla-yellow-light;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(232, 168, 56, 0.2);

            .recipe-btn-icon {
              transform: scale(1.2) rotate(-5deg);
            }
          }

          &:active {
            transform: translateY(0);
          }

          &.active {
            background: linear-gradient(135deg, $tortilla-yellow, $tortilla-yellow-hover);
            color: #ffffff;
            border-color: $tortilla-yellow-hover;
            box-shadow: 0 4px 10px rgba(232, 168, 56, 0.35);

            .recipe-btn-icon {
              transform: scale(1.15);
            }
          }

          &.recording-mode-btn {
            border-color: $terracotta;
            color: $terracotta;

            &:hover {
              background: rgba(217, 83, 79, 0.08);
            }

            &.active {
              background: linear-gradient(135deg, $terracotta, color.adjust($terracotta, $lightness: -10%));
              color: #ffffff;
              border-color: $terracotta;
              box-shadow: 0 4px 10px rgba(217, 83, 79, 0.35);
            }
          }
        }
      }
    }

    .player-status-badge {
      display: flex;
      align-items: center;
      gap: 10px;

      .step-count {
        font-size: 0.88rem;
        color: $wood-muted;
        background: $warm-beige;
        padding: 4px 10px;
        border-radius: $radius-sm;
        border: 1px solid $warm-border;

        strong {
          color: $dark-brown;
          font-weight: 800;
        }
      }

      .speed-badge {
        font-size: 0.82rem;
        font-weight: 700;
        padding: 4px 10px;
        border-radius: $radius-sm;
        background: $olive-green-light;
        color: $olive-green;
        border: 1px solid $olive-green-border;
      }
    }
  }

  // Recipe Requirements Section (Left Sidebar Panel)
  .recipe-requirements-section {
    width: 260px;
    min-width: 230px;
    flex-shrink: 0;
    background: #ffffff;
    border: 1px solid $warm-border;
    border-radius: $radius-md;
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    box-shadow: $shadow-ceramic;
    box-sizing: border-box;

    @media (max-width: 860px) {
      width: 100%;
    }

    .requirements-header {
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding-bottom: 8px;
      border-bottom: 2px dashed color.mix($dark-brown, white, 15%);

      .requirements-title {
        font-size: 0.85rem;
        font-weight: 800;
        color: $dark-brown;
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }

      .requirements-subtitle {
        font-size: 0.75rem;
        font-weight: 600;
        color: $wood-muted;
      }
    }

    .recipe-requirements {
      display: flex;
      flex-direction: column;
      gap: 10px;
      list-style: none;
      margin: 0;
      padding: 0;
      width: 100%;

      .requirement-view {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: $warm-surface;
        border: 1px solid $warm-border;
        border-radius: $radius-md;
        padding: 8px 12px;
        font-size: 0.88rem;
        font-weight: 700;
        color: $dark-brown;
        box-shadow: 0 1px 3px rgba(44, 26, 20, 0.04);
        width: 100%;
        box-sizing: border-box;
        transition: all 0.2s ease;

        &:hover {
          border-color: $tortilla-yellow;
          box-shadow: 0 3px 6px rgba(232, 168, 56, 0.15);
          transform: translateX(2px);
        }

        &__amount {
          font-size: 0.8rem;
          font-weight: 800;
          color: $terracotta;
          background: $terracotta-light;
          padding: 3px 8px;
          border-radius: 6px;
          border: 1px solid $terracotta-border;
          white-space: nowrap;
        }
      }
    }
  }

  // Progress Bar Track
  .player-progress-track {
    width: 100%;
    height: 6px;
    background: $warm-beige;
    border-radius: 999px;
    overflow: hidden;
    position: relative;

    .player-progress-bar {
      height: 100%;
      background: linear-gradient(90deg, $tortilla-yellow, $terracotta);
      border-radius: 999px;
      transition: width 0.25s ease-out;
    }
  }

  // Active Step Description Card
  .current-step-card {
    display: flex;
    align-items: center;
    gap: 14px;
    background: #ffffff;
    border: 1px solid $warm-border;
    border-radius: $radius-md;
    padding: 12px 16px;
    box-shadow: 0 2px 5px rgba(44, 26, 20, 0.04);

    .step-icon-area {
      font-size: 1.8rem;
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: $tortilla-yellow-light;
      border: 1px solid $tortilla-yellow-border;
      border-radius: $radius-sm;
      flex-shrink: 0;
    }

    .step-text-area {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .step-action-badge {
        display: inline-block;
        align-self: flex-start;
        font-size: 0.68rem;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        padding: 2px 6px;
        border-radius: 4px;
        background: $terracotta-light;
        color: $terracotta;
        border: 1px solid $terracotta-border;
      }

      .step-description {
        margin: 0;
        font-size: 0.95rem;
        font-weight: 600;
        color: $dark-brown;
        line-height: 1.35;
      }
    }
  }

  // Controls Row
  .player-controls-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    padding-top: 4px;

    .ctrl-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      font-size: 0.85rem;
      font-weight: 700;
      border-radius: $radius-sm;
      border: 1px solid $warm-border;
      background: #ffffff;
      color: $dark-brown;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
      transition: all 0.18s ease;
      user-select: none;

      &:hover:not(:disabled) {
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-color: $tortilla-yellow;
      }

      &:active:not(:disabled) {
        transform: translateY(0);
      }

      &:disabled {
        opacity: 0.45;
        cursor: not-allowed;
        box-shadow: none;
      }

      // Primary Play Button
      &.play-btn {
        background: $tortilla-yellow;
        color: #ffffff;
        border-color: $tortilla-yellow-hover;
        padding: 10px 22px;
        font-size: 0.95rem;

        &:hover:not(:disabled) {
          background: $tortilla-yellow-hover;
        }

        &.is-playing {
          background: $terracotta;
          border-color: $terracotta-hover;
        }
      }

      // Slow & Fast buttons
      &.slow-btn, &.fast-btn {
        background: $warm-surface;
      }

      // Record button
      &.record-btn {
        background: #ffffff;
        border: 2px solid $terracotta;
        color: $terracotta;
        font-weight: 800;

        .record-indicator {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: $terracotta;
          transition: transform 0.2s ease;

          &.active {
            animation: record-pulse 1.2s infinite ease-in-out;
          }
        }

        &:hover:not(:disabled) {
          background: $terracotta-light;
          border-color: $terracotta-hover;
        }

        &.is-recording {
          background: $terracotta;
          color: #ffffff;
          border-color: $terracotta-hover;
          box-shadow: 0 4px 10px rgba(217, 83, 79, 0.35);

          .record-indicator {
            background: #ffffff;
          }

          &:hover:not(:disabled) {
            background: $terracotta-hover;
          }
        }
      }

      // Download button
      &.download-btn {
        background: linear-gradient(135deg, $olive-green, $olive-green-hover);
        color: #ffffff;
        border: 2px solid $olive-green-hover;
        font-weight: 800;
        text-decoration: none;
        box-shadow: 0 3px 8px rgba(107, 142, 35, 0.3);

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 12px rgba(107, 142, 35, 0.4);
        }
      }

      // Reset button
      &.reset-btn {
        margin-left: auto;
        background: #ffffff;
        border: 2px solid $terracotta;
        color: $terracotta;
        font-size: 0.9rem;
        font-weight: 800;
        padding: 9px 18px;

        &:hover:not(:disabled) {
          background: $terracotta;
          color: #ffffff;
          border-color: $terracotta-hover;
          box-shadow: 0 4px 8px rgba(217, 83, 79, 0.25);
        }
      }
    }
  }

  // Footer: Speed Pills & Stepper Dots
  .player-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    padding-top: 6px;
    border-top: 1px dashed $warm-border;

    .speed-pills {
      display: flex;
      align-items: center;
      gap: 6px;

      .speed-title {
        font-size: 0.8rem;
        font-weight: 700;
        color: $wood-muted;
        margin-right: 2px;
      }

      .speed-pill {
        border: 1px solid $warm-border;
        background: #ffffff;
        color: $dark-brown;
        font-size: 0.75rem;
        font-weight: 700;
        padding: 3px 8px;
        border-radius: $radius-sm;
        cursor: pointer;
        transition: all 0.15s;

        &:hover {
          border-color: $olive-green;
        }

        &.active {
          background: $olive-green;
          color: #ffffff;
          border-color: $olive-green-hover;
        }
      }
    }

    .stepper-dots {
      display: flex;
      align-items: center;
      gap: 5px;
      flex-wrap: wrap;

      .step-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: $warm-border;
        border: none;
        padding: 0;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          transform: scale(1.3);
          background: $tortilla-yellow;
        }

        &.completed {
          background: $olive-green;
        }

        &.active {
          background: $terracotta;
          transform: scale(1.3);
          box-shadow: 0 0 0 2px $terracotta-light;
        }
      }
    }
  }
}

@keyframes record-pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.4);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
`````

## File: src/components/World/World.scss
`````scss
/**
 * FILE: World.scss
 *
 * PURPOSE:
 * SCSS styles for world containers and entity views.
 */

@use 'sass:color';
@use '../../styles/variables' as *;
@use '../../styles/mixins' as *;

.container-view {
  @include ceramic-card($warm-surface, $warm-border);
  min-width: 240px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: border-color 0.2s ease, background-color 0.2s ease;

  &--drag-over {
    border-color: $tortilla-yellow;
    background-color: color.mix($tortilla-yellow, $warm-surface, 10%);
  }

  &--mixture {
    border-color: $tortilla-yellow;
    box-shadow: 0 0 16px rgba(245, 180, 50, 0.35);
  }
}

.burner-toggle {
  width: 18px;
  height: 18px;
  padding: 0;

  border: 2px solid #666;
  border-radius: 50%;
  background: #2f2f2f;

  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.15);
    border-color: #999;
  }

  &:active {
    transform: scale(0.95);
  }
}

.burner-toggle--on {
  background: #ff6b00;
  border-color: #ff9d4d;

  box-shadow:
    0 0 6px rgba(255, 120, 0, .8),
    0 0 14px rgba(255, 120, 0, .5);
}

.container-onFire {
  animation: burnerGlow 1s infinite alternate;
}

@keyframes burnerGlow {
  from {
    box-shadow: 0 0 5px red;
  }

  to {
    box-shadow: 0 0 25px orange;
  }
}

.container-view__header {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.container-view__actions {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;

  .container-action-btn {
    padding: 4px 10px;
    font-size: 0.8rem;
    font-weight: 600;
    border-radius: $radius-sm;
    border: 1px solid $warm-border;
    background: #ffffff;
    color: $dark-brown;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: color.mix($tortilla-yellow, #ffffff, 20%);
      border-color: $tortilla-yellow;
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }

    &--active {
      background: #ff6b00;
      color: #ffffff;
      border-color: #ff9d4d;
      box-shadow: 0 0 6px rgba(255, 120, 0, 0.5);
    }
  }
}

.container-view__title {
  color: $dark-brown;
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
}

.container-view__badge {
  color: $wood-muted;
  font-size: 0.82rem;
  font-weight: 600;
}

.container-view__items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  min-height: 48px;
}

.container-view__empty-hint {
  color: $wood-muted;
  font-size: 0.85rem;
  font-style: italic;
  text-align: center;
  padding: 12px;
  border: 1px dashed $warm-border;
  border-radius: $radius-md;
}

.entity-view {
  align-items: center;
  background: #ffffff;
  border: 1px solid $warm-border;
  border-radius: $radius-md;
  box-shadow: 0 2px 6px rgba(44, 26, 20, 0.04);
  display: flex;
  gap: 0.5rem;
  padding: 8px 12px;
  user-select: none;
  transition: all 0.2s ease;

  &:hover {
    border-color: color.mix($tortilla-yellow, $warm-border, 50%);
  }

  &--dragging {
    opacity: 0.6;
    cursor: grabbing;
  }

  &--readonly {
    cursor: default;
    background: color.mix($warm-beige, #ffffff, 40%);
    box-shadow: none;

    &:hover {
      border-color: $warm-border;
    }
  }
}

.entity-view__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.entity-view__name {
  font-weight: 600;
  color: $dark-brown;
  font-size: 0.9rem;
}

.entity-view__state {
  margin-left: auto;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: $radius-sm;

  &--raw {
    background: #fef3c7;
    color: #92400e;
  }

  &--prepared {
    background: #e0f2fe;
    color: #0369a1;
  }

  &--cooking {
    background: #ffedd5;
    color: #c2410c;
  }

  &--finished {
    background: #dcfce7;
    color: #15803d;
  }
}
`````

## File: src/store/worldStore.test.ts
`````typescript
/**
 * FILE: worldStore.test.ts
 *
 * PURPOSE:
 * Unit tests for central world store and container rule enforcement.
 *
 * RESPONSIBILITY:
 * - Validates state transitions, move/add entity actions, and rule checks.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { worldStore } from './worldStore';
import { clearActionLog, getActionLog } from './middleware/actionLog';

function seed() {
  worldStore.setState({
    entities: {
      potato: { id: 'potato', name: 'Potato', type: 'ingredient' },
      onion: { id: 'onion', name: 'Onion', type: 'ingredient' },
      knife: { id: 'knife', name: 'Knife', type: 'tool' },
      chef: { id: 'chef', name: 'Chef', type: 'mascot' },
    },
    containers: {
      kitchen: {
        id: 'kitchen',
        name: 'Kitchen',
        type: 'storage',
        entityIds: ['potato', 'onion', 'knife'],
      },
      burner1: {
        id: 'burner1',
        name: 'burner1',
        type: 'burner',
        entityIds: [],
        rules: { maxCapacity: 1 },
      },
      board: {
        id: 'board',
        name: 'Cutting Board',
        type: 'board',
        entityIds: [],
        rules: { allowedTypes: ['ingredient'] },
      },
      recipe: {
        id: 'recipe',
        name: 'Recipe',
        type: 'plate',
        entityIds: [],
        rules: { allowedTypes: ['ingredient'], uniqueTypesOnly: true },
      },
    },
  });
}

describe('worldStore container rule enforcement', () => {
  beforeEach(() => {
    seed();
    clearActionLog();
  });

  it('allows a move that satisfies the target container rules', () => {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato', targetContainerId: 'burner1' },
    });

    const state = worldStore.getState();
    expect(state.containers.burner1.entityIds).toEqual(['potato']);
    expect(state.containers.kitchen.entityIds).not.toContain('potato');
  });

  it('blocks a move once the target container is at capacity', () => {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato', targetContainerId: 'burner1' },
    });
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'onion', targetContainerId: 'burner1' },
    });

    const state = worldStore.getState();
    expect(state.containers.burner1.entityIds).toEqual(['potato']);
    expect(state.containers.kitchen.entityIds).toContain('onion');
  });

  it('blocks a move that violates allowedTypes', () => {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'knife', targetContainerId: 'board' },
    });

    // knife is a tool; board only allows ingredients
    const state = worldStore.getState();
    expect(state.containers.board.entityIds).toEqual([]);
    expect(state.containers.kitchen.entityIds).toContain('knife');
  });

  it('blocks a move that would duplicate a type in a uniqueTypesOnly container', () => {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato', targetContainerId: 'recipe' },
    });
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'onion', targetContainerId: 'recipe' },
    });

    // both are 'ingredient' type; uniqueTypesOnly blocks the second
    const state = worldStore.getState();
    expect(state.containers.recipe.entityIds).toEqual(['potato']);
    expect(state.containers.kitchen.entityIds).toContain('onion');
  });

  it('never re-validates a same-container reorder', () => {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato', targetContainerId: 'kitchen', positionIndex: 0 },
    });

    // would fail uniqueTypesOnly-style self-comparison if the entity
    // weren't excluded from its own container's current entities
    const state = worldStore.getState();
    expect(state.containers.kitchen.entityIds[0]).toBe('potato');
  });

  it('is a no-op when the entity does not exist', () => {
    const before = worldStore.getState().containers.burner1.entityIds;
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'ghost', targetContainerId: 'burner1' },
    });
    expect(worldStore.getState().containers.burner1.entityIds).toEqual(before);
  });

  it('enforces the same rules on ADD_ENTITY', () => {
    worldStore.getState().dispatch({
      type: 'ADD_ENTITY',
      payload: {
        entity: { id: 'spoon', name: 'Spoon', type: 'tool' },
        containerId: 'board',
      },
    });

    const state = worldStore.getState();
    expect(state.containers.board.entityIds).toEqual([]);
    expect(state.entities.spoon).toBeUndefined();
  });

  it('logs a labelled entry into the action log for each dispatch', () => {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato', targetContainerId: 'burner1' },
    });

    const log = getActionLog();
    expect(log).toHaveLength(1);
    expect(log[0].action).toBe('MOVE_ENTITY');
    expect(typeof log[0].timestamp).toBe('number');
  });

  it('keeps source entity and creates copy in target when moving from an immutable container', () => {
    worldStore.setState({
      entities: {
        potato: { id: 'potato', name: 'Potato', type: 'ingredient' },
      },
      containers: {
        pantry: {
          id: 'pantry',
          name: 'Immutable Pantry',
          type: 'storage',
          entityIds: ['potato'],
          rules: { isImmutable: true },
        },
        burner1: {
          id: 'burner1',
          name: 'burner1',
          type: 'burner',
          entityIds: [],
        },
      },
    });

    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato', targetContainerId: 'burner1' },
    });

    const state = worldStore.getState();
    // Source container retains original entity
    expect(state.containers.pantry.entityIds).toEqual(['potato']);
    // Target container gets a copy instance
    expect(state.containers.burner1.entityIds.length).toBe(1);
    const copyId = state.containers.burner1.entityIds[0];
    expect(copyId).not.toBe('potato');
    expect(state.entities[copyId].name).toBe('Potato');
  });

  it('rejects adding a duplicate ingredient to a container according to Rule 6', () => {
    worldStore.setState({
      entities: {
        potato: { id: 'potato', ingredientId: 'potato', name: 'Potato', type: 'ingredient' },
        potato_copy: { id: 'potato_copy', ingredientId: 'potato', name: 'Potato Copy', type: 'ingredient' },
      },
      containers: {
        pantry: {
          id: 'pantry',
          name: 'Pantry',
          type: 'storage',
          entityIds: ['potato_copy'],
          rules: { isImmutable: true },
        },
        burner1: {
          id: 'burner1',
          name: 'burner1',
          type: 'burner',
          entityIds: ['potato'],
        },
      },
    });

    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato_copy', targetContainerId: 'burner1' },
    });

    const state = worldStore.getState();
    // burner1 should still only have 1 potato because duplicate ingredient is blocked
    expect(state.containers.burner1.entityIds).toEqual(['potato']);
  });

  it('updates ingredient status to peeled when preparation is peeled', () => {
    worldStore.setState({
      entities: {
        potato: { id: 'potato', ingredientId: 'potato', name: '🥔 Potatoes', type: 'ingredient' },
      },
      containers: {
        board: { id: 'board', name: 'Board', type: 'board', entityIds: ['potato'] },
      },
    });

    worldStore.getState().dispatch({
      type: 'PREPARE_INGREDIENT',
      payload: { entityId: 'potato', preparation: 'peeled' },
    });

    const state = worldStore.getState();
    const entity = state.entities.potato;
    expect(entity.state?.preparation).toBe('peeled');
    expect(entity.state?.status).toBe('peeled');
    expect(entity.name).toBe('🥔 Peeled Potatoes');
  });

  it('updates ingredient status to sliced-potatoe and diced-potatoe generically', () => {
    worldStore.setState({
      entities: {
        potato: { id: 'potato', ingredientId: 'potato', name: '🥔 Potatoes', type: 'ingredient' },
        onion: { id: 'onion', ingredientId: 'onion', name: '🧅 Onion', type: 'ingredient' },
      },
      containers: {
        board: { id: 'board', name: 'Board', type: 'board', entityIds: ['potato', 'onion'] },
      },
    });

    worldStore.getState().dispatch({
      type: 'PREPARE_INGREDIENT',
      payload: { entityId: 'potato', preparation: 'sliced' },
    });

    worldStore.getState().dispatch({
      type: 'PREPARE_INGREDIENT',
      payload: { entityId: 'onion', preparation: 'diced' },
    });

    const state = worldStore.getState();
    expect(state.entities.potato.state?.status).toBe('sliced-potatoe');
    expect(state.entities.onion.state?.status).toBe('diced-onion');
  });

  it('toggles container heat state and emits CONTAINER_HEAT_TOGGLED world event on TOGGLE_HEAT', () => {
    const eventsReceived: Array<{ type: string; payload: unknown }> = [];
    const unsubscribe = worldStore.getState().onEvent((event) => {
      eventsReceived.push(event);
    });

    expect(worldStore.getState().containers.burner1.isOn).toBeFalsy();

    // Toggle heat ON
    worldStore.getState().dispatch({
      type: 'TOGGLE_HEAT',
      payload: { containerId: 'burner1' },
    });

    expect(worldStore.getState().containers.burner1.isOn).toBe(true);
    expect(eventsReceived).toHaveLength(1);
    expect(eventsReceived[0]).toEqual({
      type: 'CONTAINER_HEAT_TOGGLED',
      payload: { containerId: 'burner1', isOn: true },
    });

    // Toggle heat OFF
    worldStore.getState().dispatch({
      type: 'TOGGLE_HEAT',
      payload: { containerId: 'burner1' },
    });

    expect(worldStore.getState().containers.burner1.isOn).toBe(false);
    expect(eventsReceived).toHaveLength(2);
    expect(eventsReceived[1]).toEqual({
      type: 'CONTAINER_HEAT_TOGGLED',
      payload: { containerId: 'burner1', isOn: false },
    });

    unsubscribe();
  });

  it('toggles container heat state and emits CONTAINER_HEAT_TOGGLED world event on TOGGLE_BURNER', () => {
    const eventsReceived: Array<{ type: string; payload: unknown }> = [];
    const unsubscribe = worldStore.getState().onEvent((event) => {
      eventsReceived.push(event);
    });

    expect(worldStore.getState().containers.board.isOn).toBeFalsy();

    worldStore.getState().dispatch({
      type: 'TOGGLE_BURNER',
      payload: { containerId: 'board' },
    });

    expect(worldStore.getState().containers.board.isOn).toBe(true);
    expect(eventsReceived[0]).toEqual({
      type: 'CONTAINER_HEAT_TOGGLED',
      payload: { containerId: 'board', isOn: true },
    });

    unsubscribe();
  });
});
`````

## File: src/systems/recipeRunner/handlers/utilityHandlers.ts
`````typescript
/**
 * FILE: src/systems/recipeRunner/handlers/utilityHandlers.ts
 *
 * PURPOSE:
 * Step handlers for utility, narrative, and completion steps ('serve', 'wait', 'instruction', 'speak', 'celebrate').
 */

import { worldStore } from '../../../store/worldStore';
import { moveTortillaTo, flipTortilla, clearTortillaGaze } from '../../mascotActions';
import type { RecipeStep } from '../../../types/RecipeStep';
import type { RecipeRunnerContext } from '../types';

type ServeStep = Extract<RecipeStep, { action: 'serve' }>;
type WaitStep = Extract<RecipeStep, { action: 'wait' }>;
type InstructionStep = Extract<RecipeStep, { action: 'instruction' }>;
type SpeakStep = Extract<RecipeStep, { action: 'speak' }>;
type CelebrateStep = Extract<RecipeStep, { action: 'celebrate' }>;

export async function handleServeStep(
  ctx: RecipeRunnerContext,
  step: ServeStep,
  workstationDefaultContainerId?: string
): Promise<void> {
  const targetContainerId = step.containerId || workstationDefaultContainerId || 'plate';
  moveTortillaTo(targetContainerId, ctx.mascotId);
  await ctx.wait();

  const state = worldStore.getState();

  if (step.target) {
    const targetEntityId = ctx.getBoundEntityId(step.target);
    if (targetEntityId) {
      const currentContainer = Object.values(state.containers).find((c) =>
        c.entityIds.includes(targetEntityId)
      );
      if (currentContainer && currentContainer.id !== targetContainerId) {
        worldStore.getState().dispatch({
          type: 'MOVE_ENTITY',
          payload: {
            entityId: targetEntityId,
            targetContainerId,
          },
        });
      }
    }
  } else {
    // Move all active (unconsumed) bound recipe entities to target container (plate)
    const boundEntityIds = new Set(Object.values(ctx.recipeContext.bindings));

    for (const entityId of boundEntityIds) {
      const entity = state.entities[entityId];
      if (entity && !entity.state?.consumed) {
        const currentContainer = Object.values(state.containers).find((c) =>
          c.entityIds.includes(entityId)
        );
        if (currentContainer && currentContainer.id !== targetContainerId) {
          worldStore.getState().dispatch({
            type: 'MOVE_ENTITY',
            payload: {
              entityId,
              targetContainerId,
            },
          });
        }
      }
    }
  }
  await ctx.wait();
}

export async function handleWaitStep(
  ctx: RecipeRunnerContext,
  step: WaitStep
): Promise<void> {
  await ctx.wait(step.durationMs);
}

export async function handleInstructionStep(
  ctx: RecipeRunnerContext,
  step: InstructionStep
): Promise<void> {
  const text = step.text || step.instruction;
  if (text) {
    worldStore.getState().dispatch({
      type: 'UPDATE_ENTITY_STATE',
      payload: {
        entityId: step.mascotId || ctx.mascotId,
        changes: { speechMessage: text },
      },
    });

    const lower = text.toLowerCase();
    if (
      lower.includes('toggle heat') ||
      lower.includes('turn on heat') ||
      lower.includes('turn off heat') ||
      lower.includes('heat on') ||
      lower.includes('burner')
    ) {
      let targetContainerId = 'burner1';
      if (lower.includes('burner2') || lower.includes('burner 2')) {
        targetContainerId = 'burner2';
      } else if (lower.includes('burner1') || lower.includes('burner 1')) {
        targetContainerId = 'burner1';
      }

      const container = worldStore.getState().containers[targetContainerId];
      if (container) {
        if (lower.includes('turn on') && !container.isOn) {
          worldStore.getState().dispatch({ type: 'TOGGLE_BURNER', payload: { containerId: targetContainerId } });
        } else if (lower.includes('turn off') && container.isOn) {
          worldStore.getState().dispatch({ type: 'TOGGLE_BURNER', payload: { containerId: targetContainerId } });
        } else if (lower.includes('toggle heat') || lower.includes('toggle burner') || lower.includes('burner')) {
          worldStore.getState().dispatch({ type: 'TOGGLE_BURNER', payload: { containerId: targetContainerId } });
        }
      }
    }
  }
  await ctx.wait();
}

export async function handleSpeakStep(
  ctx: RecipeRunnerContext,
  step: SpeakStep
): Promise<void> {
  worldStore.getState().dispatch({
    type: 'UPDATE_ENTITY_STATE',
    payload: {
      entityId: step.mascotId || ctx.mascotId,
      changes: { speechMessage: step.message },
    },
  });
  await ctx.wait();
}

export async function handleCelebrateStep(
  ctx: RecipeRunnerContext,
  step: CelebrateStep
): Promise<void> {
  flipTortilla(step.mascotId || ctx.mascotId);
  await ctx.wait(900);
  clearTortillaGaze(step.mascotId || ctx.mascotId);
}
`````

## File: src/systems/gaze.test.ts
`````typescript
/**
 * FILE: gaze.test.ts
 *
 * PURPOSE:
 * Unit tests for gaze system.
 *
 * RESPONSIBILITY:
 * - Validates mascot gaze target updates, structural equality, and idempotency.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { worldStore } from '../store/worldStore';
import { updateMascotGaze, getMascotGazeTarget } from './gaze';
import type { GazeTarget } from './gaze';

const  FIRE_GAZE: GazeTarget = { type: 'entity', entityId: ' burner1' };

describe('Gaze System', () => {
  beforeEach(() => {
    worldStore.setState({
      entities: {
        chef: {
          id: 'chef',
          name: 'Chef',
          type: 'mascot',
          state: {
            gazingAt: undefined,
          },
        },
      },
      containers: {
        bench: {
          id: 'bench',
          name: 'Workbench',
          type: 'board',
          rules: { maxCapacity: 1 },
          entityIds: [],
        },
        burner1: {
          id: 'burner1',
          name: 'burner1',
          type: 'burner',
          rules: { maxCapacity: Infinity },
          entityIds: [],
        },
        plate: {
          id: 'plate',
          name: 'Plate',
          type: 'storage',
          rules: { maxCapacity: Infinity },
          entityIds: [],
        },
      },
    });
  });

  it('updates mascot gaze target correctly', () => {
    updateMascotGaze('chef',  FIRE_GAZE);
    expect(getMascotGazeTarget('chef')).toEqual( FIRE_GAZE);
  });

  it('is idempotent when gazing at the same target', () => {
    updateMascotGaze('chef',  FIRE_GAZE);
    const firstState = worldStore.getState();

    updateMascotGaze('chef', { type: 'entity', entityId: ' burner1' }); // structurally identical
    const secondState = worldStore.getState();

    expect(firstState).toBe(secondState);
  });

  it('updates when gazing at a different entity', () => {
    updateMascotGaze('chef',  FIRE_GAZE);
    updateMascotGaze('chef', { type: 'entity', entityId: 'plate' });
    expect(getMascotGazeTarget('chef')).toEqual({ type: 'entity', entityId: 'plate' });
  });

  it('can gaze at mouse', () => {
    updateMascotGaze('chef', { type: 'mouse' });
    expect(getMascotGazeTarget('chef')).toEqual({ type: 'mouse' });
  });

  it('can gaze at a point', () => {
    const pointGaze: GazeTarget = { type: 'point', point: { x: 100, y: 200 } };
    updateMascotGaze('chef', pointGaze);
    expect(getMascotGazeTarget('chef')).toEqual(pointGaze);
  });

  it('can clear gaze to null', () => {
    updateMascotGaze('chef',  FIRE_GAZE);
    updateMascotGaze('chef', null);
    expect(getMascotGazeTarget('chef')).toBeNull();
  });
});
`````

## File: src/systems/gaze.ts
`````typescript
/**
 * FILE: gaze.ts
 *
 * PURPOSE:
 * Calculates gaze behavior.
 *
 * RESPONSIBILITY:
 * - Determines what objects attract attention.
 * - Updates gaze-related state.
 */

import { worldStore } from '../store/worldStore';

export interface GazePoint {
  x: number;
  y: number;
}

/**
 * Discriminated union describing what the mascot is looking at.
 *
 * - entity  → a specific world entity (container or ingredient) by id
 * - mouse   → the user's cursor position (resolved by the UI layer)
 * - point   → an explicit SVG/screen coordinate
 * - null    → not gazing at anything; fall back to idle eye position
 */
export type GazeTarget =
  | { type: 'entity'; entityId: string }
  | { type: 'mouse' }
  | { type: 'point'; point: GazePoint }
  | null;

/** Narrow helper — returns the entityId when gazing at an entity, else null. */
export function gazeEntityId(target: GazeTarget): string | null {
  return target?.type === 'entity' ? target.entityId : null;
}

interface GazeState {
  gazingAt?: GazeTarget;
}

/**
 * Updates what target a mascot is looking at.
 * No-ops if the target is structurally identical to the current one.
 */
export function updateMascotGaze(mascotId: string, targetId: GazeTarget): void {
  const current = getMascotGazeTarget(mascotId);

  // Structural equality check — avoids redundant dispatches for the same target.
  if (JSON.stringify(current) === JSON.stringify(targetId)) return;

  worldStore.getState().dispatch({
    type: 'UPDATE_ENTITY_STATE',
    payload: {
      entityId: mascotId,
      changes: { gazingAt: targetId },
    },
  });
}

/** Returns the current gaze target for a mascot entity. */
export function getMascotGazeTarget(mascotId: string): GazeTarget {
  const entity = worldStore.getState().entities[mascotId];
  if (!entity) return null;
  const state = entity.state as GazeState | undefined;
  return state?.gazingAt ?? null;
}

/**
 * Subscribes to gaze changes for a given mascot.
 * Uses Zustand's vanilla subscribe so callers outside React can react to gaze updates
 * without polling or re-rendering unrelated components.
 *
 * Returns an unsubscribe function.
 *
 * @example
 *   const unsub = subscribeToGaze('chef', (target) => console.log(target));
 *   // later:
 *   unsub();
 */
export function subscribeToGaze(
  mascotId: string,
  callback: (target: GazeTarget) => void
): () => void {
  let prev = getMascotGazeTarget(mascotId);

  return worldStore.subscribe((state) => {
    const next = (state.entities[mascotId]?.state as GazeState | undefined)?.gazingAt ?? null;
    // Only fire when the gaze actually changes (structural check).
    if (JSON.stringify(next) !== JSON.stringify(prev)) {
      prev = next;
      callback(next);
    }
  });
}
`````

## File: src/systems/mascotActions.ts
`````typescript
/**
 * FILE: mascotActions.ts
 *
 * PURPOSE:
 * Action dispatcher helpers for mascot (Tortilla) commands.
 *
 * RESPONSIBILITY:
 * - Provides reusable, generic action dispatchers for AI agents or UI triggers.
 * - Handles tortilla movement, grabbing ingredients from containers, dropping ingredients into containers, and flipping.
 */

import { worldStore } from '../store/worldStore';
import { recipes } from '../data/catalog/recipes';
import { RecipeRunner } from './recipeRunner';

/**
 * Triggers Tortilla flip animation and records action in store.
 */
export function flipTortilla(mascotId: string = 'chef'): void {
  worldStore.getState().dispatch({
    type: 'MASCOT_FLIP',
    payload: { mascotId },
  });
}

/**
 * Moves Tortilla gaze/focus to a specific container in the world.
 */
export function moveTortillaTo(targetContainerId: string, mascotId: string = 'chef'): void {
  worldStore.getState().dispatch({
    type: 'MASCOT_MOVE',
    payload: { mascotId, targetContainerId },
  });
}

/**
 * Clears Tortilla's gaze — mascot returns to idle eye position (gazingAt: null).
 * Use instead of moveTortillaTo('') when there is no meaningful target.
 */
export function clearTortillaGaze(mascotId: string = 'chef'): void {
  worldStore.getState().dispatch({
    type: 'MASCOT_CLEAR_GAZE',
    payload: { mascotId },
  });
}

/**
 * Commands Tortilla to grab/pick up an ingredient from a container.
 */
export function grabIngredient(
  entityId: string,
  sourceContainerId?: string,
  mascotId: string = 'chef'
): void {
  worldStore.getState().dispatch({
    type: 'MASCOT_GRAB',
    payload: { mascotId, entityId, sourceContainerId },
  });
}

/**
 * Commands Tortilla to drop the currently held ingredient into a target container.
 */
export function dropIngredient(
  targetContainerId: string,
  positionIndex?: number,
  mascotId: string = 'chef'
): void {
  worldStore.getState().dispatch({
    type: 'MASCOT_DROP',
    payload: { mascotId, targetContainerId, positionIndex },
  });
}

/**
 * Commands Tortilla to execute a sequence:
 * 1. Move focus to despensa
 * 2. Grab potato from despensa
 * 3. Move focus to board (tabla)
 * 4. Drop potato into board
 * 5. Flip Tortilla mascot
 */
export async function runTortillaPotatoScript(
  mascotId: string = 'chef',
  delayMs: number = 600
): Promise<void> {
  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // 1. Look at despensa
  moveTortillaTo('despensa', mascotId);
  await wait(delayMs);

  // 2. Grab potato from despensa
  grabIngredient('potato', 'despensa', mascotId);
  await wait(delayMs);

  // 3. Look at board (tabla)
  moveTortillaTo('board', mascotId);
  await wait(delayMs);

  // 4. Drop potato in board
  dropIngredient('board', undefined, mascotId);
  await wait(delayMs);

  // 5. Flip Tortilla
  flipTortilla(mascotId);
  await wait(900);

  // 6. Return home gracefully — clear gaze instead of setting an empty string target
  clearTortillaGaze(mascotId);
}

/**
 * Commands Tortilla to follow a recipe by running its step-based state machine.
 */
export async function runFollowRecipeScript(
  recipeId: string,
  mascotId: string = 'chef',
  targetContainerId: string = 'board',
  delayMs: number = 600
): Promise<void> {
  const activeRecipe = recipes.find((r) => r.id === recipeId);
  if (!activeRecipe) return;

  const runner = new RecipeRunner({
    mascotId,
    defaultTargetId: targetContainerId,
    delayMs,
  });

  await runner.runRecipe(activeRecipe);
}
`````

## File: src/systems/queries.test.ts
`````typescript
/**
 * FILE: queries.test.ts
 *
 * PURPOSE:
 * Unit tests for query system functions.
 *
 * RESPONSIBILITY:
 * - Tests entity and container query helpers.
 */

import { describe, expect, it } from 'vitest';
import { getContainerByEntityId, getEntitiesInContainer, getEntityById } from './queries';
import type { WorldState } from '../types/world';

describe('Query System', () => {
  const mockState: WorldState = {
    entities: {
      tomato: { id: 'tomato', name: 'Tomato', type: 'ingredient', state: { sliced: false } },
      onion: { id: 'onion', name: 'Onion', type: 'ingredient', state: { sliced: true } },
    },
    containers: {
      pantry: {
        id: 'pantry',
        name: 'Pantry',
        type: 'storage',
        rules: { maxCapacity: 10 },
        entityIds: ['tomato'],
      },
      board: {
        id: 'board',
        name: 'Cutting Board',
        type: 'board',
        rules: { maxCapacity: 2 },
        entityIds: ['onion'],
      },
    },
    dispatch: () => {},
  };

  it('retrieves an entity by ID', () => {
    const entity = getEntityById(mockState, 'tomato');
    expect(entity).toBeDefined();
    expect(entity?.name).toBe('Tomato');
  });

  it('finds the parent container for a given entity ID', () => {
    const container = getContainerByEntityId(mockState, 'onion');
    expect(container).toBeDefined();
    expect(container?.id).toBe('board');
  });

  it('returns all entities inside a specified container', () => {
    const boardEntities = getEntitiesInContainer(mockState, 'board');
    expect(boardEntities).toHaveLength(1);
    expect(boardEntities[0].id).toBe('onion');
  });
});
`````

## File: src/components/Ingredients/IngredientList.tsx
`````typescript
/**
 * FILE: IngredientList.tsx
 *
 * PURPOSE:
 * Displays a collection/container of ingredients.
 *
 * RESPONSIBILITY:
 * - Renders container title and its inner entities.
 * - Acts as a droppable target for drag-and-drop.
 */

import { useStore } from 'zustand';
import { useDroppable } from '@dnd-kit/core';
import { worldStore } from '../../store/worldStore';
import type { Container, Entity } from '../../types/world';
import { IngredientListItem } from './IngredientListItem';

interface IngredientListProps {
  key?: string | number;
  container: Container;
}

export function IngredientList({ container }: IngredientListProps) {
  const entities = useStore(worldStore, (state) => state.entities);

  // Set up dnd-kit droppable binding for this container
  const { setNodeRef, isOver } = useDroppable({
    id: container.id,
  });

  const containerEntities = container.entityIds
    .map((id: string) => entities[id])
    .filter((e: Entity | undefined): e is Entity => Boolean(e));

  const getWorkstationBadge = (id: string) => {
    switch (id) {
      case 'sink': return 'Washing Area 💧';
      case 'board': return 'Cutting Workspace 🔪';
      case 'bowl': return 'Preparation 🥣';
      case 'pan': return 'Cooking Heat 🍳';
      case 'plate': return 'Serving Stage 🍽️';
      case 'despensa': return 'Pantry 🧺';
      default: return 'Workstation 🍳';
    }
  };

  return (
    <div 
      ref={setNodeRef} 
      data-container-id={container.id}
      className={`ingredient-list workstation-${container.id} ${isOver ? 'drag-over' : ''}`}
    >
      <div className="workstation-header">
        <h3>{container.name}</h3>
        <span className="workstation-type-badge">{getWorkstationBadge(container.id)}</span>
      </div>
      <div className="items-container">
        {containerEntities.map((entity: Entity) => (
          <IngredientListItem key={entity.id} entity={entity} containerId={container.id} />
        ))}
        {containerEntities.length === 0 && (
          <span className="empty-hint">Drop ingredients here</span>
        )}
      </div>
    </div>
  );
}
`````

## File: src/components/Ingredients/IngredientListItem.tsx
`````typescript
/**
 * FILE: IngredientListItem.tsx
 *
 * PURPOSE:
 * UI wrapper for an ingredient inside a list.
 *
 * RESPONSIBILITY:
 * - Connects ingredient rendering with list interactions.
 * - Provides drag/drop related UI behavior.
 */

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import type { Entity } from '../../types/world';

interface IngredientListItemProps {
  entity: Entity;
  containerId?: string;
}

export const IngredientListItem: React.FC<IngredientListItemProps> = ({ entity, containerId }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: entity.id,
  });

  const style: React.CSSProperties | undefined = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.6 : 1,
        zIndex: isDragging ? 1000 : 1,
        cursor: 'grab',
      }
    : {
        cursor: 'grab',
      };

  // Determine ingredient state badge (Raw, Prepared, Cooking, Finished)
  const renderStateBadge = () => {
    if (entity.type !== 'ingredient') return null;

    const prep = entity.state?.preparation as string | undefined;
    const cooking = entity.state?.cooking as string | undefined;
    const status = entity.state?.status as string | undefined;

    if (containerId === 'plate' || status?.includes('cooked') || status?.includes('fried') || status?.includes('tortilla')) {
      return <span className="ingredient-state-badge state-finished">Finished ✨</span>;
    }
    if (cooking && cooking !== 'raw') {
      return <span className="ingredient-state-badge state-cooking">Cooking 🔥</span>;
    }
    if (prep) {
      return <span className="ingredient-state-badge state-prepared">Prepared 🔪</span>;
    }
    return <span className="ingredient-state-badge state-raw">Raw 🌾</span>;
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`ingredient-list-item ${isDragging ? 'dragging' : ''}`}
    >
      <span className="ingredient-name">{entity.name}</span>
      {renderStateBadge()}
    </div>
  );
};
`````

## File: src/components/World/ContainerView.tsx
`````typescript
/**
 * FILE: ContainerView.tsx
 *
 * PURPOSE:
 * Displays a world container and its owned entities.
 *
 * RESPONSIBILITY:
 * - Renders container title and its inner entities via EntityView.
 * - Acts as a droppable target for drag-and-drop actions.
 */

import React from 'react';
import { useStore } from 'zustand';
import { useDroppable } from '@dnd-kit/core';
import { motion, AnimatePresence } from 'framer-motion';
import { worldStore } from '../../store/worldStore';
import type { Container, Entity } from '../../types/world';
import { EntityView } from './EntityView';
import './World.scss';

interface ContainerViewProps {
  key?: string | number;
  container: Container;
}

export const ContainerView: React.FC<ContainerViewProps> = ({ container }) => {
  const entities = useStore(worldStore, (state) => state.entities);

  // Set up dnd-kit droppable binding for this container
  const { setNodeRef, isOver } = useDroppable({
    id: container.id,
  });

  const containerEntities = container.entityIds
    .map((id: string) => entities[id])
    .filter((e: Entity | undefined): e is Entity => Boolean(e));

  const isMixturePresent = containerEntities.some(
    (e) => e.id.includes('mixture') || e.name.toLowerCase().includes('mixture')
  );

  const getWorkstationBadge = (id: string) => {
    switch (id) {
      case 'sink': return 'Washing Area 💧';
      case 'board': return 'Cutting Workspace 🔪';
      case 'bowl': return 'Preparation 🥣';
      case 'burner': return 'Cooking Heat 🍳';
      case 'burner1': return 'Cooking Heat 1🍳';
      case 'burner2': return 'Cooking Heat 2🍳';
      case 'plate': return 'Serving Stage 🍽️';
      case 'despensa': return 'Pantry 🧺';
      default: return 'Workstation 📦';
    }
  };

  const containerOnFireClass = container.isOn ? 'container-onFire' : '';
  const dispatch = useStore(worldStore, (state) => state.dispatch);

  const isCookingArea =
    container.type === 'burner' ||
    container.id.includes('burner') ||
    container.id.includes('pan') ||
    container.id.includes('stove');
  const isSink = container.type === 'sink' || container.id.includes('sink');
  const isCuttingBoard =
    container.type === 'board' ||
    container.id.includes('board') ||
    container.id.includes('cutting');
  const isBowl = container.type === 'bowl' || container.id.includes('bowl');

  return (
    <div
      ref={setNodeRef}
      data-container-id={container.id}
      className={`${container.isOn ? 'container-view--on' : ''} ${containerOnFireClass} container-view container-view--${container.id} ${isOver ? 'container-view--drag-over' : ''} ${isMixturePresent ? 'container-view--mixture' : ''}`}
    >
      <div className="container-view__header">
        <h3 className="container-view__title">{container.name}</h3>
        <span className="container-view__badge">{getWorkstationBadge(container.id)}</span>
        {isCookingArea && (
          <button
            type="button"
            className={`burner-toggle ${container.isOn ? 'burner-toggle--on' : ''}`}
            title="Toggle Heat"
            onClick={(e) => {
              e.stopPropagation();

              dispatch({
                type: 'TOGGLE_HEAT',
                payload: {
                  containerId: container.id,
                },
              });
            }}
          />
        )}
      </div>

      {(isCookingArea || isSink || isCuttingBoard || isBowl) && (
        <div className="container-view__actions">
          {isCookingArea && (
            <button
              type="button"
              className={`container-action-btn toggle-heat-btn ${container.isOn ? 'container-action-btn--active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                dispatch({
                  type: 'TOGGLE_HEAT',
                  payload: { containerId: container.id },
                });
              }}
            >
              🔥 On/Off
            </button>
          )}

          {isSink && (
            <button
              type="button"
              className="container-action-btn wash-btn"
              onClick={(e) => {
                e.stopPropagation();
                dispatch({
                  type: 'WASH_CONTAINER_CONTENTS',
                  payload: { containerId: container.id },
                });
              }}
            >
              🧼 Wash
            </button>
          )}

          {isCuttingBoard && (
            <>
              <button
                type="button"
                className="container-action-btn cut-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch({
                    type: 'CUT_CONTAINER_CONTENTS',
                    payload: { containerId: container.id },
                  });
                }}
              >
                🔪 Cut
              </button>
              <button
                type="button"
                className="container-action-btn peel-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch({
                    type: 'PEEL_CONTAINER_CONTENTS',
                    payload: { containerId: container.id },
                  });
                }}
              >
                🥔 Peel
              </button>
            </>
          )}

          {isBowl && (
            <button
              type="button"
              className="container-action-btn mix-btn"
              onClick={(e) => {
                e.stopPropagation();
                dispatch({
                  type: 'MIX_CONTAINER_CONTENTS',
                  payload: { containerId: container.id },
                });
              }}
            >
              🥣 Mix
            </button>
          )}
        </div>
      )}

      <div className="container-view__items">
        <AnimatePresence mode="popLayout">
          {containerEntities.map((entity: Entity) => {
            const isMixture = entity.id.includes('mixture') || entity.name.toLowerCase().includes('mixture');
            return (
              <motion.div
                key={entity.id}
                layout
                initial={
                  isMixture
                    ? { scale: 0.1, rotate: -180, opacity: 0 }
                    : { scale: 0.8, opacity: 0, y: -10 }
                }
                animate={
                  isMixture
                    ? {
                      scale: [0.2, 1.15, 1],
                      rotate: [-180, 10, 0],
                      opacity: 1,
                      transition: { duration: 0.65, ease: 'easeOut' },
                    }
                    : { scale: 1, rotate: 0, opacity: 1, y: 0 }
                }
                exit={{
                  scale: 0,
                  rotate: 180,
                  opacity: 0,
                  filter: 'blur(4px)',
                  transition: { duration: 0.5, ease: 'easeInOut' },
                }}
                transition={{ duration: 0.35 }}
              >
                <EntityView entity={entity} containerId={container.id} />
              </motion.div>
            );
          })}
        </AnimatePresence>
        {containerEntities.length === 0 && (
          <span className="container-view__empty-hint">Drop entities here</span>
        )}
      </div>
    </div>
  );
};
`````

## File: src/systems/mascot.ts
`````typescript
/**
 * FILE: mascot.ts
 *
 * PURPOSE:
 * Mascot state definitions and behavior functions.
 *
 * RESPONSIBILITY:
 * - Defines mascot visual states ('idle', 'cooking', 'celebrating', etc.).
 */

export type MascotState = 'idle' | 'cooking' | 'celebrating' | 'thinking' | 'flipping' | string;
`````

## File: src/systems/queries.ts
`````typescript
/**
 * FILE: queries.ts
 *
 * PURPOSE:
 * Read-only world queries and selectors.
 *
 * RESPONSIBILITY:
 * - Finds entities by ID or container.
 * - Filters world state data for systems and components.
 *
 * SHOULD NOT:
 * - Modify world state.
 */

import type { Container, Entity, WorldState } from '../types/world';

/**
 * Retrieves an entity by its unique ID from the world state.
 */
export const getEntityById = (state: WorldState, entityId: string): Entity | undefined => {
  return state.entities[entityId];
};

/**
 * Retrieves the container that currently holds the given entity ID.
 */
export const getContainerByEntityId = (
  state: WorldState,
  entityId: string
): Container | undefined => {
  return Object.values(state.containers).find((container) =>
    container.entityIds.includes(entityId)
  );
};

/**
 * Retrieves all entities contained within a specific container.
 */
export const getEntitiesInContainer = (state: WorldState, containerId: string): Entity[] => {
  const container = state.containers[containerId];
  if (!container) return [];

  return container.entityIds
    .map((id) => state.entities[id])
    .filter((entity): entity is Entity => entity !== undefined);
};
`````

## File: src/index.scss
`````scss
/**
 * FILE: src/index.scss
 *
 * PURPOSE:
 * Global stylesheet for Tortilla World.
 * Establishes warm Spanish kitchen simulation theme, global CSS variables, typography, and workstation layouts.
 */

@use 'sass:color';
@use './styles/variables' as *;
@use './styles/mixins' as *;

:root {
  --text: #{$dark-brown};
  --text-h: #{$dark-brown};
  --text-muted: #{$wood-muted};
  --bg: #{$warm-cream};
  --card-bg: #{$warm-surface};
  --border: #{$warm-border};
  --code-bg: #{$warm-beige};

  // Primary palette tokens
  --primary: #{$tortilla-yellow};
  --primary-hover: #{$tortilla-yellow-hover};
  --secondary: #{$olive-green};
  --secondary-hover: #{$olive-green-hover};
  --accent: #{$terracotta};
  --accent-hover: #{$terracotta-hover};

  --shadow: #{$shadow-ceramic};
  --shadow-hover: #{$shadow-ceramic-hover};

  --font-sans: #{$font-family};
  --font-mono: #{$font-mono};

  font-family: var(--font-sans);
  color-scheme: light;
  color: var(--text);
  background-color: var(--bg);
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--bg);
  color: var(--text);
  background-image: radial-gradient(#{$warm-border} 0.75px, transparent 0.75px);
  background-size: 20px 20px;
  min-height: 100vh;
}

#root {
  max-width: 1240px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  min-height: 100vh;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-sans);
  color: var(--text-h);
  font-weight: 700;
  line-height: 1.25;
}

h1 {
  font-size: 1.85rem;
  letter-spacing: -0.02em;
}

p {
  line-height: 1.5;
}

// === SCENE GRID LAYOUT & WORKSTATIONS ===
.scene-container {
  margin-top: 20px;
  width: 100%;
}

.scene-workspace {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  width: 100%;
  margin-top: 16px;

  @media (max-width: 860px) {
    flex-direction: column;
  }
}

.scene {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
  width: 100%;
  flex: 1;
  box-sizing: border-box;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

// === WORKSTATION CONTAINER SPECIFIC THEMES ===
.ingredient-list {
  @include ceramic-card($warm-surface, $warm-border);
  padding: 16px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  position: relative;

  &.drag-over {
    border-color: $tortilla-yellow-border !important;
    background-color: $tortilla-yellow-light !important;
    box-shadow: 0 0 0 3px rgba(232, 168, 56, 0.25) !important;
  }

  // Workstation header
  .workstation-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 2px dashed color.mix($dark-brown, white, 15%);

    h3 {
      font-size: 1rem;
      margin: 0;
      color: $dark-brown;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .workstation-type-badge {
      font-size: 0.72rem;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: $radius-sm;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
  }

  // Pantry Storage Theme
  &.workstation-pantry, &.workstation-despensa {
    background: $pantry-bg;
    border-color: $pantry-border;
    .workstation-type-badge {
      background: color.mix($pantry-accent, white, 15%);
      color: $pantry-accent;
      border: 1px solid color.mix($pantry-accent, white, 30%);
    }
  }

  // Washing Station Theme (Sink)
  &.workstation-sink, &.workstation-washing_station {
    background: $washing-bg;
    border-color: $washing-border;
    .workstation-type-badge {
      background: color.mix($washing-accent, white, 15%);
      color: $washing-accent;
      border: 1px solid color.mix($washing-accent, white, 30%);
    }
  }

  // Cutting Station Theme (Board)
  &.workstation-board, &.workstation-cutting_station {
    background: $cutting-bg;
    border-color: $cutting-border;
    .workstation-type-badge {
      background: color.mix($cutting-accent, white, 15%);
      color: $cutting-accent;
      border: 1px solid color.mix($cutting-accent, white, 30%);
    }
  }

  // Preparation Station Theme (Bowl)
  &.workstation-bowl, &.workstation-preparation_station {
    background: $mixing-bg;
    border-color: $mixing-border;
    .workstation-type-badge {
      background: color.mix($mixing-accent, white, 15%);
      color: $mixing-accent;
      border: 1px solid color.mix($mixing-accent, white, 30%);
    }
  }

  // Cooking Station Theme (Pan)
  &.workstation-pan, &.workstation-cooking_station {
    background: $cooking-bg;
    border-color: $cooking-border;
    .workstation-type-badge {
      background: color.mix($cooking-accent, white, 15%);
      color: $cooking-accent;
      border: 1px solid color.mix($cooking-accent, white, 30%);
    }
  }

  // Serving Station Theme (Plate)
  &.workstation-plate, &.workstation-serving_station {
    background: $serving-bg;
    border-color: $serving-border;
    .workstation-type-badge {
      background: color.mix($serving-accent, white, 15%);
      color: $serving-accent;
      border: 1px solid color.mix($serving-accent, white, 30%);
    }
  }

  .items-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex-grow: 1;
  }

  .empty-hint {
    font-size: 0.82rem;
    color: $wood-muted;
    font-style: italic;
    margin: auto;
    text-align: center;
    padding: 12px 0;
    opacity: 0.7;
  }
}

// === INGREDIENT LIST ITEM & STATE STYLES ===
.ingredient-list-item {
  background: #ffffff;
  border: 1px solid $warm-border;
  border-radius: $radius-md;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  font-size: 0.92rem;
  color: $dark-brown;
  box-shadow: 0 2px 6px rgba(44, 26, 20, 0.04);
  user-select: none;
  touch-action: none;
  transition: all 0.18s ease;

  &:hover {
    border-color: color.mix($tortilla-yellow, $warm-border, 50%);
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(44, 26, 20, 0.08);
  }

  &.dragging {
    box-shadow: $shadow-floating;
    opacity: 0.85;
    transform: scale(1.02);
  }

  // === INGREDIENT STATE COLOR BADGES ===
  .ingredient-state-badge {
    font-size: 0.72rem;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: $radius-sm;
    margin-left: 8px;
    white-space: nowrap;

    &.state-raw {
      background: $state-raw-bg;
      border: 1px solid $state-raw-border;
      color: $state-raw-text;
    }

    &.state-prepared {
      background: $state-prep-bg;
      border: 1px solid $state-prep-border;
      color: $state-prep-text;
    }

    &.state-cooking {
      background: $state-cook-bg;
      border: 1px solid $state-cook-border;
      color: $state-cook-text;
    }

    &.state-finished {
      background: $state-finished-bg;
      border: 1px solid $state-finished-border;
      color: $state-finished-text;
    }
  }
}
`````

## File: docs/systems.md
`````markdown
# Systems

## Overview

Systems contain the behaviour of Tortilla World.

Components display the world.
Systems modify the world.

A system receives actions, validates them, and updates the world state.

The general flow is:

```text
Input
  |
  v
Action
  |
  v
System
  |
  v
Validation
  |
  v
World State Update
  |
  v
UI Update
```

---

# System Architecture

Tortilla World is based on independent systems.

Current and planned systems:

```text
Systems

├── Interaction System
├── Movement System
├── Container System
├── Mascot System
├── Animation System
├── Cooking System
└── AI System
```

Each system has a clear responsibility.

---

# Interaction System

## Responsibility

The Interaction System converts external events into world actions.

External events:

* mouse clicks
* drag and drop
* AI requests
* future keyboard/gamepad input

The Interaction System does not modify the world directly.

---

## Example

User drags potato into pan.

The Interaction System creates:

```ts
{
  type:"MOVE_ENTITY",
  entityId:"potato",
  targetContainer:"pan"
}
```

The action is passed to the Movement System.

---

# Movement System

## Responsibility

The Movement System controls ownership changes.

It handles:

* moving entities
* validating source ownership
* validating destination rules
* applying transfer behaviour

---

## Move Flow

```text
Move Request

      |
      v

Find Entity

      |
      v

Find Current Container

      |
      v

Find Target Container

      |
      v

Validate Move

      |
      v

Apply Transfer Rule

      |
      v

Update Ownership

```

---

# Move Validation

Before moving an entity, the system checks:

## Entity existence

Does the entity exist?

Example:

```text
potato
```

must exist in the world.

---

## Source ownership

Does the source container own the entity?

Example:

Valid:

```text
Kitchen owns potato
```

Invalid:

```text
Pan owns potato
```

when moving from Kitchen.

---

## Destination capability

Can the target container accept this entity?

Example:

A pan may accept:

```text
ingredient
```

but reject:

```text
container
```

---

## Duplicate rules

The container checks uniqueness.

Example:

Valid:

```text
Recipe

potato
egg
```

Invalid:

```text
Recipe

potato
potato
```

---

# Transfer Rules

A move is not always the same operation.

Containers define transfer behaviour.

---

# Static Container To Dynamic Container

Example:

```text
Kitchen
 |
 potato


Recipe
```

Move potato:

Result:

```text
Kitchen
 |
 potato


Recipe
 |
 potato
```

The destination receives the ingredient.

The source remains unchanged.

This represents a world resource.

---

# Dynamic Container To Dynamic Container

Example:

```text
Recipe
 |
 potato


Pan
```

Move potato:

Result:

```text
Recipe


Pan
 |
 potato
```

Ownership transfers.

---

# Dynamic Container To Static Container

Example:

```text
Recipe
 |
 potato


Kitchen
```

Move potato back.

Result:

```text
Recipe


Kitchen
 |
 potato
```

The dynamic container loses ownership.

The static container provides the original world resource.

---

# Container System

## Responsibility

The Container System manages container rules.

It answers questions:

* Can this entity be added?
* Can this entity be removed?
* Are duplicates allowed?
* Is the container full?
* Does ordering matter?

---

## Example API

```ts
canAccept(
  container,
  entity
)
```

returns:

```ts
true
```

or:

```ts
false
```

---

# Action Queue

## Responsibility

All world changes should pass through an action queue.

Example:

```text
AI
 |
User
 |
System
 |
Action Queue
 |
World Update
```

---

## Example Action

```ts
{
 type:"MOVE_ENTITY",

 entityId:"egg",

 source:"kitchen",

 target:"recipe"
}
```

---

## Benefits

Action queues provide:

* debugging
* replay
* logging
* AI control
* animations
* delayed actions

---

# Action Replay System (`ActionPlayer` & `ActionReplayer`)

## Responsibility

The Action Replay System enables recording, storing, and sequentially replaying discrete `WorldAction` JSON logs in Tortilla World.

It consists of:
1. **Headless Replay Utility (`src/systems/actionPlayer.ts`)**:
   - `ActionPlayer` class / `actionPlayer` singleton.
   - `playLog(actions: WorldAction[], options?: PlaybackOptions)`: Resets world state via `RESET_WORLD` action, then dispatches each action step sequentially to `worldStore.getState().dispatch(action)` with configurable delays.
   - Provides step progress callbacks (`onStep(current, total, action)`), completion callbacks (`onComplete()`), and early cancellation (`stop()`).

2. **React Controls UI (`src/components/Controls/ActionReplayer.tsx`)**:
   - Accepts uploaded `.json` files via `FileReader`.
   - Validates JSON format to ensure an array of valid `WorldAction` objects.
   - Displays live step progress (`Step X / Y`), progress bar, step delay selector, and a Stop button.

---

# Animation System

## Responsibility

The Animation System reacts to world changes.

It does not decide what happens.

Example:

Movement System:

```text
Potato moved to Pan
```

Animation System:

```text
Play potato movement animation
```

---

## Separation

Bad:

```text
Drag component:
move object
animate object
change state
```

Good:

```text
Drag component:
create action


Movement System:
change state


Animation System:
animate change
```

---

# Cooking System

## Responsibility

Future system for transforming entities.

Examples:

```text
Potato
+
Oil
+
Heat

    |
    v

Fried Potato
```

---

The cooking system changes entity state.

Example:

Before:

```ts
{
 type:"ingredient",
 state:"raw"
}
```

After:

```ts
{
 type:"ingredient",
 state:"cooked"
}
```

---

# AI System

## Responsibility

The AI System creates actions.

The AI does not directly manipulate Zustand state.

---

Example:

AI decides:

```text
Prepare tortilla
```

Creates:

```ts
[
 {
  type:"MOVE_ENTITY",
  entityId:"potato",
  target:"pan"
 },

 {
  type:"ADD_HEAT",
  target:"pan"
 }
]
```

The normal systems execute them.

---

# System Communication

Systems communicate through actions and world state.

Example:

```text
Interaction System

        |
        v

Move Action

        |
        v

Movement System

        |
        v

World Store

        |
        v

Animation System

```

---

# Zustand Responsibility

Zustand is the storage layer.

It stores:

* entities
* containers
* relationships
* world state

It should not contain UI logic.

---

Example:

Good:

```ts
moveEntity(
 entityId,
 from,
 to
)
```

Bad:

```ts
onDropIngredient(
 mouseEvent
)
```

---

# Testing Strategy

Systems should be testable without React.

Example:

```ts
moveEntity(
 "potato",
 "kitchen",
 "pan"
)
```

Expected:

```text
Kitchen:
empty

Pan:
potato
```

---

# Future Systems

Possible additions:

## Time System

Controls:

* cooking duration
* day/night
* events

---

## Physics System

Controls:

* collisions
* falling objects
* movement

---

## Economy System

Controls:

* ingredients cost
* customers
* money

---

## Character System

Controls:

* NPCs
* player actions
* behaviours

---

## Mascot System & Recipe System

### Mascot System
Controls:

* `MASCOT_FLIP`: Flips Tortilla mascot in place.
* `MASCOT_MOVE`: Moves gaze/focus of Tortilla to target container.
* `MASCOT_GRAB`: Commands Tortilla to grab ingredient entity from a container.
* `MASCOT_DROP`: Commands Tortilla to drop held ingredient into target container obeying rules.

Dispatch helpers and automated action sequences (e.g. `runFollowRecipeScript`) are located in `src/systems/mascotActions.ts` for AI agent, console, or UI integration.

React components (`Mascot.tsx`) translate pure target container state into physical Framer Motion spring translations across the DOM viewport without touching store logic.

---

### Recipe System & RecipeRunner

The Recipe System executes declarative, step-based recipe state machines via `RecipeRunner` (`src/systems/recipeRunner.ts` / `src/systems/recipeRunner/`).

#### Architecture:
* **Declarative Data**: Recipes (`RecipeStep[]`) define *what* needs to happen (e.g. `move`, `grab`, `drop`, `cut`, `cook`, `mix`, `wait`, `flip`, `speak`, `celebrate`) without referencing specific kitchen containers or locations.
* **Modular Handler Architecture**: `RecipeRunner` delegates step execution to focused step handlers (`src/systems/recipeRunner/handlers/`):
  - `moveHandlers.ts`: Relocation steps (`move`, `grab`, `drop`).
  - `prepHandlers.ts`: Preparation steps (`cut`, `prepare`, `peel`, `wash`, `rinse`, `drain`).
  - `cookHandlers.ts`: Thermal & flip steps (`cook`, `flip`).
  - `mixHandlers.ts`: Combination steps (`mix`, `beat`, `combine`).
  - `utilityHandlers.ts`: Narrative & completion steps (`serve`, `wait`, `instruction`, `speak`, `celebrate`).
* **Workstation & Tool Resolution**: `RecipeRunner` dynamically queries the Workstation engine (`src/engine/workstations.ts`) to determine the required workstation (`pantry`, `washing_station`, `cutting_station`, `preparation_station`, `cooking_station`, `serving_station`) and tools (`knife`, `peeler`, `whisk`, `fork`, `spatula`, etc.) for each step.
* **Generic Execution**: `RecipeRunner` iterates over recipe steps and dispatches appropriate world/mascot actions.
* **Entity Identity Preservation**: Ingredient state mutations (such as preparation: `whole` ➔ `diced` or cooking: `raw` ➔ `fried`) modify the target entity's `state` via `PREPARE_INGREDIENT` or `COOK_INGREDIENT` without creating or destroying entities.

---

### Action Recording & Replay System

* **Action Log Integration**: World actions are captured in `recordSlice` when recording mode is active.
* **Store Synchronization**: Loaded action sequences are loaded directly into `worldStore` state via `setRecordedActions`.
* **Controls Reference Recorded Actions**: When recording mode or a loaded recorded session is active, player controls (`Play`, `Pause`, `Step Up`, `Step Down`, stepper dots) reference the sequence of actual `WorldAction` items instead of static recipe steps, stepping through or jumping across logged world state mutations directly.

---

### Recipe Translator System (`src/systems/recipeTranslator.ts`)

* **Purpose**: Converts human-recorded kitchen interactions into executable mascot-guided recipes where Tortilla moves focus, grabs, and places ingredients across containers.
* **Mascot Action Expansion** (`translateHumanActionsToMascotActions`):
  - Injects `MASCOT_MOVE` focus, `MASCOT_GRAB`, and `MASCOT_DROP` steps around raw human `MOVE_ENTITY` actions.
  - Injects `MASCOT_MOVE` focus steps prior to `TOGGLE_BURNER`, `PREPARE_INGREDIENT`, `COOK_INGREDIENT`, and `ADD_ENTITY` actions.
* **Declarative Recipe File Generation** (`translateHumanActionsToRecipe`):
  - Extracts clean entity names and requirements.
  - Generates a valid `Recipe` definition (with `id`, `name`, `requirements`, and `steps`) suitable for export as `.json` or execution via `RecipeRunner`.
* **UI Mode Separation**:
  - `📖 Play Catalog Recipe Mode`: Dedicated to catalog recipe execution (`RecipePlayer.tsx`).
  - `🎥 Action Recorder & Translator Mode`: Dedicated to live action recording, log replaying, human-to-mascot recipe translation (`ActionRecorder.tsx`), tracking used ingredients (`usedIngredients`), and an interactive right-side ingredients catalog panel (`IngredientsSidebar.tsx`).

---

# Final Principle

The rule of Tortilla World:

```text
Components show the world.

Systems change the world.

Containers define the rules.

Actions describe intentions.

The Store remembers the result.
```
`````

## File: src/data/catalog/recipes/clasica.ts
`````typescript
/**
 * FILE: clasica.ts
 *
 * PURPOSE:
 * Recipe definition for Tortilla Clásica (without onion).
 *
 * RESPONSIBILITY:
 * - Defines the ingredients, quantities, and cooking process.
 * - Describes recipe actions in a declarative format.
 * - Provides a Cooklang representation for humans.
 *
 * NOTE:
 * Recipes describe WHAT happens.
 * The RecipeRunner decides HOW it happens:
 * - finding ingredients
 * - moving the chef
 * - animations
 * - changing entity state
 * - creating intermediate results
 */

import type { Recipe } from '../../../types/Recipe';

export const clasicaRecipe: Recipe = {
  id: 'clasica',

  name: 'Clásica',

  requirements: {
    potatoes: {
      entityId: 'potato',
      amount: 4,
      unit: 'pcs',
    },

    eggs: {
      entityId: 'egg',
      amount: 6,
      unit: 'pcs',
    },

    garlic: {
      entityId: 'garlic',
      amount: 1,
      unit: 'head',
    },

    oil: {
      entityId: 'oil',
      amount: 100,
      unit: 'ml',
    },

    salt: {
      entityId: 'salt',
      amount: 1,
      unit: 'tsp',
    },

    black_pepper: {
      entityId: 'black_pepper',
      amount: 1,
      unit: 'pinch',
    },
  },

  steps: [
  {
    action: 'prepare',
    target: 'garlic',
    preparation: 'peeled',
  },

  // Heat oil first
  {
    action: 'cook',
    target: 'oil',
    method: 'heat',
  },

  // Fry garlic (consumes oil)
  {
    action: 'cook',
    target: 'garlic',
    method: 'fry',
    instruction: 'Que no se quemen.', // Cook but don't burn
  },

  // IMPORTANT: Move garlic out IMMEDIATELY after cooking
  {
    action: 'move',
    ingredient: 'garlic',
    target: 'plate',  // Move to pantry
    source: 'pan',     // From pan
  },

  // Now cook potatoes in the same oil (oil already used from garlic step)
  {
    action: 'cook',
    target: 'potatoes',
    method: 'fry',
  },

  // Beat eggs
  {
    action: 'prepare',
    target: 'eggs',
    preparation: 'beaten',
  },

  // Mix all together including garlic from pantry
  {
    action: 'mix',
    inputs: [
      'potatoes',      // From pan
      'eggs',          // Fresh
      'salt',          // Fresh
      'black_pepper',  // Fresh
      'garlic'         // From pantry (cooked earlier)
    ],
    output: 'mixture',
  },

    {
      action: 'cook',
      target: 'mixture',
      method: 'fry',
      duration: 5,
      unit: 'min',
    },

    {
      action: 'instruction',
      text: 'Con una espátula blanda, asegúrate de que la tortilla no se pega a la sartén.',
    },

    {
      action: 'flip',
      target: 'mixture',
      instruction: 'Dale la vuelta a la tortilla.',
    },

    {
      action: 'cook',
      target: 'mixture',
      method: 'fry',
      duration: 5,
      unit: 'min',
      instruction: 'Deja cocinar por otros 5 min.',
    },

    {
      action: 'serve',
      target: 'mixture',
    },

    {
      action: 'celebrate',
    },
  ],
};

export const clasicaCooklang = `
Peel the @potatoes{4%pcs}.

Slice the @potatoes.

Heat the @oil{100%ml}.

Fry the @potatoes until tender.

Beat the @eggs{6%pcs}.

Add @salt{1%tsp}.

Add @black_pepper{1%pinch}.

Mix the potatoes with the beaten eggs, salt and black_pepper.

Pour the mixture into the pan.

Cook for 5 minutes.

With a soft spatula, make sure the tortilla does not stick to the pan.

Flip the tortilla.

Cook for another 5 minutes.

Serve the tortilla.

Celebrate.
`;

export const recipe = clasicaRecipe;
`````

## File: src/systems/recipeRunner/handlers/cookHandlers.ts
`````typescript
/**
 * FILE: src/systems/recipeRunner/handlers/cookHandlers.ts
 *
 * PURPOSE:
 * Step handlers for cooking and thermal steps ('cook', 'flip').
 */

import { worldStore } from '../../../store/worldStore';
import { moveTortillaTo, flipTortilla } from '../../mascotActions';
import type { RecipeStep } from '../../../types/RecipeStep';
import type { RecipeRunnerContext } from '../types';

type CookStep = Extract<RecipeStep, { action: 'cook' }>;
type FlipStep = Extract<RecipeStep, { action: 'flip' }>;

export async function handleCookStep(
  ctx: RecipeRunnerContext,
  step: CookStep,
  workstationDefaultContainerId?: string
): Promise<void> {
  const rawKey = step.target || step.ingredient;
  const entityId = ctx.getBoundEntityId(rawKey);

  if (!entityId) {
    throw new Error(`[RecipeRunner] No entity bound for cook step target: "${rawKey}"`);
  }

  ctx.validateEntity(entityId, 'cook');

  const cookingMethod = step.method || 'cooked';
  const containerId = step.containerId || workstationDefaultContainerId || 'burner1';

  if (step.instruction) {
    worldStore.getState().dispatch({
      type: 'UPDATE_ENTITY_STATE',
      payload: {
        entityId: step.mascotId || ctx.mascotId,
        changes: { speechMessage: step.instruction },
      },
    });
  }

  // Ensure bound entity is moved to cooking container if not already there
  const state = worldStore.getState();
  const currentContainer = Object.values(state.containers).find((c) =>
    c.entityIds.includes(entityId!)
  );

  if (!currentContainer || currentContainer.id !== containerId) {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: {
        entityId,
        targetContainerId: containerId,
      },
    });
  }

  moveTortillaTo(containerId, ctx.mascotId);
  await ctx.wait();

  // Turn ON fire if currently off
  const containerBefore = worldStore.getState().containers[containerId];
  if (containerBefore && !containerBefore.isOn) {
    worldStore.getState().dispatch({
      type: 'TOGGLE_BURNER',
      payload: { containerId },
    });
  }

  worldStore.getState().dispatch({
    type: 'COOK_INGREDIENT',
    payload: {
      entityId,
      cooking: cookingMethod,
    },
  });

  // Consume cooking medium helper ingredients currently in the cooking container (e.g. oil)
    /**
   * IMPORTANT: Distinguish between oil as the primary cooking target vs oil as a cooking medium.
   *
   * Scenario 1: Oil is the target (method='heat')
   *   Step: { action: 'cook', target: 'oil', method: 'heat' }
   *   Expected: Oil is heated, NOT consumed
   *   Reason: Oil is the subject being cooked, not a helper ingredient
   *
   * Scenario 2: Oil is a cooking medium
   *   Step: { action: 'cook', target: 'potatoes', method: 'fry' }
   *   Expected: Oil in the container IS consumed (used for frying)
   *   Reason: Oil is helping to cook the potatoes
   * 
   *   Scenario 3: Oil as dressing
   *   Step: { action: 'serve', target: 'mixture', method: 'dress' }
   *   Expected: fresh Oil in the container where the finished tortilla is
   *   Reason: Oil is dressiing for the tortilla
   *
   * Without this check, oil gets consumed even when it's the cooking target,
   * preventing oil reuse and causing "Heat Olive Oil" name change in Required Materials.
   */
  const cookingContainer = worldStore.getState().containers[containerId];

  // Only consume helper ingredients (like oil) if they are NOT the target of THIS cooking step
  const isOilTheTarget =
    rawKey === 'oil' ||
    rawKey?.toLowerCase().includes('oil') ||
    rawKey?.toLowerCase().includes('aceite');

  if (!isOilTheTarget && cookingContainer) {
    // Consume cooking medium helper ingredients currently in the cooking container (e.g. oil)
    const otherEntityIds = cookingContainer.entityIds.filter((id) => id !== entityId);
    for (const otherId of otherEntityIds) {
      const otherEntity = worldStore.getState().entities[otherId];
      const isOil =
        otherEntity?.ingredientId === 'oil' ||
        otherEntity?.id?.includes('oil') ||
        otherEntity?.name?.toLowerCase().includes('oil') ||
        otherEntity?.name?.toLowerCase().includes('aceite');

      if (otherEntity && otherEntity.type === 'ingredient' && !otherEntity.state?.consumed && isOil) {
        worldStore.getState().dispatch({
          type: 'USE_INGREDIENT',
          payload: {
            entityId: otherId,
            usedIn: entityId,
          },
        });
      }
    }
  }

  await ctx.wait();

  // Turn OFF fire when cooking step finishes
  const containerAfter = worldStore.getState().containers[containerId];
  if (containerAfter && containerAfter.isOn) {
    worldStore.getState().dispatch({
      type: 'TOGGLE_BURNER',
      payload: { containerId },
    });
  }
}

export async function handleFlipStep(
  ctx: RecipeRunnerContext,
  step: FlipStep
): Promise<void> {
  const rawKey = step.target;
  const targetContainer = rawKey === 'mixture' ? 'burner1' : rawKey || 'burner1';
  const instructionText = step.instruction;

  if (instructionText) {
    worldStore.getState().dispatch({
      type: 'UPDATE_ENTITY_STATE',
      payload: {
        entityId: step.mascotId || ctx.mascotId,
        changes: { speechMessage: instructionText },
      },
    });
  }

  moveTortillaTo(targetContainer, ctx.mascotId);
  await ctx.wait();

  flipTortilla(step.mascotId || ctx.mascotId);

  if (rawKey) {
    const entityId = ctx.getBoundEntityId(rawKey);
    if (entityId) {
      ctx.validateEntity(entityId, 'flip');
      worldStore.getState().dispatch({
        type: 'UPDATE_ENTITY_STATE',
        payload: {
          entityId,
          changes: { isFlipped: true, status: 'flipped-tortilla' },
        },
      });
    }
  } else {
    // If no target specified, flip all active bound entities in target container
    const state = worldStore.getState();
    const container = state.containers[targetContainer];
    if (container) {
      container.entityIds.forEach((entityId) => {
        worldStore.getState().dispatch({
          type: 'UPDATE_ENTITY_STATE',
          payload: {
            entityId,
            changes: { isFlipped: true, status: 'flipped-tortilla' },
          },
        });
      });
    }
  }

  await ctx.wait();
}
`````

## File: src/App.tsx
`````typescript
/**
 * FILE: App.tsx
 *
 * PURPOSE:
 * Main React application component.
 *
 * RESPONSIBILITY:
 * - Creates the application layout.
 * - Connects major UI areas together.
 * - Acts as the entry point for the game world.
 *
 * SHOULD NOT:
 * - Contain game rules.
 * - Modify world state directly.
 */

import { Scene } from './components/Scene/Scene';
import { Mascot } from './components/Mascot/Mascot';
import { RecipePanel } from './components/Recipe/RecipePanel';

function App() {
  return (
    <div className="app-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '28px', color: 'var(--text-h)' }}>Tortilla World</h1>
          <p style={{ margin: '4px 0 0 0', color: 'var(--text)', opacity: 0.8 }}>
            An interactive simulation world. Drag entities from the immutable catalog pantry into workspace containers.
          </p>
        </div>
        <Mascot />
      </header>

      <main>
        <RecipePanel />
        <Scene />
      </main>
    </div>
  );
}

export default App;
`````

## File: docs/decisions.md
`````markdown
# Systems

## Overview

Systems contain the behaviour of Tortilla World.

Components display the world.
Systems modify the world.

A system receives actions, validates them, and updates the world state.

The general flow is:

```text
Input
  |
  v
Action
  |
  v
System
  |
  v
Validation
  |
  v
World State Update
  |
  v
UI Update
```

---

# System Architecture

Tortilla World is based on independent systems.

Current and planned systems:

```text
Systems

├── Interaction System
├── Movement System
├── Container System
├── Mascot System
├── Animation System
├── Cooking System
└── AI System
```

Each system has a clear responsibility.

---

# Interaction System

## Responsibility

The Interaction System converts external events into world actions.

External events:

* mouse clicks
* drag and drop
* AI requests
* future keyboard/gamepad input

The Interaction System does not modify the world directly.

---

## Example

User drags potato into pan.

The Interaction System creates:

```ts
{
  type:"MOVE_ENTITY",
  entityId:"potato",
  targetContainer:"pan"
}
```

The action is passed to the Movement System.

---

# Movement System

## Responsibility

The Movement System controls ownership changes.

It handles:

* moving entities
* validating source ownership
* validating destination rules
* applying transfer behaviour

---

## Move Flow

```text
Move Request

      |
      v

Find Entity

      |
      v

Find Current Container

      |
      v

Find Target Container

      |
      v

Validate Move

      |
      v

Apply Transfer Rule

      |
      v

Update Ownership

```

---

# Move Validation

Before moving an entity, the system checks:

## Entity existence

Does the entity exist?

Example:

```text
potato
```

must exist in the world.

---

## Source ownership

Does the source container own the entity?

Example:

Valid:

```text
Kitchen owns potato
```

Invalid:

```text
Pan owns potato
```

when moving from Kitchen.

---

## Destination capability

Can the target container accept this entity?

Example:

A pan may accept:

```text
ingredient
```

but reject:

```text
container
```

---

## Duplicate rules

The container checks uniqueness.

Example:

Valid:

```text
Recipe

potato
egg
```

Invalid:

```text
Recipe

potato
potato
```

---

# Transfer Rules

A move is not always the same operation.

Containers define transfer behaviour.

---

# Static Container To Dynamic Container

Example:

```text
Kitchen
 |
 potato


Recipe
```

Move potato:

Result:

```text
Kitchen
 |
 potato


Recipe
 |
 potato
```

The destination receives the ingredient.

The source remains unchanged.

This represents a world resource.

---

# Dynamic Container To Dynamic Container

Example:

```text
Recipe
 |
 potato


Pan
```

Move potato:

Result:

```text
Recipe


Pan
 |
 potato
```

Ownership transfers.

---

# Dynamic Container To Static Container

Example:

```text
Recipe
 |
 potato


Kitchen
```

Move potato back.

Result:

```text
Recipe


Kitchen
 |
 potato
```

The dynamic container loses ownership.

The static container provides the original world resource.

---

# Container System

## Responsibility

The Container System manages container rules.

It answers questions:

* Can this entity be added?
* Can this entity be removed?
* Are duplicates allowed?
* Is the container full?
* Does ordering matter?

---

## Example API

```ts
canAccept(
  container,
  entity
)
```

returns:

```ts
true
```

or:

```ts
false
```

---

# Action Queue

## Responsibility

All world changes should pass through an action queue.

Example:

```text
AI
 |
User
 |
System
 |
Action Queue
 |
World Update
```

---

## Example Action

```ts
{
 type:"MOVE_ENTITY",

 entityId:"egg",

 source:"kitchen",

 target:"recipe"
}
```

---

## Benefits

Action queues provide:

* debugging
* replay
* logging
* AI control
* animations
* delayed actions

---

# Animation System

## Responsibility

The Animation System reacts to world changes.

It does not decide what happens.

Example:

Movement System:

```text
Potato moved to Pan
```

Animation System:

```text
Play potato movement animation
```

---

## Separation

Bad:

```text
Drag component:
move object
animate object
change state
```

Good:

```text
Drag component:
create action


Movement System:
change state


Animation System:
animate change
```

---

# Cooking System

## Responsibility

Future system for transforming entities.

Examples:

```text
Potato
+
Oil
+
Heat

    |
    v

Fried Potato
```

---

The cooking system changes entity state.

Example:

Before:

```ts
{
 type:"ingredient",
 state:"raw"
}
```

After:

```ts
{
 type:"ingredient",
 state:"cooked"
}
```

---

# AI System

## Responsibility

The AI System creates actions.

The AI does not directly manipulate Zustand state.

---

Example:

AI decides:

```text
Prepare tortilla
```

Creates:

```ts
[
 {
  type:"MOVE_ENTITY",
  entityId:"potato",
  target:"pan"
 },

 {
  type:"ADD_HEAT",
  target:"pan"
 }
]
```

The normal systems execute them.

---

# System Communication

Systems communicate through actions and world state.

Example:

```text
Interaction System

        |
        v

Move Action

        |
        v

Movement System

        |
        v

World Store

        |
        v

Animation System

```

---

# Zustand Responsibility

Zustand is the storage layer.

It stores:

* entities
* containers
* relationships
* world state

It should not contain UI logic.

---

Example:

Good:

```ts
moveEntity(
 entityId,
 from,
 to
)
```

Bad:

```ts
onDropIngredient(
 mouseEvent
)
```

---

# Testing Strategy

Systems should be testable without React.

Example:

```ts
moveEntity(
 "potato",
 "kitchen",
 "pan"
)
```

Expected:

```text
Kitchen:
empty

Pan:
potato
```

---

# Future Systems

Possible additions:

## Time System

Controls:

* cooking duration
* day/night
* events

---

## Physics System

Controls:

* collisions
* falling objects
* movement

---

## Economy System

Controls:

* ingredients cost
* customers
* money

---

## Character System

Controls:

* NPCs
* player actions
* behaviours

---

## Mascot System & Recipe System

### Mascot System
Controls:

* `MASCOT_FLIP`: Flips Tortilla mascot in place.
* `MASCOT_MOVE`: Moves gaze/focus of Tortilla to target container.
* `MASCOT_GRAB`: Commands Tortilla to grab ingredient entity from a container.
* `MASCOT_DROP`: Commands Tortilla to drop held ingredient into target container obeying rules.

Dispatch helpers and automated action sequences (e.g. `runFollowRecipeScript`) are located in `src/systems/mascotActions.ts` for AI agent, console, or UI integration.

React components (`Mascot.tsx`) translate pure target container state into physical Framer Motion spring translations across the DOM viewport without touching store logic.

---

### Recipe System & RecipeRunner

The Recipe System executes declarative, step-based recipe state machines via `RecipeRunner` (`src/systems/recipeRunner.ts`).

#### Architecture:
* **Declarative Data**: Recipes (`RecipeStep[]`) define *what* needs to happen (e.g. `move`, `grab`, `drop`, `cut`, `cook`, `mix`, `wait`, `flip`, `speak`, `celebrate`) without referencing specific kitchen containers or locations.
* **Workstation & Tool Resolution**: `RecipeRunner` dynamically queries the Workstation engine (`src/engine/workstations.ts`) to determine the required workstation (`pantry`, `washing_station`, `cutting_station`, `preparation_station`, `cooking_station`, `serving_station`) and tools (`knife`, `peeler`, `whisk`, `fork`, `spatula`, etc.) for each step.
* **Generic Execution**: `RecipeRunner` iterates over recipe steps and dispatches appropriate world/mascot actions.
* **Entity Identity Preservation**: Ingredient state mutations (such as preparation: `whole` ➔ `diced` or cooking: `raw` ➔ `fried`) modify the target entity's `state` via `PREPARE_INGREDIENT` or `COOK_INGREDIENT` without creating or destroying entities.

---

# Decision: Refactor Ingredient Usage Actions into Domain Events

## Context
Previously, `CONSUME_INGREDIENT` was dispatched directly as a user action. This mixed user intent, recipe execution logic, and entity lifecycle mutation.

## Decision
Separated player intentions from world state consequences:
1. **User Intent Action (`USE_INGREDIENT`)**: High-level action dispatched when an ingredient is used (`{ entityId, usedIn }`).
2. **Domain Event (`INGREDIENT_CONSUMED`)**: Reactive domain event emitted when an ingredient is consumed (`{ entityId, consumedBy }`).

## Flow
```text
User Interaction / RecipeRunner
           |
           v
    USE_INGREDIENT (Action)
           |
           v
    Ingredient System / World Store
    +--> Transfer entity to container / recipe
    +--> Set consumed state (consumed: true, consumedBy)
    +--> Emit INGREDIENT_CONSUMED (Domain Event)
```

## Consequences
- Clean separation between user intent and domain event consequences.
- Allows ingredient undo/reversion (`revertIngredientUsage`).
- Decouples UI / RecipeRunner from direct lifecycle state mutation.

---

# Decision: Headless Action Log Replay System

## Context
In Tortilla World, all world modifications are driven by pure `WorldAction` dispatches through `worldStore`. Actions are logged in real-time during user interaction, mascot execution, or recipe playback. Replaying recorded JSON action logs allows deterministic state reconstruction, automated testing, and session playback.

## Decision
Created a headless replay engine (`ActionPlayer` in `src/systems/actionPlayer.ts`) and a React upload control (`ActionReplayer` in `src/components/Controls/ActionReplayer.tsx`).

Key rules:
1. **World State Reset**: Replay resets the simulation to initial default state (`RESET_WORLD`) before executing actions.
2. **Sequential Execution**: Actions are dispatched sequentially via `worldStore.getState().dispatch(action)` with a configurable delay.
3. **No Direct DOM Manipulation**: Animations and component positioning react naturally to Zustand store state updates.
4. **Progress and Control**: Callbacks allow monitoring progress (`onStep`) and stopping playback early (`stop()`).

---

# Final Principle

The rule of Tortilla World:

```text
Components show the world.

Systems change the world.

Containers define the rules.

Actions describe intentions.

The Store remembers the result.
```
`````

## File: src/data/catalog/recipes/concebolla.ts
`````typescript
/**
 * FILE: concebolla.ts
 *
 * PURPOSE:
 * Recipe definition for Tortilla con cebolla.
 *
 * RESPONSIBILITY:
 * - Defines the ingredients, quantities, and cooking process.
 * - Describes recipe actions in a declarative format.
 * - Provides a Cooklang representation for humans.
 */

import type { Recipe } from '../../../types/Recipe';

export const concebollaRecipe: Recipe = {
  id: 'concebolla',
  
  name: 'Tortilla con Cebolla',

  requirements: {
    potatoes: {
      entityId: 'potato',
      amount: 4,
      unit: 'pcs',
    },
    eggs: {
      entityId: 'egg',
      amount: 6,
      unit: 'pcs',
    },
    oil: {
      entityId: 'oil',
      amount: 100,
      unit: 'ml',
    },
    onions: {
      entityId: 'onion',
      amount: 1,
      unit: 'pcs',
    },
    salt: {
      entityId: 'salt',
      amount: 1,
      unit: 'tsp',
    },
    pepper: {
      entityId: 'pepper',
      amount: 1,
      unit: 'pinch',
    },
  },

  steps: [
    {
      action: 'prepare',
      target: 'potatoes',
      preparation: 'peeled',
    },
    {
      action: 'wash',
      target: 'potatoes',
    },
    {
      action: 'prepare',
      target: 'potatoes',
      preparation: 'sliced',
    },
    {
      action: 'prepare',
      target: 'onions',
      preparation: 'peeled',
    },
    {
      action: 'wash',
      target: 'onions',
    },
    {
      action: 'prepare',
      target: 'onions',
      preparation: 'diced',
    },
    {
      action: 'cook',
      target: 'oil',
      method: 'heat',
    },
    {
      action: 'cook',
      target: 'potatoes',
      method: 'fry',
    },
    {
      action: 'cook',
      target: 'onions',
      method: 'fry',
    },
    {
      action: 'prepare',
      target: 'eggs',
      preparation: 'beaten',
    },
    {
      action: 'mix',
      inputs: [
        'potatoes',
        'onions',
        'eggs',
        'salt',
        'pepper',
      ],
      output: 'mixture',
    },
    {
      action: 'cook',
      target: 'mixture',
      method: 'fry',
      duration: 5,
      unit: 'min',
    },
    {
      action: 'instruction',
      text: 'Con una espátula blanda, asegúrate de que la tortilla no se pega a la sartén.',
    },
    {
      action: 'flip',
      target: 'mixture',
      instruction: 'Dale la vuelta a la tortilla.',
    },
    {
      action: 'cook',
      target: 'mixture',
      method: 'fry',
      duration: 5,
      unit: 'min',
      instruction: 'Deja cocinar por otros 5 min.',
    },
    {
      action: 'serve',
      target: 'mixture',
    },
    {
      action: 'celebrate',
    },
  ],
};

export const concebollaCooklang = `
Peel the @potatoes{4%pcs}.

Wash the @potatoes.

Slice the @potatoes.

Peel the @onions{1%pcs}.

Wash the @onions.

Dice the @onions.

Heat the @oil{100%ml}.

Fry the @potatoes until tender.

Fry the @onions until golden.

Beat the @eggs{6%pcs}.

Add @salt{1%tsp} and @pepper{1%pinch}.

Mix the fried potatoes and onions with the beaten eggs, salt and pepper.

Pour the mixture into the pan.

Cook for 5 minutes.

With a soft spatula, make sure the tortilla does not stick to the pan.

Flip the tortilla.

Cook for another 5 minutes.

Serve the tortilla.

Celebrate.
`;

export const recipe = concebollaRecipe;
`````

## File: src/systems/mascotActions.test.ts
`````typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { worldStore } from '../store/worldStore';
import { clearActionLog, getActionLog } from '../store/middleware/actionLog';
import {
  flipTortilla,
  moveTortillaTo,
  grabIngredient,
  dropIngredient,
  runTortillaPotatoScript,
  runFollowRecipeScript,
} from './mascotActions';

function seedWorld() {
  worldStore.setState({
    entities: {
      potato: { id: 'potato', ingredientId: 'potato', name: 'Potato', type: 'ingredient' },
      chef: { id: 'chef', name: 'Chef Tortilla 🍳', type: 'mascot', state: {} },
    },
    containers: {
      despensa: {
        id: 'despensa',
        name: 'Despensa',
        type: 'storage',
        entityIds: ['potato'],
        rules: { isImmutable: true },
      },
      burner1: {
        id: 'burner1',
        name: 'burner1',
        type: 'burner',
        entityIds: [],
        rules: { maxCapacity: 5 },
      },
      board: {
        id: 'board',
        name: 'Board',
        type: 'board',
        entityIds: [],
        rules: { maxCapacity: 3 },
      },
    },
  });
}

describe('mascotActions system', () => {
  beforeEach(() => {
    seedWorld();
    clearActionLog();
  });

  it('triggers flip action and logs in store action log', () => {
    flipTortilla('chef');

    const state = worldStore.getState();
    expect(state.entities.chef.state?.state).toBe('flipping');
    expect(state.entities.chef.state?.isFlipping).toBe(true);

    const log = getActionLog();
    expect(log.map((l) => l.action)).toContain('MASCOT_FLIP');
  });

  it('moves Tortilla gaze to a specified container', () => {
    moveTortillaTo('burner1', 'chef');

    const state = worldStore.getState();
    expect(state.entities.chef.state?.gazingAt).toEqual({ type: 'entity', entityId: 'burner1' });

    const log = getActionLog();
    expect(log.map((l) => l.action)).toContain('MASCOT_MOVE');
  });

  it('allows Tortilla to grab an ingredient from a container', () => {
    grabIngredient('potato', 'despensa', 'chef');

    const state = worldStore.getState();
    expect(state.entities.chef.state?.holdingEntityId).toBe('potato');
    expect(state.entities.chef.state?.sourceContainerId).toBe('despensa');

    const log = getActionLog();
    expect(log.map((l) => l.action)).toContain('MASCOT_GRAB');
  });

  it('allows Tortilla to drop held ingredient into a target container obeying container rules', () => {
    // First grab potato from immutable despensa
    grabIngredient('potato', 'despensa', 'chef');

    // Then drop intoburner1
    dropIngredient('burner1', undefined, 'chef');

    const state = worldStore.getState();
    // Held item cleared
    expect(state.entities.chef.state?.holdingEntityId).toBeUndefined();
    //burner1 now has a potato copy (because source was immutable despensa)
    expect(state.containers.burner1.entityIds.length).toBe(1);

    const log = getActionLog();
    const actions = log.map((l) => l.action);
    expect(actions).toContain('MASCOT_GRAB');
    expect(actions).toContain('MASCOT_DROP');
  });

  it('clears holdingEntityId when drop is possible and retains it when drop is blocked', () => {
    // 1. Fill board to capacity (maxCapacity = 3)
    worldStore.setState({
      ...worldStore.getState(),
      entities: {
        ...worldStore.getState().entities,
        i1: { id: 'i1', ingredientId: 'i1', name: 'I1', type: 'ingredient' },
        i2: { id: 'i2', ingredientId: 'i2', name: 'I2', type: 'ingredient' },
        i3: { id: 'i3', ingredientId: 'i3', name: 'I3', type: 'ingredient' },
      },
      containers: {
        ...worldStore.getState().containers,
        board: {
          id: 'board',
          name: 'Board',
          type: 'board',
          entityIds: ['i1', 'i2', 'i3'],
          rules: { maxCapacity: 3 },
        },
      },
    });

    // 2. Grab potato from despensa
    grabIngredient('potato', 'despensa', 'chef');
    expect(worldStore.getState().entities.chef.state?.holdingEntityId).toBe('potato');

    // 3. Attempt to drop into full board -> should be blocked and Tortilla continues grabbing/holding it
    dropIngredient('board', undefined, 'chef');
    expect(worldStore.getState().entities.chef.state?.holdingEntityId).toBe('potato');
    expect(worldStore.getState().containers.board.entityIds).toEqual(['i1', 'i2', 'i3']);

    // 4. Drop into non-fullburner1 -> allowed, Tortilla stops grabbing it (holdingEntityId cleared)
    dropIngredient('burner1', undefined, 'chef');
    expect(worldStore.getState().entities.chef.state?.holdingEntityId).toBeUndefined();
    expect(worldStore.getState().containers.burner1.entityIds.length).toBe(1);
  });

  it('runs full async script sequence: move ➔ grab ➔ move ➔ drop ➔ flip ➔ return home', async () => {
    await runTortillaPotatoScript('chef', 10);

    const state = worldStore.getState();
    expect(state.containers.board.entityIds.length).toBe(1);

    const log = getActionLog().map((l) => l.action).filter((a) => a !== 'RESET_MASCOT_FLIP');
    expect(log).toEqual([
      'MASCOT_MOVE',
      'MASCOT_GRAB',
      'MASCOT_MOVE',
      'MASCOT_DROP',
      'MASCOT_FLIP',
      'MASCOT_CLEAR_GAZE', // "return home" now dispatches MASCOT_CLEAR_GAZE, not MASCOT_MOVE('')
    ]);
  });

  it('runs follow recipe script: processes all recipe ingredients through workstations', async () => {
    // Seed default entities for all recipe ingredients
    worldStore.setState({
      ...worldStore.getState(),
      entities: {
        ...worldStore.getState().entities,
        potato: { id: 'potato', ingredientId: 'potato', name: 'Potato', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
        egg: { id: 'egg', ingredientId: 'egg', name: 'Egg', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
        oil: { id: 'oil', ingredientId: 'oil', name: 'Oil', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
        onion: { id: 'onion', ingredientId: 'onion', name: 'Onion', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
        salt: { id: 'salt', ingredientId: 'salt', name: 'Salt', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
        pepper: { id: 'pepper', ingredientId: 'pepper', name: 'Pepper', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
      },
      containers: {
        ...worldStore.getState().containers,
        board: { id: 'board', name: 'Board', type: 'board', entityIds: [], rules: { maxCapacity: 10 } },
        sink: { id: 'sink', name: 'Sink', type: 'sink', entityIds: [], rules: { maxCapacity: 10 } },
        bowl: { id: 'bowl', name: 'Bowl', type: 'bowl', entityIds: [], rules: { maxCapacity: 10 } },
        burner1: { id: 'burner1', name: 'burner1', type: 'burner', entityIds: [], rules: { maxCapacity: 10 } },
        plate: { id: 'plate', name: 'Plate', type: 'plate', entityIds: [], rules: { maxCapacity: 10 } },
      },
    });

    await runFollowRecipeScript('concebolla', 'chef', 'board', 5);

    const state = worldStore.getState();
    // New concebolla routes ingredients through workstations and serves them on the plate
    expect(state.containers.plate.entityIds.length).toBeGreaterThanOrEqual(1);

    // All 6 ingredient catalog IDs should be accounted for in the world state (either directly or consumed into a mixture)
    const ingredientIds = ['potato', 'onion', 'egg', 'oil', 'salt', 'pepper'];
    const allWorldEntities = Object.values(state.entities);
    const allIngredientCatalogIds = allWorldEntities.map((e) => e?.ingredientId || e?.id);
    ingredientIds.forEach((id) => {
      expect(allIngredientCatalogIds.some((cid) => cid === id)).toBe(true);
    });
  });
});
`````

## File: src/systems/recipeRunner.test.ts
`````typescript
/**
 * FILE: recipeRunner.test.ts
 *
 * PURPOSE:
 * Unit tests for the generic RecipeRunner step-based state machine.
 */

import { beforeEach, describe, expect, it } from 'vitest';
import { worldStore } from '../store/worldStore';
import { RecipeRunner } from './recipeRunner';
import { concebollaRecipe, clasicaRecipe } from '../data/catalog/recipes';
import type { Recipe } from '../types/Recipe';
import { clearActionLog, getActionLog } from '../store/middleware/actionLog';

function seedTestWorld() {
  worldStore.setState({
    entities: {
      chef: { id: 'chef', name: 'Chef Tortilla 🍳', type: 'mascot', state: { gazingAt: null } },
      onion: { id: 'onion', ingredientId: 'onion', name: 'Onion', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
      potato: { id: 'potato', ingredientId: 'potato', name: 'Potato', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
      egg: { id: 'egg', ingredientId: 'egg', name: 'Egg', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
      oil: { id: 'oil', ingredientId: 'oil', name: 'Oil', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
      salt: { id: 'salt', ingredientId: 'salt', name: 'Salt', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
      pepper: { id: 'pepper', ingredientId: 'pepper', name: 'Pepper', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
    },
    containers: {
      despensa: {
        id: 'despensa',
        name: 'Despensa',
        type: 'storage',
        entityIds: ['onion', 'potato', 'egg', 'oil', 'salt', 'pepper'],
        rules: { isImmutable: true },
      },
      sink: {
        id: 'sink',
        name: 'Sink',
        type: 'sink',
        entityIds: [],
        rules: { maxCapacity: 10 },
      },
      board: {
        id: 'board',
        name: 'Board',
        type: 'board',
        entityIds: [],
        rules: { maxCapacity: 10 },
      },
      bowl: {
        id: 'bowl',
        name: 'Bowl',
        type: 'bowl',
        entityIds: [],
        rules: { maxCapacity: 10 },
      },
      burner1: {
        id: 'burner1',
        name: 'burner1',
        type: 'burner',
        entityIds: [],
        rules: { maxCapacity: 5 },
      },
      plate: {
        id: 'plate',
        name: 'Plate',
        type: 'plate',
        entityIds: [],
        rules: { maxCapacity: 5 },
      },
    },
    dispatch: worldStore.getState().dispatch,
  });
}

describe('RecipeRunner System', () => {
  beforeEach(() => {
    seedTestWorld();
    clearActionLog();
  });

  it('runs a declarative recipe and populates target container', async () => {
    const runner = new RecipeRunner({ mascotId: 'chef', defaultTargetId: 'board', delayMs: 5 });
    await runner.runRecipe(concebollaRecipe);

    const state = worldStore.getState();
    // New concebolla format uses a serve step that collects everything onto the plate
    expect(state.containers.plate.entityIds.length).toBeGreaterThanOrEqual(1);

    const actionNames = getActionLog().map((a) => a.action);
    expect(actionNames).toContain('MASCOT_MOVE');
    expect(actionNames).toContain('MASCOT_GRAB');
    expect(actionNames).toContain('MASCOT_DROP');
    expect(actionNames).toContain('MASCOT_FLIP');
  });

  it('mutates existing entity state for cut/prepare without creating new entity', async () => {
    // Move onion to board first
    const runner = new RecipeRunner({ mascotId: 'chef', defaultTargetId: 'board', delayMs: 5 });
    await runner.runSteps([
      { action: 'move', ingredient: 'onion', source: 'despensa', target: 'board' },
      { action: 'cut', ingredient: 'onion', style: 'diced', containerId: 'board' },
    ]);

    const state = worldStore.getState();
    const boardEntities = state.containers.board.entityIds.map((id) => state.entities[id]);
    const dicedOnion = boardEntities.find((e) => e?.ingredientId === 'onion');

    expect(dicedOnion).toBeDefined();
    // Verify entity ID was retained (no recreation!)
    expect(dicedOnion?.state?.preparation).toBe('diced');

    const actionNames = getActionLog().map((a) => a.action);
    expect(actionNames).toContain('PREPARE_INGREDIENT');
  });

  it('mutates existing entity state for cook step', async () => {
    const runner = new RecipeRunner({ mascotId: 'chef', defaultTargetId: 'burner1', delayMs: 5 });
    await runner.runSteps([
      { action: 'move', ingredient: 'potato', source: 'despensa', target: 'burner1' },
      { action: 'cook', ingredient: 'potato', method: 'fried', containerId: 'burner1' },
    ]);

    const state = worldStore.getState();
    const burner1Entities = state.containers.burner1.entityIds.map((id) => state.entities[id]);
    const friedPotato = burner1Entities.find((e) => e?.ingredientId === 'potato');

    expect(friedPotato).toBeDefined();
    expect(friedPotato?.state?.cooking).toBe('fried');

    const actionNames = getActionLog().map((a) => a.action);
    expect(actionNames).toContain('COOK_INGREDIENT');
  });

  it('handles speak, wait, and celebrate steps', async () => {
    const customRecipe: Recipe = {
      id: 'custom-test',
      name: 'Custom Test Recipe',
      requirements: [],
      steps: [
        { action: 'speak', message: 'Cooking initialized!' },
        { action: 'wait', durationMs: 10 },
        { action: 'celebrate' },
      ],
    };

    const runner = new RecipeRunner({ mascotId: 'chef', delayMs: 5 });
    await runner.runRecipe(customRecipe);

    const state = worldStore.getState();
    expect(state.entities.chef.state?.speechMessage).toBe('Cooking initialized!');
    // After celebrate step, clearTortillaGaze is called → gazingAt is null.
    expect(state.entities.chef.state?.gazingAt).toBeNull();
  });

  it('executes clasicaRecipe dictionary steps and state transformations', async () => {
    const runner = new RecipeRunner({ mascotId: 'chef', delayMs: 5 });
    await runner.runRecipe(clasicaRecipe);

    const state = worldStore.getState();
    const plateEntities = state.containers.plate.entityIds.map((id) => state.entities[id]);
    expect(plateEntities.length).toBeGreaterThan(0);

    const actionNames = getActionLog().map((a) => a.action);
    expect(actionNames).toContain('PREPARE_INGREDIENT');
    expect(actionNames).toContain('COOK_INGREDIENT');
    expect(actionNames).toContain('MASCOT_FLIP');
  });

  it('binds distinct entity IDs when dropping copies from immutable despensa container', async () => {
    const multiIngredientRecipe: Recipe = {
      id: 'multi-potato',
      name: 'Two Potatoes Recipe',
      requirements: [
        { id: 'p1', entityId: 'potato', amount: 1, unit: 'unit' },
        { id: 'p2', entityId: 'potato', amount: 1, unit: 'unit' },
      ],
      steps: [
        { action: 'move', ingredient: 'p1', source: 'despensa', target: 'board' },
        { action: 'cut', target: 'p1', style: 'diced', containerId: 'board' },
        { action: 'move', ingredient: 'p2', source: 'despensa', target: 'sink' },
        { action: 'wash', target: 'p2', containerId: 'sink' },
      ],
    };

    const runner = new RecipeRunner({ mascotId: 'chef', delayMs: 5 });
    await runner.runRecipe(multiIngredientRecipe);

    const p1Id = runner.recipeContext.bindings['p1'];
    const p2Id = runner.recipeContext.bindings['p2'];

    expect(p1Id).toBeDefined();
    expect(p2Id).toBeDefined();
    expect(p1Id).not.toBe(p2Id);

    const state = worldStore.getState();
    const p1Entity = state.entities[p1Id];
    const p2Entity = state.entities[p2Id];

    expect(p1Entity?.state?.preparation).toBe('diced');
    expect(p2Entity?.state?.preparation).toBe('washed');
  });

  it('creates a real mixture entity and consumes input ingredients on mix', async () => {
    const mixRecipe: Recipe = {
      id: 'mix-test',
      name: 'Mix Test',
      requirements: [
        { id: 'egg1', entityId: 'egg', amount: 1, unit: 'unit' },
        { id: 'salt1', entityId: 'salt', amount: 1, unit: 'unit' },
      ],
      steps: [
        { action: 'mix', inputs: ['egg1', 'salt1'], targetContainerId: 'bowl', output: 'batter' },
      ],
    };

    const runner = new RecipeRunner({ mascotId: 'chef', delayMs: 5 });
    await runner.runRecipe(mixRecipe);

    const state = worldStore.getState();
    const mixtureEntityId = runner.recipeContext.bindings['batter'];
    expect(mixtureEntityId).toBeDefined();

    const mixtureEntity = state.entities[mixtureEntityId];
    expect(mixtureEntity).toBeDefined();
    expect(mixtureEntity.name).toBe('batter');
    expect(state.containers.bowl.entityIds).toContain(mixtureEntityId);

    // Verify input ingredients were marked as consumed and removed from containers
    const eggEntity = state.entities[runner.recipeContext.bindings['egg1']];
    const saltEntity = state.entities[runner.recipeContext.bindings['salt1']];

    expect(eggEntity?.state?.consumed).toBe(true);
    expect(saltEntity?.state?.consumed).toBe(true);

    expect(state.containers.bowl.entityIds).not.toContain(eggEntity.id);
    expect(state.containers.bowl.entityIds).not.toContain(saltEntity.id);
  });

  it('ensures cooked sliced potatoes appear in the bowl before creating mixture entity during mix step', async () => {
    worldStore.getState().dispatch({
      type: 'ADD_ENTITY',
      payload: {
        entity: {
          id: 'cooked_potato_test',
          ingredientId: 'potato',
          name: 'Potato',
          type: 'ingredient',
          state: { preparation: 'sliced', cooking: 'fried' },
        },
        containerId: 'burner1',
      },
    });

    const runner = new RecipeRunner({ mascotId: 'chef', delayMs: 1 });
    runner.bindRecipeContext(clasicaRecipe);

    let cookedSlicedPotatoInBowlBeforeMixture = false;
    let potatoStateInBowl: Record<string, unknown> | undefined;

    const unsubscribe = worldStore.subscribe((currState) => {
      const bowlEntityIds = currState.containers.bowl?.entityIds || [];
      const mixtureExists = bowlEntityIds.some((id) => id.startsWith('mixture'));
      const potatoIdInBowl = bowlEntityIds.find((id) => {
        const e = currState.entities[id];
        return e && (e.ingredientId === 'potato' || e.id.includes('potato'));
      });

      if (potatoIdInBowl && !mixtureExists) {
        cookedSlicedPotatoInBowlBeforeMixture = true;
        potatoStateInBowl = currState.entities[potatoIdInBowl]?.state;
      }
    });

    await runner.runSteps([
      {
        action: 'mix',
        inputs: ['potatoes', 'eggs', 'salt', 'black_pepper'],
        targetContainerId: 'bowl',
        output: 'mixture',
      },
    ]);

    unsubscribe();

    expect(cookedSlicedPotatoInBowlBeforeMixture).toBe(true);
    expect(potatoStateInBowl).toBeDefined();
    expect(potatoStateInBowl?.preparation).toBe('sliced');
    expect(potatoStateInBowl?.cooking).toBe('fried');

    const finalBowlEntityIds = worldStore.getState().containers.bowl.entityIds;
    const mixtureId = runner.recipeContext.bindings['mixture'];
    expect(finalBowlEntityIds).toContain(mixtureId);
  });

  it('translates instruction step "Toggle heat on burner1" into UPDATE_ENTITY_STATE and TOGGLE_BURNER actions', async () => {
    const runner = new RecipeRunner({ mascotId: 'chef', delayMs: 1 });
    const initialBurnerState = worldStore.getState().containers.burner1.isOn;

    await runner.runSteps([
      {
        action: 'instruction',
        text: 'Toggle heat on burner1',
      },
    ]);

    const state = worldStore.getState();
    const actionLog = getActionLog();
    const actionTypes = actionLog.map((a) => a.action);

    expect(actionTypes).toContain('UPDATE_ENTITY_STATE');
    expect(actionTypes).toContain('TOGGLE_BURNER');
    expect(state.entities.chef.state?.speechMessage).toBe('Toggle heat on burner1');
    expect(state.containers.burner1.isOn).toBe(!initialBurnerState);
  });
});
`````

## File: src/components/Mascot/TortillaSvg.tsx
`````typescript
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import type { GazePoint, GazeTarget } from "../../systems/gaze";
import type { MascotState } from "../../systems/mascot";
import "./TortillaSvg.scss";

export interface Potato {
  x: number;
  y: number;
  rx: number;
  ry: number;
  rotate: number;
}

export interface ToastMark {
  x: number;
  y: number;
  rx: number;
  ry: number;
  rotate: number;
}

export interface TortillaSvgProps {
  state?: MascotState | "flipping"; // Added 'flipping' if not in your MascotState yet
  radius?: number;
  pupilOffset?: { left: GazePoint; right: GazePoint };
  mouth?: string;
  leftEyeRef?: React.RefObject<SVGEllipseElement | null>;
  rightEyeRef?: React.RefObject<SVGEllipseElement | null>;
  width?: number | string;
  height?: number | string;
  potatoes?: Potato[];
  toastMarks?: ToastMark[];
  gazingAt?: GazeTarget;
  onDoubleClick?: (e: React.MouseEvent<SVGSVGElement>) => void;
}

const DEFAULT_POTATOES: Potato[] = [
  { x: -12, y: -10, rx: 4, ry: 3, rotate: 15 },
  { x: 14, y: 8, rx: 5, ry: 3.5, rotate: -25 },
  { x: -6, y: 12, rx: 4.5, ry: 3, rotate: 40 },
  { x: 8, y: -14, rx: 3.5, ry: 2.5, rotate: -10 },
];

const DEFAULT_TOAST_MARKS: ToastMark[] = [
  { x: -18, y: -12, rx: 3, ry: 2, rotate: 20 },
  { x: 12, y: -16, rx: 4, ry: 2.5, rotate: -15 },
  { x: -14, y: 14, rx: 3.5, ry: 2, rotate: 30 },
  { x: 16, y: 10, rx: 2.5, ry: 1.8, rotate: -45 },
];

export function TortillaSvg({
  state = "idle",
  radius = 28,
  pupilOffset: externalPupilOffset,
  mouth = "M -10 6 Q 0 16 10 6",
  leftEyeRef,
  rightEyeRef,
  width = 100,
  height = 100,
  potatoes = DEFAULT_POTATOES,
  toastMarks = DEFAULT_TOAST_MARKS,
  gazingAt,
  onDoubleClick,
}: TortillaSvgProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [targetOffset, setTargetOffset] = useState<{ left: GazePoint; right: GazePoint }>({
    left: { x: 0, y: 0 },
    right: { x: 0, y: 0 },
  });

  const handleDoubleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setIsFlipping(false);
      }, 800);
    }
    onDoubleClick?.(e);
  };

  useEffect(() => {
    if (externalPupilOffset) return;

    const computeOffsetFromPoint = (targetX: number, targetY: number) => {
      if (!svgRef.current) return { x: 0, y: 0 };
      const rect = svgRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = targetX - centerX;
      const dy = targetY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 1) return { x: 0, y: 0 };

      const angle = Math.atan2(dy, dx);
      const maxOffset = 3.5;
      const offsetDist = Math.min(distance / 60, 1) * maxOffset;

      const ox = Math.cos(angle) * offsetDist;
      const oy = Math.sin(angle) * offsetDist;

      return { x: ox, y: oy };
    };

    if (gazingAt?.type === "mouse") {
      const handleMouseMove = (e: MouseEvent) => {
        const offset = computeOffsetFromPoint(e.clientX, e.clientY);
        setTargetOffset({ left: offset, right: offset });
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }

    let animFrameId: number;

    const updateGaze = () => {
      if (!gazingAt) {
        setTargetOffset({ left: { x: 0, y: 0 }, right: { x: 0, y: 0 } });
        return;
      }

      if (gazingAt.type === "entity") {
        const entityId = gazingAt.entityId;
        if (!entityId) {
          setTargetOffset({ left: { x: 0, y: 0 }, right: { x: 0, y: 0 } });
          return;
        }

        // Search for element or container in DOM
        const el =
          document.querySelector(`[data-entity-id="${entityId}"]`) ||
          document.querySelector(`[data-ingredient-id="${entityId}"]`) ||
          document.querySelector(`[data-container-id="${entityId}"]`) ||
          document.getElementById(entityId);

        if (el) {
          const rect = el.getBoundingClientRect();
          const offset = computeOffsetFromPoint(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2
          );
          setTargetOffset({ left: offset, right: offset });
        } else {
          setTargetOffset({ left: { x: 0, y: 0 }, right: { x: 0, y: 0 } });
        }
      } else if (gazingAt.type === "point") {
        const offset = computeOffsetFromPoint(gazingAt.point.x, gazingAt.point.y);
        setTargetOffset({ left: offset, right: offset });
      } else {
        setTargetOffset({ left: { x: 0, y: 0 }, right: { x: 0, y: 0 } });
      }
    };

    const loop = () => {
      updateGaze();
      animFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, [externalPupilOffset, gazingAt]);

  const pupilOffset = externalPupilOffset || targetOffset;
  const r = radius ?? 28;
  const effectiveState = isFlipping ? "flipping" : state;

  return (
    <motion.svg
      ref={svgRef}
      viewBox="-40 -40 80 80"
      width={width}
      height={height}
      className={`tortilla-svg is-${effectiveState}`}
      onDoubleClick={handleDoubleClick}
      style={{ cursor: "pointer" }}
    >
      <defs>
        {/* Hauptkörper: Ei + Kartoffeln */}
        <radialGradient id="tortillaBody" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#fff8e1" />
          <stop offset="30%" stopColor="#f5d98e" />
          <stop offset="70%" stopColor="#e8b84a" />
          <stop offset="100%" stopColor="#c98a2a" />
        </radialGradient>

        {/* Gebräunter Rand */}
        <linearGradient id="crustEdge" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4953a" />
          <stop offset="50%" stopColor="#b8731f" />
          <stop offset="100%" stopColor="#8b5a1a" />
        </linearGradient>

        {/* Schatten unter der Tortilla */}
        <radialGradient id="dropShadow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#5a3a0a" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#5a3a0a" stopOpacity="0" />
        </radialGradient>

        {/* Öl-Glanz */}
        <linearGradient id="oilShine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        {/* Kartoffel-Textur */}
        <radialGradient id="potatoChunk" cx="30%" cy="30%">
          <stop offset="0%" stopColor="#fff5d6" />
          <stop offset="100%" stopColor="#e8c97a" />
        </radialGradient>

        {/* Zwiebel-Textur */}
        <radialGradient id="onionChunk" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f0e6d2" />
        </radialGradient>

        {/* Dampf für Cooking-State */}
        <linearGradient id="steam" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        <filter id="softShadow">
          <feDropShadow dx="0" dy="3" stdDeviation="3" opacity="0.3" />
        </filter>

        <filter id="innerGlow">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* === SCHATTEN === */}
      <ellipse
        cx="2"
        cy="22"
        rx={r * 0.9}
        ry={r * 0.7}
        fill="url(#dropShadow)"
      />

      {/* === TORTILLA-DICKE (Seitenansicht) === */}
      <ellipse
        cx="0"
        cy="8"
        rx={r * 0.95}
        ry={r * 0.85}
        fill="#7a4a15"
      />

      {/* === HAUPTKÖRPER === */}
      <ellipse
        cx="0"
        cy="0"
        rx={r}
        ry={r * 0.88}
        fill="url(#tortillaBody)"
        stroke="url(#crustEdge)"
        strokeWidth="2.5"
        filter="url(#softShadow)"
      />

      {/* === GEKRÄUSELTER RAND === */}
      <path
        d="M -28 -8 
           Q -32 -2 -30 5 
           Q -28 15 -20 22 
           Q -10 28 0 27 
           Q 12 28 22 22 
           Q 30 15 31 5 
           Q 32 -5 25 -15 
           Q 15 -25 0 -26 
           Q -15 -25 -28 -8 Z"
        fill="none"
        stroke="#b8731f"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        opacity="0.6"
      />

      {/* === KARTOFFEL-STÜCKE (aus Props) === */}
      {potatoes.map((potato, i) => (
        <g key={`potato-${i}`} transform={`rotate(${potato.rotate} ${potato.x} ${potato.y})`}>
          {/* Schatten */}
          <ellipse
            cx={potato.x + 0.5}
            cy={potato.y + 0.5}
            rx={potato.rx}
            ry={potato.ry}
            fill="#b8892a"
            opacity="0.4"
          />
          {/* Kartoffel */}
          <ellipse
            cx={potato.x}
            cy={potato.y}
            rx={potato.rx}
            ry={potato.ry}
            fill="url(#potatoChunk)"
            stroke="#d4a84a"
            strokeWidth="0.8"
          />
          {/* Highlight */}
          <ellipse
            cx={potato.x - 1}
            cy={potato.y - 1}
            rx={potato.rx * 0.4}
            ry={potato.ry * 0.3}
            fill="#ffffff"
            opacity="0.5"
          />
        </g>
      ))}

      {/* === ZWIEBEL-RINGE === */}
      {[
        { x: -22, y: -2, r: 3.5 },
        { x: 20, y: -8, r: 2.5 },
        { x: 8, y: -22, r: 2 },
        { x: -5, y: 20, r: 3 },
      ].map((onion, i) => (
        <g key={`onion-${i}`}>
          <circle
            cx={onion.x}
            cy={onion.y}
            r={onion.r}
            fill="none"
            stroke="#f5e6c8"
            strokeWidth="1.8"
            opacity="0.7"
          />
          <circle
            cx={onion.x}
            cy={onion.y}
            r={onion.r * 0.5}
            fill="none"
            stroke="#e8d5a8"
            strokeWidth="1"
            opacity="0.5"
          />
        </g>
      ))}

      {/* === GEBRÄUNTE STELLEN (aus Props) === */}
      {toastMarks.map((mark, i) => (
        <ellipse
          key={`toast-${i}`}
          cx={mark.x}
          cy={mark.y}
          rx={mark.rx}
          ry={mark.ry}
          fill="#8b5a1a"
          opacity="0.35"
          transform={`rotate(${mark.rotate} ${mark.x} ${mark.y})`}
        />
      ))}

      {/* === ÖL-GLANZ (mehrere Highlights) === */}
      <path
        d="M -15 -18 Q -5 -25 8 -20"
        fill="none"
        stroke="url(#oilShine)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 10 15 Q 18 18 24 12"
        fill="none"
        stroke="url(#oilShine)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <ellipse cx="-8" cy="-16" rx="3" ry="1.5" fill="#ffffff" opacity="0.3" transform="rotate(-20 -8 -16)" />

      {/* === BASILIKUM-BLATT (als "Haarschmuck") === */}
      <g transform="translate(18, -22) rotate(25)">
        <path
          d="M 0 0 Q -4 -8 0 -14 Q 4 -8 0 0 Z"
          fill="#5a8f3a"
          stroke="#4a7a2e"
          strokeWidth="0.8"
        />
        <path
          d="M 0 0 L 0 -12"
          fill="none"
          stroke="#4a7a2e"
          strokeWidth="0.5"
        />
        <ellipse cx="-1.5" cy="-5" rx="1" ry="0.8" fill="#6ba84a" opacity="0.7" />
        <ellipse cx="1.5" cy="-9" rx="0.8" ry="0.6" fill="#6ba84a" opacity="0.7" />
      </g>

      {/* === DAMPF (nur im Cooking-State) === */}
      {state === "cooking" && (
        <>
          <motion.path
            d="M -10 -28 Q -15 -38 -8 -45"
            fill="none"
            stroke="url(#steam)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: [0, 0.7, 0], y: [-2, -8, -15], x: [0, 3, -2] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          />
          <motion.path
            d="M 5 -30 Q 10 -40 3 -48"
            fill="none"
            stroke="url(#steam)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: [0, 0.6, 0], y: [-2, -10, -18], x: [0, -3, 2] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: 0.7 }}
          />
          <motion.path
            d="M 0 -32 Q -5 -42 2 -50"
            fill="none"
            stroke="url(#steam)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: [0, 0.5, 0], y: [-2, -12, -20], x: [0, 4, -3] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: 1.4 }}
          />
        </>
      )}

      {/* === GESICHT === */}

      {/* Wangen (Blush) */}
      <ellipse cx="-22" cy="6" rx="5" ry="3" fill="#e85a5a" opacity="0.25" filter="url(#innerGlow)" />
      <ellipse cx="22" cy="6" rx="5" ry="3" fill="#e85a5a" opacity="0.25" filter="url(#innerGlow)" />

      {/* Augen (Weiß) */}
      <ellipse ref={leftEyeRef} cx="-11" cy="-6" rx="8" ry="9" fill="#fff" />
      <ellipse ref={rightEyeRef} cx="11" cy="-6" rx="8" ry="9" fill="#fff" />

      {/* Augenlider (Blinzeln via CSS) */}
      <ellipse
        cx="-11"
        cy="-6"
        rx="8"
        ry="9"
        fill="#e8b84a"
        className="tortilla-blink"
        style={{ transformOrigin: "-11px -6px" }}
      />
      <ellipse
        cx="11"
        cy="-6"
        rx="8"
        ry="9"
        fill="#e8b84a"
        className="tortilla-blink"
        style={{ transformOrigin: "11px -6px" }}
      />

      {/* Pupillen */}
      <motion.circle
        cx="-11"
        cy="-6"
        r="3.5"
        fill="#3b2418"
        animate={{ x: pupilOffset.left.x, y: pupilOffset.left.y }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      <motion.circle
        cx="11"
        cy="-6"
        r="3.5"
        fill="#3b2418"
        animate={{ x: pupilOffset.right.x, y: pupilOffset.right.y }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />

      {/* Pupillen-Highlights */}
      <circle cx="-12.5" cy="-8" r="1.2" fill="white" />
      <circle cx="9.5" cy="-8" r="1.2" fill="white" />

      {/* Mund */}
      <motion.path
        d={mouth}
        fill="none"
        stroke="#3b2418"
        strokeWidth="3"
        strokeLinecap="round"
        animate={
          state === "celebrating"
            ? { scale: [1, 1.1, 1] }
            : state === "cooking"
            ? { d: ["M -14 4 Q 0 18 14 4", "M -14 5 Q 0 16 14 5", "M -14 4 Q 0 18 14 4"] }
            : {}
        }
        transition={
          state === "celebrating"
            ? { duration: 0.5, repeat: Infinity }
            : state === "cooking"
            ? { duration: 1.5, repeat: Infinity }
            : { duration: 0.2 }
        }
      />

      {/* Zunge (nur bei celebrating) */}
      {state === "celebrating" && (
        <motion.path
          d="M -6 12 Q 0 18 6 12"
          fill="#e85a5a"
          opacity="0.8"
          animate={{ scaleY: [1, 1.2, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}

      {/* === EXTRA: Kleine Krümel (Details) === */}
      <circle cx="-30" cy="5" r="1" fill="#c98a2a" opacity="0.5" />
      <circle cx="32" cy="-5" r="0.8" fill="#c98a2a" opacity="0.4" />
      <circle cx="28" cy="18" r="1.2" fill="#c98a2a" opacity="0.3" />
    </motion.svg>
  );
}
`````

## File: src/components/Recipe/RecipePanel.tsx
`````typescript
/**
 * FILE: RecipePanel.tsx
 *
 * PURPOSE:
 * Compact, unintrusive recipe selector and catalog viewer.
 *
 * RESPONSIBILITY:
 * - Wires catalog recipes (Con Cebolla, Sin Cebolla) with RecipeRequirements.
 * - Displays active recipe requirements and matches with current world state.
 */

import { useStore } from 'zustand';
import { worldStore } from '../../store/worldStore';
import './RecipePanel.scss';

export function RecipePanel() {
  const dispatch = useStore(worldStore, (state) => state.dispatch);

  return (
    <div className="recipe-panel compact-recipe-panel">
      <div className="recipe-panel-header">
        <button
          type="button"
          className="recipe-reset-btn"
          onClick={() => dispatch({ type: 'RESET_WORLD' })}
          title="Clean the kitchen and start over"
        >
          🔄 Reset Kitchen
        </button>
      </div>
    </div>
  );
}
`````

## File: src/types/world.ts
`````typescript
/**
 * FILE: world.ts
 *
 * PURPOSE:
 * Defines complete world state structures.
 *
 * RESPONSIBILITY:
 * - Describes the game world's data model.
 */

import type { WorldAction, WorldEvent } from './actions';
import type { PreparationStyle, CookingMethod } from './RecipeStep';

export type EntityType = 'ingredient' | 'tool' | 'product' | 'mascot' | 'container' | string;
export type ContainerType = 'storage' | 'board' | 'plate' | 'trash' | 'bowl' | 'sink' | 'workstation' | 'burner';

export interface IngredientState {
  preparation?: PreparationStyle;
  cooking?: CookingMethod;
  status?: string;
  [key: string]: unknown;
}

export interface Entity {
  id: string;
  name: string;
  type: EntityType;
  icon?: string;
  ingredientId?: string;
  state?: IngredientState;
}

export interface ContainerRules {
  maxCapacity?: number;
  allowedTypes?: EntityType[];
  uniqueTypesOnly?: boolean;
  consumesOnDrag?: boolean;
  isImmutable?: boolean;
  customValidator?: ( 
    container: Container,
    entity: Entity,
    currentEntities: Entity[]
  ) => boolean;
}

export interface Container {
  id: string;
  name: string;
  type: ContainerType;
  entityIds: string[];
  rules?: ContainerRules;
  isOn?: boolean;
}

export interface WorldState {
  entities: Record<string, Entity>;
  containers: Record<string, Container>;
  dispatch: (action: WorldAction) => void;
}

export type { WorldAction, WorldEvent };
`````

## File: src/components/Scene/useSceneDragAndDrop.ts
`````typescript
/**
 * FILE: useSceneDragAndDrop.ts
 *
 * PURPOSE:
 * React hook connecting drag/drop events with the game world.
 *
 * RESPONSIBILITY:
 * - Handles DnD lifecycle using dnd-kit sensors.
 * - Translates UI drag actions into pure MOVE_ENTITY actions.
 *
 * SHOULD NOT:
 * - Decide game rules or directly mutate state.
 */

import { useSensors, useSensor, PointerSensor, KeyboardSensor } from '@dnd-kit/core';
import type { DragStartEvent, DragOverEvent, DragEndEvent } from '@dnd-kit/core';
import { worldStore } from '../../store/worldStore';
import { updateMascotGaze } from '../../systems/gaze';

export function useSceneDragAndDrop() {
  // 1. Initialize dnd-kit sensors for mouse/touch and keyboard inputs
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: DragStartEvent) => {
    const entityId = String(event.active.id);
    updateMascotGaze('chef', { type: 'entity', entityId });
  };

  const handleDragOver = (event: DragOverEvent) => {
    if (event.over) {
      const containerId = String(event.over.id);
      updateMascotGaze('chef', { type: 'entity', entityId: containerId });
    }
  };

  // 2. Intercept the drop and dispatch a pure WorldAction
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // If dropped outside any valid droppable area, clear gaze
    if (!over) {
      updateMascotGaze('chef', null);
      return;
    }

    const entityId = String(active.id);
    const targetContainerId = String(over.id);

    updateMascotGaze('chef', { type: 'entity', entityId: targetContainerId });

    // Dispatch the intent. The ContainerRules engine inside worldStore
    // will intercept this and silently reject it if the container is full
    // or doesn't accept this entity type.
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: {
        entityId,
        targetContainerId,
      },
    });
  };

  return {
    sensors,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
}
`````

## File: src/types/actions.ts
`````typescript
/**
 * FILE: actions.ts
 *
 * PURPOSE:
 * Defines world actions/events.
 *
 * RESPONSIBILITY:
 * - Creates the communication contract between systems and store.
 */

import type { EntityType } from './world';
import type { PreparationStyle, CookingMethod } from './RecipeStep';

export type WorldAction =
  | {
    type: 'MOVE_ENTITY';
    payload: {
      entityId: string;
      targetContainerId: string;
      positionIndex?: number;
    };
  }
  | {
    type: 'ADD_ENTITY';
    payload: {
      entity: {
        id: string;
        name: string;
        type: EntityType;
        icon?: string;
        ingredientId?: string;
        state?: Record<string, unknown>;
      };
      containerId: string;
    };
  }
  | {
    type: 'TOGGLE_BURNER';
    payload: {
      containerId: string;
    };
  }
  | {
    type: 'REMOVE_ENTITY';
    payload: {
      entityId: string;
    };
  }
  | {
    type: 'UPDATE_ENTITY_STATE';
    payload: {
      entityId: string;
      changes: Record<string, unknown>;
    };
  }
  | {
    type: 'PREPARE_INGREDIENT';
    payload: {
      entityId: string;
      preparation: PreparationStyle;
    };
  }
  | {
    type: 'COOK_INGREDIENT';
    payload: {
      entityId: string;
      cooking: CookingMethod;
    };
  }
  | {
    type: 'USE_INGREDIENT';
    payload: {
      entityId: string;
      usedIn?: string;
    };
  }
  | {
    type: 'MASCOT_FLIP';
    payload: {
      mascotId?: string;
    };
  }
  | {
    type: 'MASCOT_MOVE';
    payload: {
      mascotId?: string;
      targetContainerId: string;
    };
  }
  | {
    type: 'MASCOT_GRAB';
    payload: {
      mascotId?: string;
      entityId: string;
      sourceContainerId?: string;
    };
  }
  | {
    type: 'MASCOT_DROP';
    payload: {
      mascotId?: string;
      targetContainerId: string;
      positionIndex?: number;
    };
  }
  | {
    type: 'MASCOT_CLEAR_GAZE';
    payload: {
      mascotId?: string;
    };
  }
  | {
      type: 'TOGGLE_HEAT';
      payload: {
        containerId: string;
      };
    }
  | {
      type: 'WASH_CONTAINER_CONTENTS';
      payload: {
        containerId: string;
      };
    }
  | {
      type: 'CUT_CONTAINER_CONTENTS';
      payload: {
        containerId: string;
      };
    }
  | {
      type: 'PEEL_CONTAINER_CONTENTS';
      payload: {
        containerId: string;
      };
    }
  | {
      type: 'MIX_CONTAINER_CONTENTS';
      payload: {
        containerId: string;
      };
    }
  | {
      type: 'RESET_WORLD';
      payload?: Record<string, never>;
    };


export type WorldEvent =
  | {
      type: 'INGREDIENT_CONSUMED';
      payload: {
        entityId: string;
        consumedBy?: string;
      };
    }
  | {
      type: 'CONTAINER_HEAT_TOGGLED';
      payload: {
        containerId: string;
        isOn: boolean;
      };
    }
  | {
      type: 'CONTAINER_WASHED';
      payload: {
        containerId: string;
        entityIds: string[];
      };
    }
  | {
      type: 'CONTAINER_CUT';
      payload: {
        containerId: string;
        entityIds: string[];
      };
    }
  | {
      type: 'CONTAINER_PEELED';
      payload: {
        containerId: string;
        entityIds: string[];
      };
    }
  | {
      type: 'CONTAINER_MIXED';
      payload: {
        containerId: string;
        entityIds: string[];
      };
    };
`````

## File: src/components/Scene/Scene.tsx
`````typescript
/**
 * FILE: Scene.tsx
 *
 * PURPOSE:
 * Main game scene renderer.
 *
 * RESPONSIBILITY:
 * - Displays entities in the world.
 * - Connects world state with visual components.
 *
 * DOMAIN:
 * The bridge between game world and React UI.
 */

import React, { useState } from 'react';
import { useStore } from 'zustand';
import { DndContext } from '@dnd-kit/core';
import { worldStore } from '../../store/worldStore';
import { ContainerView } from '../World/ContainerView';
import { useSceneDragAndDrop } from './useSceneDragAndDrop';
import { RecipePlayer } from './RecipePlayer';
import { ActionRecorder } from '../Controls/ActionRecorder';
import { IngredientsSidebar } from '../Controls/IngredientsSidebar';
import './RecipePlayer.scss';

export const Scene: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'player' | 'recorder'>('player');

  // 1. Mount the drag-and-drop input listeners and dispatch handler
  const { sensors, handleDragStart, handleDragOver, handleDragEnd } = useSceneDragAndDrop();

  // 2. Query the pure simulation state for rendering (hiding despensa container from UI view)
  const containersMap = useStore(worldStore, (state) => state.containers);
  const containers = Object.values(containersMap).filter((c) => c.id !== 'despensa');

  const renderWorkspace = (leftNode?: React.ReactNode, rightNode?: React.ReactNode) => (
    <div className="scene-workspace">
      {leftNode}
      <div className="scene">
        {containers.map((container) => (
          <ContainerView key={container.id} container={container} />
        ))}
      </div>
      {rightNode}
    </div>
  );

  return (
    // 3. The DndContext wrapper acts as the physical input boundary
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="scene-container">
        {/* Mode Selector Navigation Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
          <button
            type="button"
            className={`mode-tab-btn ${activeMode === 'player' ? 'active' : ''}`}
            onClick={() => setActiveMode('player')}
            style={{
              padding: '10px 18px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '15px',
              cursor: 'pointer',
              border: '2px solid var(--warm-border, #e2e8f0)',
              background: activeMode === 'player' ? '#d97706' : '#ffffff',
              color: activeMode === 'player' ? '#ffffff' : '#334155',
              boxShadow: activeMode === 'player' ? '0 2px 6px rgba(217,119,6,0.3)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            📖 Play Catalog Recipe Mode
          </button>
          <button
            type="button"
            className={`mode-tab-btn ${activeMode === 'recorder' ? 'active' : ''}`}
            onClick={() => setActiveMode('recorder')}
            style={{
              padding: '10px 18px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '15px',
              cursor: 'pointer',
              border: '2px solid var(--warm-border, #e2e8f0)',
              background: activeMode === 'recorder' ? '#8b5cf6' : '#ffffff',
              color: activeMode === 'recorder' ? '#ffffff' : '#334155',
              boxShadow: activeMode === 'recorder' ? '0 2px 6px rgba(139,92,246,0.3)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            🎥 Action Recorder & Translator Mode
          </button>
        </div>

        {activeMode === 'player' ? (
          <RecipePlayer renderWorkspace={renderWorkspace} />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <ActionRecorder />
            {renderWorkspace(null, <IngredientsSidebar />)}
          </div>
        )}
      </div>
    </DndContext>
  );
};
`````

## File: repomix-output.xml
`````xml
This file is a merged representation of a subset of the codebase, containing specifically included files, combined into a single document by Repomix.

<file_summary>
This section contains a summary of this file.

<purpose>
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.
</purpose>

<file_format>
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  - File path as an attribute
  - Full contents of the file
</file_format>

<usage_guidelines>
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.
</usage_guidelines>

<notes>
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Only files matching these patterns are included: .
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)
</notes>

</file_summary>

<directory_structure>
docs/
  architecture.md
  decisions.md
  entities.md
  README.md
  redux-devtools-actions.json
  redux-devtools-commands.md
  roadmap.md
  systems.md
public/
  favicon.svg
  icons.svg
src/
  assets/
    hero.png
  components/
    Ingredients/
      Ingredient.tsx
      IngredientList.tsx
      IngredientListItem.tsx
      Ingredients.scss
      RecipeIngredientItem.tsx
      RecipeIngredientList.tsx
    Mascot/
      Mascot.tsx
      TortillaSvg.scss
      TortillaSvg.tsx
    Recipe/
      RecipePanel.scss
      RecipePanel.tsx
      RecipeRequirements.tsx
      RequirementView.tsx
    Scene/
      RecipePlayer.scss
      RecipePlayer.tsx
      Scene.tsx
      useSceneDragAndDrop.ts
    World/
      ContainerView.tsx
      EntityIcon.tsx
      EntityStateBadge.tsx
      EntityView.tsx
      rendererRegistry.ts
      World.scss
  data/
    catalog/
      recipes/
        clasica.ts
        concebolla.ts
        index.ts
        recipes.test.ts
      ingredients.ts
      tools.ts
      workstations.ts
  engine/
    containerRules.ts
    ingredientState.ts
    workstations.test.ts
    workstations.ts
  store/
    middleware/
      actionLog.test.ts
      actionLog.ts
    slices/
      containerSlice.ts
      entitySlice.ts
      mascotSlice.ts
    defaults.ts
    gazeStore.ts
    selectors.ts
    types.ts
    worldStore.test.ts
    worldStore.ts
  styles/
    _mixins.scss
    _variables.scss
  systems/
    recipeRunner/
      handlers/
        cookHandlers.test.ts
        cookHandlers.ts
        mixHandlers.ts
        moveHandlers.ts
        prepHandlers.ts
        utilityHandlers.ts
      RecipeRunner.ts
      types.ts
    clasicaCompletion.test.ts
    gaze.test.ts
    gaze.ts
    ingredientUsage.test.ts
    mascot.ts
    mascotActions.test.ts
    mascotActions.ts
    movement.ts
    queries.test.ts
    queries.ts
    recipeMatcher.test.ts
    recipeMatcher.ts
    recipeRunner.test.ts
    recipeRunner.ts
  types/
    actions.ts
    Ingredient.ts
    IngredientList.ts
    Recipe.ts
    RecipeIngredient.ts
    RecipeList.ts
    RecipeStep.ts
    Requirement.ts
    tools.ts
    workstations.ts
    world.ts
  App.tsx
  index.scss
  main.tsx
  repomix-output.xml
.gitignore
AGENTS.md
eslint.config.js
index.html
package.json
README.md
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vite.config.ts
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="docs/README.md">
# Tortilla World

Interactive React application where a tortilla mascot lives in a virtual kitchen.

The user can interact with ingredients, recipes and kitchen objects.

## Stack

- React
- TypeScript
- Zustand
- Framer Motion
- Vite

## Main concept

The application has a small world-state layer.
Objects exist independently from the UI.

Components render the world.
Systems modify the world.
</file>

<file path="public/favicon.svg">
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="46" fill="none" viewBox="0 0 48 46"><path fill="#863bff" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z" style="fill:#863bff;fill:color(display-p3 .5252 .23 1);fill-opacity:1"/><mask id="a" width="48" height="46" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#000" d="M25.842 44.938c-.664.844-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.183c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.498 0-3.579-1.842-3.579H1.133c-.92 0-1.456-1.04-.92-1.787L9.91.473c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.578 1.842 3.578h11.377c.943 0 1.473 1.088.89 1.832L25.843 44.94z" style="fill:#000;fill-opacity:1"/></mask><g mask="url(#a)"><g filter="url(#b)"><ellipse cx="5.508" cy="14.704" fill="#ede6ff" rx="5.508" ry="14.704" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -4.47 31.516)"/></g><g filter="url(#c)"><ellipse cx="10.399" cy="29.851" fill="#ede6ff" rx="10.399" ry="29.851" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -39.328 7.883)"/></g><g filter="url(#d)"><ellipse cx="5.508" cy="30.487" fill="#7e14ff" rx="5.508" ry="30.487" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -25.913 -14.639)scale(1 -1)"/></g><g filter="url(#e)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -32.644 -3.334)scale(1 -1)"/></g><g filter="url(#f)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -34.34 30.47)"/></g><g filter="url(#g)"><ellipse cx="14.072" cy="22.078" fill="#ede6ff" rx="14.072" ry="22.078" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="rotate(93.35 24.506 48.493)scale(-1 1)"/></g><g filter="url(#h)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#i)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#j)"><ellipse cx=".387" cy="8.972" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(39.51 .387 8.972)"/></g><g filter="url(#k)"><ellipse cx="47.523" cy="-6.092" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 47.523 -6.092)"/></g><g filter="url(#l)"><ellipse cx="41.412" cy="6.333" fill="#47bfff" rx="5.971" ry="9.665" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 41.412 6.333)"/></g><g filter="url(#m)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#n)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#o)"><ellipse cx="35.651" cy="29.907" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 35.651 29.907)"/></g><g filter="url(#p)"><ellipse cx="38.418" cy="32.4" fill="#47bfff" rx="5.971" ry="15.297" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 38.418 32.4)"/></g></g><defs><filter id="b" width="60.045" height="41.654" x="-19.77" y="16.149" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="c" width="90.34" height="51.437" x="-54.613" y="-7.533" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="d" width="79.355" height="29.4" x="-49.64" y="2.03" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="e" width="79.579" height="29.4" x="-45.045" y="20.029" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="f" width="79.579" height="29.4" x="-43.513" y="21.178" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="g" width="74.749" height="58.852" x="15.756" y="-17.901" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="h" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="i" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="j" width="56.045" height="63.649" x="-27.636" y="-22.853" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="k" width="54.814" height="64.646" x="20.116" y="-38.415" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="l" width="33.541" height="35.313" x="24.641" y="-11.323" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="m" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="n" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="o" width="54.814" height="64.646" x="8.244" y="-2.416" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="p" width="39.409" height="43.623" x="18.713" y="10.588" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter></defs></svg>
</file>

<file path="public/icons.svg">
<svg xmlns="http://www.w3.org/2000/svg">
  <symbol id="bluesky-icon" viewBox="0 0 16 17">
    <g clip-path="url(#bluesky-clip)"><path fill="#08060d" d="M7.75 7.735c-.693-1.348-2.58-3.86-4.334-5.097-1.68-1.187-2.32-.981-2.74-.79C.188 2.065.1 2.812.1 3.251s.241 3.602.398 4.13c.52 1.744 2.367 2.333 4.07 2.145-2.495.37-4.71 1.278-1.805 4.512 3.196 3.309 4.38-.71 4.987-2.746.608 2.036 1.307 5.91 4.93 2.746 2.72-2.746.747-4.143-1.747-4.512 1.702.189 3.55-.4 4.07-2.145.156-.528.397-3.691.397-4.13s-.088-1.186-.575-1.406c-.42-.19-1.06-.395-2.741.79-1.755 1.24-3.64 3.752-4.334 5.099"/></g>
    <defs><clipPath id="bluesky-clip"><path fill="#fff" d="M.1.85h15.3v15.3H.1z"/></clipPath></defs>
  </symbol>
  <symbol id="discord-icon" viewBox="0 0 20 19">
    <path fill="#08060d" d="M16.224 3.768a14.5 14.5 0 0 0-3.67-1.153c-.158.286-.343.67-.47.976a13.5 13.5 0 0 0-4.067 0c-.128-.306-.317-.69-.476-.976A14.4 14.4 0 0 0 3.868 3.77C1.546 7.28.916 10.703 1.231 14.077a14.7 14.7 0 0 0 4.5 2.306q.545-.748.965-1.587a9.5 9.5 0 0 1-1.518-.74q.191-.14.372-.293c2.927 1.369 6.107 1.369 8.999 0q.183.152.372.294-.723.437-1.52.74.418.838.963 1.588a14.6 14.6 0 0 0 4.504-2.308c.37-3.911-.63-7.302-2.644-10.309m-9.13 8.234c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.894 0 1.614.82 1.599 1.82.001 1-.705 1.82-1.6 1.82m5.91 0c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.893 0 1.614.82 1.599 1.82 0 1-.706 1.82-1.6 1.82"/>
  </symbol>
  <symbol id="documentation-icon" viewBox="0 0 21 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="m15.5 13.333 1.533 1.322c.645.555.967.833.967 1.178s-.322.623-.967 1.179L15.5 18.333m-3.333-5-1.534 1.322c-.644.555-.966.833-.966 1.178s.322.623.966 1.179l1.534 1.321"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M17.167 10.836v-4.32c0-1.41 0-2.117-.224-2.68-.359-.906-1.118-1.621-2.08-1.96-.599-.21-1.349-.21-2.848-.21-2.623 0-3.935 0-4.983.369-1.684.591-3.013 1.842-3.641 3.428C3 6.449 3 7.684 3 10.154v2.122c0 2.558 0 3.838.706 4.726q.306.383.713.671c.76.536 1.79.64 3.581.66"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M3 10a2.78 2.78 0 0 1 2.778-2.778c.555 0 1.209.097 1.748-.047.48-.129.854-.503.982-.982.145-.54.048-1.194.048-1.749a2.78 2.78 0 0 1 2.777-2.777"/>
  </symbol>
  <symbol id="github-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M9.356 1.85C5.05 1.85 1.57 5.356 1.57 9.694a7.84 7.84 0 0 0 5.324 7.44c.387.079.528-.168.528-.376 0-.182-.013-.805-.013-1.454-2.165.467-2.616-.935-2.616-.935-.349-.91-.864-1.143-.864-1.143-.71-.48.051-.48.051-.48.787.051 1.2.805 1.2.805.695 1.194 1.817.857 2.268.649.064-.507.27-.857.49-1.052-1.728-.182-3.545-.857-3.545-3.87 0-.857.31-1.558.8-2.104-.078-.195-.349-1 .077-2.078 0 0 .657-.208 2.14.805a7.5 7.5 0 0 1 1.946-.26c.657 0 1.328.092 1.946.26 1.483-1.013 2.14-.805 2.14-.805.426 1.078.155 1.883.078 2.078.502.546.799 1.247.799 2.104 0 3.013-1.818 3.675-3.558 3.87.284.247.528.714.528 1.454 0 1.052-.012 1.896-.012 2.156 0 .208.142.455.528.377a7.84 7.84 0 0 0 5.324-7.441c.013-4.338-3.48-7.844-7.773-7.844" clip-rule="evenodd"/>
  </symbol>
  <symbol id="social-icon" viewBox="0 0 20 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M12.5 6.667a4.167 4.167 0 1 0-8.334 0 4.167 4.167 0 0 0 8.334 0"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M2.5 16.667a5.833 5.833 0 0 1 8.75-5.053m3.837.474.513 1.035c.07.144.257.282.414.309l.93.155c.596.1.736.536.307.965l-.723.73a.64.64 0 0 0-.152.531l.207.903c.164.715-.213.991-.84.618l-.872-.52a.63.63 0 0 0-.577 0l-.872.52c-.624.373-1.003.094-.84-.618l.207-.903a.64.64 0 0 0-.152-.532l-.723-.729c-.426-.43-.289-.864.306-.964l.93-.156a.64.64 0 0 0 .412-.31l.513-1.034c.28-.562.735-.562 1.012 0"/>
  </symbol>
  <symbol id="x-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M1.893 1.98c.052.072 1.245 1.769 2.653 3.77l2.892 4.114c.183.261.333.48.333.486s-.068.089-.152.183l-.522.593-.765.867-3.597 4.087c-.375.426-.734.834-.798.905a1 1 0 0 0-.118.148c0 .01.236.017.664.017h.663l.729-.83c.4-.457.796-.906.879-.999a692 692 0 0 0 1.794-2.038c.034-.037.301-.34.594-.675l.551-.624.345-.392a7 7 0 0 1 .34-.374c.006 0 .93 1.306 2.052 2.903l2.084 2.965.045.063h2.275c1.87 0 2.273-.003 2.266-.021-.008-.02-1.098-1.572-3.894-5.547-2.013-2.862-2.28-3.246-2.273-3.266.008-.019.282-.332 2.085-2.38l2-2.274 1.567-1.782c.022-.028-.016-.03-.65-.03h-.674l-.3.342a871 871 0 0 1-1.782 2.025c-.067.075-.405.458-.75.852a100 100 0 0 1-.803.91c-.148.172-.299.344-.99 1.127-.304.343-.32.358-.345.327-.015-.019-.904-1.282-1.976-2.808L6.365 1.85H1.8zm1.782.91 8.078 11.294c.772 1.08 1.413 1.973 1.425 1.984.016.017.241.02 1.05.017l1.03-.004-2.694-3.766L7.796 5.75 5.722 2.852l-1.039-.004-1.039-.004z" clip-rule="evenodd"/>
  </symbol>
</svg>
</file>

<file path="eslint.config.js">
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
])
</file>

<file path="index.html">
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>tortilla-world</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
</file>

<file path="tsconfig.app.json">
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023", "DOM"],
    "module": "esnext",
    "types": ["vite/client"],
    "allowArbitraryExtensions": true,
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
</file>

<file path="tsconfig.json">
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
</file>

<file path="tsconfig.node.json">
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023"],
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "module": "nodenext",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}
</file>

<file path="vite.config.ts">
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
</file>

<file path="docs/redux-devtools-actions.json">
[
  {
    "type": "MASCOT_MOVE",
    "payload": {
      "mascotId": "chef",
      "targetContainerId": "despensa"
    }
  },
  {
    "type": "MASCOT_GRAB",
    "payload": {
      "mascotId": "chef",
      "entityId": "potato",
      "sourceContainerId": "despensa"
    }
  },
  {
    "type": "MASCOT_MOVE",
    "payload": {
      "mascotId": "chef",
      "targetContainerId": "board"
    }
  },
  {
    "type": "MASCOT_DROP",
    "payload": {
      "mascotId": "chef",
      "targetContainerId": "board"
    }
  },
  {
    "type": "MASCOT_FLIP",
    "payload": {
      "mascotId": "chef"
    }
  }
]
</file>

<file path="src/components/Recipe/RecipeRequirements.tsx">
/**
 * FILE: RecipeRequirements.tsx
 *
 * PURPOSE:
 * Displays all requirements for a recipe.
 *
 * RESPONSIBILITY:
 * - Renders list of required entities.
 */

import React from 'react';
import type { Requirement } from '../../types/Requirement';
import { RequirementView } from './RequirementView';

interface RecipeRequirementsProps {
  requirements: Requirement[];
}

export const RecipeRequirements: React.FC<RecipeRequirementsProps> = ({ requirements }) => {
  return (
    <ul className="recipe-requirements">
      {requirements.map((req, idx) => (
        <RequirementView key={req.id || `${req.entityId}-${idx}`} requirement={req} />
      ))}
    </ul>
  );
};
</file>

<file path="src/components/World/EntityIcon.tsx">
/**
 * FILE: EntityIcon.tsx
 *
 * PURPOSE:
 * Visual icon representation for any entity in the world (ingredients, tools, containers, products).
 *
 * RESPONSIBILITY:
 * - Renders symbol/icon based on entity data, catalog lookup, or entity type fallback.
 */

import React from 'react';
import type { Entity } from '../../types/world';
import { ingredients } from '../../data/catalog/ingredients';
import { catalogTools as tools } from '../../data/catalog/tools';

interface EntityIconProps {
  entity?: Entity;
  icon?: string;
  entityId?: string;
  type?: string;
}

const FALLBACK_ICONS: Record<string, string> = {
  potato: '🥔',
  egg: '🥚',
  onion: '🧅',
  oil: '🫗',
  salt: '🧂',
  pepper: '🌶️',
  knife: '🔪',
  pan: '🍳',
  plate: '🍽️',
  bowl: '🥣',
  sink: '💧',
  board: '🪵',
  tortilla: '🫓',
};

export const EntityIcon: React.FC<EntityIconProps> = ({ entity, icon, entityId, type }) => {
  if (icon) {
    return <span className="entity-icon" aria-hidden="true">{icon}</span>;
  }

  if (entity?.icon) {
    return <span className="entity-icon" aria-hidden="true">{entity.icon}</span>;
  }

  const lookupId = entity?.ingredientId || entity?.id || entityId || '';

  // Catalog lookup
  const catalogIng = ingredients.find((i) => i.id === lookupId || lookupId.startsWith(i.id));
  if (catalogIng?.icon) {
    return <span className="entity-icon" aria-hidden="true">{catalogIng.icon}</span>;
  }

  const catalogTool = tools.find((t) => t.id === lookupId || lookupId.startsWith(t.id));
  if (catalogTool?.icon) {
    return <span className="entity-icon" aria-hidden="true">{catalogTool.icon}</span>;
  }

  // Prefix key match
  for (const [key, fallbackIcon] of Object.entries(FALLBACK_ICONS)) {
    if (lookupId.toLowerCase().includes(key)) {
      return <span className="entity-icon" aria-hidden="true">{fallbackIcon}</span>;
    }
  }

  const defaultTypeIcon = type === 'tool' ? '🔧' : type === 'container' ? '📦' : '📦';

  return <span className="entity-icon" aria-hidden="true">{defaultTypeIcon}</span>;
};
</file>

<file path="src/components/World/EntityStateBadge.tsx">
/**
 * FILE: EntityStateBadge.tsx
 *
 * PURPOSE:
 * Displays status/state indicator badges for world entities.
 *
 * RESPONSIBILITY:
 * - Reflects state changes such as Raw, Prepared, Cooking, or Finished.
 */

import React from 'react';
import type { Entity } from '../../types/world';

interface EntityStateBadgeProps {
  entity: Entity;
  containerId?: string;
}

export const EntityStateBadge: React.FC<EntityStateBadgeProps> = ({ entity, containerId }) => {
  const prep = entity.state?.preparation as string | undefined;
  const cooking = entity.state?.cooking as string | undefined;
  const status = entity.state?.status as string | undefined;

  if (containerId === 'plate' || status?.includes('cooked') || status?.includes('fried') || status?.includes('tortilla')) {
    return <span className="entity-view__state entity-view__state--finished">Finished ✨</span>;
  }

  if (cooking && cooking !== 'raw') {
    return <span className="entity-view__state entity-view__state--cooking">Cooking 🔥</span>;
  }

  if (prep) {
    return <span className="entity-view__state entity-view__state--prepared">{prep} 🔪</span>;
  }

  if (entity.type === 'ingredient') {
    return <span className="entity-view__state entity-view__state--raw">Raw 🌾</span>;
  }

  return null;
};
</file>

<file path="src/components/World/rendererRegistry.ts">
/**
 * FILE: rendererRegistry.ts
 *
 * PURPOSE:
 * Registry for custom entity type renderers.
 */

import React from 'react';
import type { Entity } from '../../types/world';

export interface EntityRendererProps {
  entity: Entity;
  containerId?: string;
  readOnly?: boolean;
}

export type EntityRenderer = React.ComponentType<EntityRendererProps>;

export const entityRendererRegistry: Record<string, EntityRenderer> = {};

export function registerEntityRenderer(type: string, renderer: EntityRenderer): void {
  entityRendererRegistry[type] = renderer;
}
</file>

<file path="src/data/catalog/tools.ts">
/**
 * FILE: tools.ts
 *
 * PURPOSE:
 * Catalog of reusable kitchen tools as first-class entities.
 */

import type { ToolCatalogItem } from '../../types/tools';

export const catalogTools: ToolCatalogItem[] = [
  { id: 'knife', name: 'Chef Knife', icon: '🔪', category: 'cutting' },
  { id: 'peeler', name: 'Vegetable Peeler', icon: '🥔', category: 'cutting' },
  { id: 'whisk', name: 'Whisk', icon: '🥣', category: 'mixing' },
  { id: 'fork', name: 'Fork', icon: '🍴', category: 'mixing' },
  { id: 'spatula', name: 'Spatula', icon: '🍳', category: 'cooking' },
  { id: 'grater', name: 'Grater', icon: '🧀', category: 'cutting' },
  { id: 'mandoline', name: 'Mandoline', icon: '🔪', category: 'cutting' },
  { id: 'spoon', name: 'Spoon', icon: '🥄', category: 'mixing' },
];
</file>

<file path="src/engine/workstations.test.ts">
/**
 * FILE: workstations.test.ts
 *
 * PURPOSE:
 * Unit tests for workstation mapping and tool resolution logic.
 */

import { describe, expect, it } from 'vitest';
import { findWorkstationForStep, findToolsForStep } from './workstations';
import { KITCHEN_WORKSTATIONS } from '../data/catalog/workstations';

describe('Workstations Engine', () => {
  it('maps steps to correct workstations', () => {
    expect(findWorkstationForStep({ action: 'prepare', target: 'potatoes', preparation: 'peeled' }))
      .toBe(KITCHEN_WORKSTATIONS.cutting_station);

    expect(findWorkstationForStep({ action: 'prepare', target: 'eggs', preparation: 'beaten' }))
      .toBe(KITCHEN_WORKSTATIONS.preparation_station);

    expect(findWorkstationForStep({ action: 'cook', target: 'potatoes', method: 'fry' }))
      .toBe(KITCHEN_WORKSTATIONS.cooking_station);

    expect(findWorkstationForStep({ action: 'mix', inputs: ['potatoes', 'eggs'] }))
      .toBe(KITCHEN_WORKSTATIONS.preparation_station);

    expect(findWorkstationForStep({ action: 'serve', target: 'mixture' }))
      .toBe(KITCHEN_WORKSTATIONS.serving_station);

    expect(findWorkstationForStep({ action: 'wash', target: 'potatoes' }))
      .toBe(KITCHEN_WORKSTATIONS.washing_station);
  });

  it('determines required/recommended tools for steps', () => {
    expect(findToolsForStep({ action: 'prepare', target: 'potatoes', preparation: 'peeled' }))
      .toEqual(['peeler', 'knife']);

    expect(findToolsForStep({ action: 'cut', ingredient: 'potato', style: 'sliced' }))
      .toEqual(['knife']);

    expect(findToolsForStep({ action: 'mix', inputs: ['potatoes', 'eggs'] }))
      .toEqual(['whisk', 'fork', 'spoon']);

    expect(findToolsForStep({ action: 'cook', target: 'oil', method: 'heat' }))
      .toEqual(['spatula', 'pan']);
  });
});
</file>

<file path="src/engine/workstations.ts">
/**
 * FILE: workstations.ts (Engine)
 *
 * PURPOSE:
 * Logic to map recipe steps and cooking actions to workstations and required tools.
 *
 * RESPONSIBILITY:
 * - Decides which workstation should handle an action.
 * - Determines required and available tools for an action.
 */

import type { RecipeStep } from '../types/RecipeStep';
import type { Workstation } from '../types/workstations';
import { KITCHEN_WORKSTATIONS } from '../data/catalog/workstations';

/**
 * Automatically determines the appropriate Workstation for a given RecipeStep.
 */
export function findWorkstationForStep(step: RecipeStep): Workstation {
  const action = step.action;

  if (action === 'prepare' || action === 'cut') {
    const prep = (step.preparation || step.style || '').toLowerCase();
    if (['beaten', 'whisked', 'kneaded', 'seasoned', 'cracked'].includes(prep)) {
      return KITCHEN_WORKSTATIONS.preparation_station;
    }
    return KITCHEN_WORKSTATIONS.cutting_station;
  }

  if (action === 'cook') {
    return KITCHEN_WORKSTATIONS.cooking_station;
  }

  if (action === 'mix' || action === 'beat') {
    return KITCHEN_WORKSTATIONS.preparation_station;
  }

  if (action === 'serve') {
    return KITCHEN_WORKSTATIONS.serving_station;
  }

  if (action === 'wash' || action === 'rinse' || action === 'drain') {
    return KITCHEN_WORKSTATIONS.washing_station;
  }

  if (action === 'move' || action === 'grab' || action === 'drop') {
    return KITCHEN_WORKSTATIONS.pantry;
  }

  return KITCHEN_WORKSTATIONS.cutting_station;
}

/**
 * Determines the tool requirements for a given RecipeStep.
 */
export function findToolsForStep(step: RecipeStep): string[] {
  const action = step.action;

  if (action === 'prepare' || action === 'cut') {
    const prep = (step.preparation || step.style || '').toLowerCase();
    if (prep === 'peeled') {
      return ['peeler', 'knife'];
    }
    if (prep === 'beaten' || prep === 'whisked') {
      return ['whisk', 'fork'];
    }
    if (prep === 'grated') {
      return ['grater'];
    }
    return ['knife'];
  }

  if (action === 'mix' || action === 'beat') {
    return ['whisk', 'fork', 'spoon'];
  }

  if (action === 'cook') {
    return ['spatula', 'pan'];
  }

  return [];
}
</file>

<file path="src/store/slices/containerSlice.ts">
/**
 * FILE: containerSlice.ts
 *
 * PURPOSE:
 * Zustand slice for container management and entity transfers/movements.
 *
 * RESPONSIBILITY:
 * - Mutates container entity IDs in world state.
 * - Enforces container rules and handles immutable source container copies.
 */

import type { StateCreator } from 'zustand/vanilla';
import type { Container, Entity } from '../../types/world';
import type { WorldStateStore } from '../types';
import { validateContainerRules } from '../../engine/containerRules';

export interface ContainerSlice {
  containers: Record<string, Container>;
  moveEntity: (entityId: string, targetContainerId: string, positionIndex?: number) => void;
}

export const createContainerSlice: StateCreator<
  WorldStateStore,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  ContainerSlice
> = (set, get) => ({
  containers: {},

  moveEntity: (entityId, targetContainerId, positionIndex) => {
    const state = get();
    const entity = state.entities[entityId];
    const targetContainer = state.containers[targetContainerId];
    if (!entity || !targetContainer) return;

    const sourceContainer = Object.values(state.containers).find((c) =>
      c.entityIds.includes(entityId)
    );

    const isSourceImmutable =
      sourceContainer?.rules?.isImmutable || sourceContainer?.rules?.consumesOnDrag === false;

    // Immutable source container logic: create a copy instance in target
    if (sourceContainer && sourceContainer.id !== targetContainerId && isSourceImmutable) {
      const copyId = `${entity.id}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      const copyEntity: Entity = {
        ...entity,
        id: copyId,
        ingredientId: entity.ingredientId || entity.id.split('_')[0],
      };

      const currentEntities = targetContainer.entityIds
        .map((id) => state.entities[id])
        .filter((e): e is Entity => Boolean(e));
      const result = validateContainerRules(targetContainer, copyEntity, currentEntities);
      if (!result.allowed) return;

      set(
        (draft) => {
          draft.entities[copyId] = copyEntity;
          if (typeof positionIndex === 'number') {
            draft.containers[targetContainerId].entityIds.splice(positionIndex, 0, copyId);
          } else {
            draft.containers[targetContainerId].entityIds.push(copyId);
          }
        },
        false,
        'MOVE_ENTITY'
      );
      return;
    }

    // Reordering within the same container never re-checks rules
    if (sourceContainer?.id !== targetContainerId) {
      const currentEntities = targetContainer.entityIds
        .map((id) => state.entities[id])
        .filter((e): e is Entity => Boolean(e) && e.id !== entityId);
      const result = validateContainerRules(targetContainer, entity, currentEntities);
      if (!result.allowed) return;
    }

    set(
      (draft) => {
        if (sourceContainer) {
          draft.containers[sourceContainer.id].entityIds = draft.containers[
            sourceContainer.id
          ].entityIds.filter((id) => id !== entityId);
        }

        if (typeof positionIndex === 'number') {
          draft.containers[targetContainerId].entityIds.splice(positionIndex, 0, entityId);
        } else {
          draft.containers[targetContainerId].entityIds.push(entityId);
        }
      },
      false,
      'MOVE_ENTITY'
    );
  },
});
</file>

<file path="src/store/selectors.ts">
/**
 * FILE: selectors.ts
 *
 * PURPOSE:
 * Reusable Zustand selectors for components and systems.
 *
 * RESPONSIBILITY:
 * - Provides memoized or simple state derivation selectors.
 * - Prevents unnecessary React re-renders by selecting narrow slices of state.
 */

import type { WorldState } from '../types/world';
import type { Container, Entity } from '../types/world';

/** Selects all entities from the world state */
export const selectEntities = (state: WorldState): Record<string, Entity> => state.entities;

/** Selects a single entity by its ID */
export const selectEntityById = (id: string) => (state: WorldState): Entity | undefined =>
  state.entities[id];

/** Selects all containers from the world state */
export const selectContainers = (state: WorldState): Record<string, Container> => state.containers;

/** Selects a single container by its ID */
export const selectContainerById = (id: string) => (state: WorldState): Container | undefined =>
  state.containers[id];

/** Selects all resolved entities contained in a given container ID */
export const selectContainerEntities = (containerId: string) => (state: WorldState): Entity[] => {
  const container = state.containers[containerId];
  if (!container) return [];
  return container.entityIds
    .map((id) => state.entities[id])
    .filter((e): e is Entity => Boolean(e));
};

/** Selects the mascot entity */
export const selectMascot = (mascotId: string = 'chef') => (state: WorldState): Entity | undefined =>
  state.entities[mascotId];
</file>

<file path="src/systems/ingredientUsage.test.ts">
/**
 * FILE: src/systems/ingredientUsage.test.ts
 *
 * PURPOSE:
 * Unit tests for ingredient usage intent actions and domain events.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { worldStore } from '../store/worldStore';
import { clearActionLog, getActionLog } from '../store/middleware/actionLog';

function seedWorld() {
  worldStore.setState({
    entities: {
      potato_1: { id: 'potato_1', name: 'Potato', type: 'ingredient', ingredientId: 'potato' },
      onion_1: { id: 'onion_1', name: 'Onion', type: 'ingredient', ingredientId: 'onion' },
      egg_1: { id: 'egg_1', name: 'Egg', type: 'ingredient', ingredientId: 'egg' },
      oil_1: { id: 'oil_1', name: 'Oil', type: 'ingredient', ingredientId: 'oil' },
    },
    containers: {
      pantry: {
        id: 'pantry',
        name: 'Pantry',
        type: 'storage',
        entityIds: ['potato_1', 'onion_1', 'egg_1', 'oil_1'],
      },
      recipe_1: {
        id: 'recipe_1',
        name: 'Tortilla Recipe',
        type: 'plate',
        entityIds: [],
      },
    },
    events: [],
  });
}

describe('Ingredient Usage Intent Actions & Domain Events', () => {
  beforeEach(() => {
    seedWorld();
    clearActionLog();
  });

  it('Scenario 1: Using ingredient moves it to target container, marks it consumed, and emits INGREDIENT_CONSUMED event', () => {
    const eventListener = vi.fn();
    const unsubscribe = worldStore.getState().onEvent(eventListener);

    // Dispatch USE_INGREDIENT intent action
    worldStore.getState().dispatch({
      type: 'USE_INGREDIENT',
      payload: {
        entityId: 'potato_1',
        usedIn: 'recipe_1',
      },
    });

    const state = worldStore.getState();

    // Potato is removed from pantry
    expect(state.containers.pantry.entityIds).not.toContain('potato_1');

    // Potato is added to recipe_1
    expect(state.containers.recipe_1.entityIds).toContain('potato_1');

    // Potato state updated to consumed
    const potato = state.entities.potato_1;
    expect(potato.state?.consumed).toBe(true);
    expect(potato.state?.consumedBy).toBe('recipe_1');
    expect(potato.state?.status).toBe('consumed');

    // Action logged
    const actionLog = getActionLog();
    expect(actionLog.some((e) => e.action === 'USE_INGREDIENT')).toBe(true);

    // Event emitted
    expect(eventListener).toHaveBeenCalledWith({
      type: 'INGREDIENT_CONSUMED',
      payload: {
        entityId: 'potato_1',
        consumedBy: 'recipe_1',
      },
    });

    const recordedEvents = state.events;
    expect(recordedEvents).toContainEqual({
      type: 'INGREDIENT_CONSUMED',
      payload: {
        entityId: 'potato_1',
        consumedBy: 'recipe_1',
      },
    });

    unsubscribe();
  });

  it('Scenario 2: Undoing action restores entity to previous container and reverts consumed state', () => {
    // Perform initial USE_INGREDIENT action
    worldStore.getState().dispatch({
      type: 'USE_INGREDIENT',
      payload: {
        entityId: 'potato_1',
        usedIn: 'recipe_1',
      },
    });

    // Verify it is consumed
    let state = worldStore.getState();
    expect(state.containers.pantry.entityIds).not.toContain('potato_1');
    expect(state.containers.recipe_1.entityIds).toContain('potato_1');
    expect(state.entities.potato_1.state?.consumed).toBe(true);

    // Revert/undo action
    worldStore.getState().revertIngredientUsage('potato_1');

    state = worldStore.getState();

    // Potato returns to previous container (pantry)
    expect(state.containers.pantry.entityIds).toContain('potato_1');
    expect(state.containers.recipe_1.entityIds).not.toContain('potato_1');

    // Consumed state is reverted
    expect(state.entities.potato_1.state?.consumed).toBeUndefined();
    expect(state.entities.potato_1.state?.consumedBy).toBeUndefined();
    expect(state.entities.potato_1.state?.status).toBeUndefined();
  });

  it('Scenario 3: Two ingredients consumed independently do not affect each other or remaining ingredients', () => {
    // Consume potato
    worldStore.getState().dispatch({
      type: 'USE_INGREDIENT',
      payload: {
        entityId: 'potato_1',
        usedIn: 'recipe_1',
      },
    });

    // Consume onion
    worldStore.getState().dispatch({
      type: 'USE_INGREDIENT',
      payload: {
        entityId: 'onion_1',
        usedIn: 'recipe_1',
      },
    });

    const state = worldStore.getState();

    // Both potato and onion are in recipe_1
    expect(state.containers.recipe_1.entityIds).toEqual(['potato_1', 'onion_1']);

    // Potato and onion are consumed
    expect(state.entities.potato_1.state?.consumed).toBe(true);
    expect(state.entities.onion_1.state?.consumed).toBe(true);

    // Egg and oil remain untouched in pantry and not consumed
    expect(state.containers.pantry.entityIds).toEqual(['egg_1', 'oil_1']);
    expect(state.entities.egg_1.state?.consumed).toBeUndefined();
    expect(state.entities.oil_1.state?.consumed).toBeUndefined();
  });
});
</file>

<file path="src/types/RecipeList.ts">
/**
 * FILE: RecipeList.ts
 *
 * PURPOSE:
 * Export RecipeList type for recipe catalog collections.
 *
 * RESPONSIBILITY:
 * - Defines collection contracts for recipes.
 */

import type { Recipe, RecipeList as RecipeListArray } from './Recipe'

export type { Recipe }
export type RecipeList = RecipeListArray
</file>

<file path="src/types/Requirement.ts">
/**
 * FILE: Requirement.ts
 *
 * PURPOSE:
 * Defines entity requirement usage inside recipes.
 *
 * RESPONSIBILITY:
 * - Stores required entity information, quantity, and unit.
 */

export interface Requirement {
  id?: string;
  entityId: string;
  amount: number;
  unit: string;
  name?: string;
}

export interface RequirementDictItem {
  entityId?: string;
  ingredientId?: string; // Legacy fallback
  amount: number;
  unit: string;
  name?: string;
}
</file>

<file path="src/types/tools.ts">
/**
 * FILE: tools.ts
 *
 * PURPOSE:
 * Defines first-class tool entity models and categories.
 *
 * RESPONSIBILITY:
 * - Represents tools as reusable world objects used by kitchen workstations and actions.
 */

export type ToolCategory = 'cutting' | 'mixing' | 'cooking' | 'utility';

export type ToolCatalogItem = {
  id: string;
  name: string;
  icon: string;
  category: ToolCategory;
};
</file>

<file path="src/repomix-output.xml">
This file is a merged representation of a subset of the codebase, containing specifically included files, combined into a single document by Repomix.

<file_summary>
This section contains a summary of this file.

<purpose>
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.
</purpose>

<file_format>
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  - File path as an attribute
  - Full contents of the file
</file_format>

<usage_guidelines>
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.
</usage_guidelines>

<notes>
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Only files matching these patterns are included: .
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)
</notes>

</file_summary>

<directory_structure>
assets/
  hero.png
components/
  Ingredients/
    Ingredient.tsx
    IngredientList.tsx
    IngredientListItem.tsx
    Ingredients.css
    RecipeIngredientItem.tsx
    RecipeIngredientList.tsx
  Mascot/
    Mascot.tsx
    TortillaSvg.tsx
  Scene/
    Scene.tsx
    useSceneDragAndDrop.ts
data/
  catalog/
    recipes/
      concebolla.ts
      sincebolla.ts
    ingredients.ts
engine/
  containerRules.ts
store/
  middleware/
    actionLog.test.ts
    actionLog.ts
  gazeStore.ts
  worldStore.test.ts
  worldStore.ts
systems/
  dropRules.test.ts
  dropRules.ts
  gaze.test.ts
  gaze.ts
  interaction.test.ts
  interaction.ts
  movement.ts
  queries.test.ts
  queries.ts
types/
  actions.ts
  Entity.ts
  Ingredient.ts
  IngredientList.ts
  RecipeIngredient.ts
  world.ts
App.tsx
index.css
main.tsx
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="components/Ingredients/Ingredient.tsx">
/**
 * FILE: Ingredient.tsx
 *
 * PURPOSE:
 * Visual representation of one ingredient.
 *
 * RESPONSIBILITY:
 * - Displays ingredient information.
 * - Handles ingredient presentation only.
 *
 * SHOULD NOT:
 * - Manage inventory.
 * - Apply game rules.
 * - Modify world state.
 */

import type { Ingredient as IngredientModel } from '../../types/Ingredient'

interface IngredientProps {
  ingredient: IngredientModel
}

export function Ingredient({ ingredient }: IngredientProps) {
  return (
    <>
      <span aria-hidden="true">{ingredient.icon}</span>
      <span>{ingredient.name}</span>
    </>
  )
}
</file>

<file path="components/Ingredients/IngredientList.tsx">
/**
 * FILE: IngredientList.tsx
 *
 * PURPOSE:
 * Displays a collection/container of ingredients.
 *
 * RESPONSIBILITY:
 * - Renders ingredients belonging to a specific list.
 * - Delegates individual rendering to IngredientListItem.
 *
 * DOMAIN:
 * Represents UI for containers like pantry, kitchen, recipe.
 */

import { useStore } from 'zustand';
import { worldStore } from '../../store/worldStore';
import type { Entity } from '../../types/world';

export function IngredientList({ containerEntityIds }: { containerEntityIds: string[] }) {
  const entities = useStore(worldStore, (state) => state.entities);

  const containerEntities = containerEntityIds
    .map((id: string) => entities[id])
    .filter((e: Entity | undefined): e is Entity => Boolean(e));

  return (
    <div>
      {containerEntities.map((entity: Entity) => (
        <div key={entity.id}>{entity.name}</div>
      ))}
    </div>
  );
}
</file>

<file path="components/Ingredients/IngredientListItem.tsx">
/**
 * FILE: IngredientListItem.tsx
 *
 * PURPOSE:
 * UI wrapper for an ingredient inside a list.
 *
 * RESPONSIBILITY:
 * - Connects ingredient rendering with list interactions.
 * - Provides drag/drop related UI behavior.
 */

import React from 'react';
import { worldStore } from '../../store/worldStore';
import type { Entity } from '../../types/world';

interface IngredientListItemProps {
  entity: Entity;
}

export const IngredientListItem: React.FC<IngredientListItemProps> = ({ entity }) => {
  const handleRemove = () => {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: {
        entityId: entity.id,
        targetContainerId: 'storage',
      },
    });
  };

  return (
    <div className="ingredient-list-item">
      <span>{entity.name}</span>
      <button onClick={handleRemove}>Remove</button>
    </div>
  );
};
</file>

<file path="components/Ingredients/Ingredients.css">
.ingredient-list-panel {
  background: linear-gradient(135deg, #fffdf8 0%, #f7efe7 100%);
  border: 1px solid #e7d8c3;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(82, 55, 24, 0.08);
  min-width: 240px;
  padding: 16px;
}

.ingredient-list-header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.ingredient-list-header h3 {
  color: #6b4226;
  font-size: 1rem;
  margin: 0;
}

.ingredient-list-header span {
  color: #8b6a45;
  font-size: 0.85rem;
}

.ingredient-list,
.recipe-ingredient-list {
  display: grid;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.ingredient-list-item,
.recipe-ingredient-item {
  align-items: center;
  background: #ffffff;
  border: 1px solid #e6d5bf;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
  display: flex;
  gap: 0.5rem;
  padding: 10px 12px;
  user-select: none;
}

.ingredient-list-item-body {
  align-items: center;
  cursor: grab;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  gap: 0.5rem;
  min-width: 0;
}

.ingredient-list-item-body:active {
  cursor: grabbing;
}

.ingredient-remove {
  align-items: center;
  background: transparent;
  border: none;
  border-radius: 6px;
  color: #8b6a45;
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  font-size: 1.25rem;
  height: 1.75rem;
  justify-content: center;
  line-height: 1;
  padding: 0;
  width: 1.75rem;
}

.ingredient-remove:hover {
  background: #f5e8d8;
  color: #6b4226;
}

.ingredient-remove:focus-visible {
  outline: 2px solid #c9956a;
  outline-offset: 2px;
}

.ingredient-list-item:active,
.recipe-ingredient-item:active {
  cursor: grabbing;
}

.ingredient-list-item span {
  font-size: 1rem;
}

.recipe-ingredient-amount {
  margin-left: auto;
}

.scene-panel {
  display: flex;
  gap: 16px;
  margin-top: 16px;
  flex-wrap: wrap;
}

@media (max-width: 30rem) {
  .recipe-ingredient-amount {
    margin-left: 0;
    width: 100%;
  }
}
</file>

<file path="components/Ingredients/RecipeIngredientItem.tsx">
/**
 * FILE: RecipeIngredientItem.tsx
 *
 * PURPOSE:
 * Displays an ingredient used in a recipe.
 *
 * RESPONSIBILITY:
 * - Shows ingredient amount and unit.
 * - Represents recipe-specific ingredient data.
 */

import type { Ingredient } from '../../types/Ingredient'

interface RecipeIngredientItemProps {
  ingredient: Ingredient
  amount: number
  unit: string
}

export function RecipeIngredientItem({
  ingredient,
  amount,
  unit,
}: RecipeIngredientItemProps) {
  return (
    <li className="recipe-ingredient-item">
      <span aria-hidden="true">{ingredient.icon}</span>
      <span className="recipe-ingredient-name">{ingredient.name}</span>
      <span className="recipe-ingredient-amount">
        {amount} {unit}
      </span>
    </li>
  )
}
</file>

<file path="components/Ingredients/RecipeIngredientList.tsx">
/**
 * FILE: RecipeIngredientList.tsx
 *
 * PURPOSE:
 * Displays the ingredients required by a recipe.
 *
 * RESPONSIBILITY:
 * - Renders recipe ingredient collection.
 * - Provides recipe-oriented presentation.
 */

import type { Ingredient } from '../../types/Ingredient'
import type { RecipeIngredient } from '../../types/RecipeIngredient'
import './Ingredients.css'
import { RecipeIngredientItem } from './RecipeIngredientItem'

interface RecipeIngredientListProps {
  ingredients: RecipeIngredient[]
  ingredientCatalog: Ingredient[]
}

export function RecipeIngredientList({
  ingredients,
  ingredientCatalog,
}: RecipeIngredientListProps) {
  const ingredientsById = new Map(
    ingredientCatalog.map((ingredient) => [ingredient.id, ingredient]),
  )

  return (
    <ul className="recipe-ingredient-list">
      {ingredients.map((recipeIngredient) => {
        const ingredient = ingredientsById.get(recipeIngredient.ingredientId)

        if (!ingredient) {
          return null
        }

        return (
          <RecipeIngredientItem
            key={recipeIngredient.id}
            amount={recipeIngredient.amount}
            ingredient={ingredient}
            unit={recipeIngredient.unit}
          />
        )
      })}
    </ul>
  )
}
</file>

<file path="components/Mascot/Mascot.tsx">
/**
 * FILE: Mascot.tsx
 *
 * PURPOSE:
 * Main Tortilla mascot component.
 *
 * RESPONSIBILITY:
 * - Controls mascot visual representation.
 * - Displays mascot state and animations.
 *
 * SHOULD NOT:
 * - Own world state.
 * - Contain gameplay rules.
 */

import React from 'react';
import { useStore } from 'zustand';
import { worldStore } from '../../store/worldStore';

interface MascotProps {
  mascotId?: string;
}

export const Mascot: React.FC<MascotProps> = ({ mascotId = 'chef' }) => {
  const mascotEntity = useStore(worldStore, (state) => state.entities[mascotId]);

  if (!mascotEntity) return null;

  return (
    <div className="mascot">
      <h3>{mascotEntity.name}</h3>
      Gazing at: {mascotEntity.state?.gazingAt ? String(mascotEntity.state.gazingAt) : 'Nothing'}
    </div>
  );
};
</file>

<file path="components/Mascot/TortillaSvg.tsx">
/**
 * FILE: TortillaSvg.tsx
 *
 * PURPOSE:
 * SVG graphics definition for the Tortilla mascot.
 *
 * RESPONSIBILITY:
 * - Contains visual SVG structure only.
 * - Provides reusable mascot artwork.
 */

import React from 'react';
import type { GazeTarget } from '../../systems/gaze';

interface TortillaSvgProps {
  gazingAt?: GazeTarget;
}

export const TortillaSvg: React.FC<TortillaSvgProps> = ({ gazingAt }) => {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40" fill="#f4d03f" />
      {/* Visual representation of mascot gaze direction */}
      <circle cx={gazingAt ? 60 : 50} cy="40" r="5" fill="#000" />
    </svg>
  );
};
</file>

<file path="components/Scene/Scene.tsx">
/**
 * FILE: Scene.tsx
 *
 * PURPOSE:
 * Main game scene renderer.
 *
 * RESPONSIBILITY:
 * - Displays entities in the world.
 * - Connects world state with visual components.
 *
 * DOMAIN:
 * The bridge between game world and React UI.
 */

import React from 'react';
import { useStore } from 'zustand';
import { worldStore } from '../../store/worldStore';
import { IngredientList } from '../Ingredients/IngredientList';

export const Scene: React.FC = () => {
  const containers = useStore(
    worldStore,
    (state) => state.containers
  );

  const containerList = Object.values(containers);

  return (
    <div className="scene">
      {containerList.map((container) => (
        <IngredientList
          key={container.id}
          containerEntityIds={container.entityIds}
        />
      ))}
    </div>
  );
};
</file>

<file path="components/Scene/useSceneDragAndDrop.ts">
/**
 * FILE: useSceneDragAndDrop.ts
 *
 * PURPOSE:
 * React hook connecting drag/drop events with the game world.
 *
 * RESPONSIBILITY:
 * - Handles DnD lifecycle.
 * - Translates UI interactions into world actions.
 *
 * SHOULD NOT:
 * - Decide game rules.
 * - Directly manipulate entity collections.
 */

import { useStore } from 'zustand';
import { worldStore } from '../../store/worldStore';

export function useSceneDragAndDrop() {
  const containers = useStore(worldStore, (state) => Object.values(state.containers));

  return {
    containers,
  };
}
</file>

<file path="data/catalog/recipes/concebolla.ts">
import { ingredients } from '../ingredients'

export const recipe = {
  id: 'concebolla',
  name: 'Con Cebolla',
  ingredients: [
    ingredients.find((i) => i.id === 'potato'),
    ingredients.find((i) => i.id === 'egg'),
    ingredients.find((i) => i.id === 'oil'),
    ingredients.find((i) => i.id === 'salt'),
    ingredients.find((i) => i.id === 'pepper'),
    ingredients.find((i) => i.id === 'onion'),
  ],
}
</file>

<file path="data/catalog/recipes/sincebolla.ts">
import { ingredients } from "../ingredients";

export const recipe = {
  id: "sincebolla",
  name: "Sincebolla",
  ingredients: [
    ingredients.find(i => i.id === "potato"),
    ingredients.find(i => i.id === "egg"),
    ingredients.find(i => i.id === "oil"),
    ingredients.find(i => i.id === "salt"),
    ingredients.find(i => i.id === "pepper"),
  ]
};
</file>

<file path="data/catalog/ingredients.ts">
import type { Ingredient } from "../../types/Ingredient";


export const ingredients: Ingredient[] = [

  {
    id: "potato",
    icon: "🥔",
    name: "Potatoes",
  },


  {
    id: "egg",
    icon: "🥚",
    name: "Eggs",
  },


  {
    id: "oil",
    icon: "🫒",
    name: "Olive Oil",
  },


  {
    id: "onion",
    icon: "🧅",
    name: "Onion",
  },


  {
    id: "chorizo",
    icon: "🌭",
    name: "Chorizo",
  },

  {
    id: "salt",
    icon: "🧂",
    name: "Salt",
  },

  {
    id: "pepper",
    icon: "🫑",
    name: "Bell Pepper",
  },

  {
    id: "garlic",
    icon: "🧄",
    name: "Garlic",
  },

  {
    id: "tomato",
    icon: "🍅",
    name: "Tomato",
  },

  {
    id: "cheese",
    icon: "🧀",
    name: "Cheese",
  },

  {
    id: "bread",
    icon: "🍞",
    name: "Bread",
  },

  {
    id: "milk",
    icon: "🥛",
    name: "Milk",
  },

  {
    id: "butter",
    icon: "🧈",
    name: "Butter",
  },

];
</file>

<file path="engine/containerRules.ts">
/**
 * FILE: containerRules.ts
 *
 * PURPOSE:
 * Generic container behavior rules.
 *
 * RESPONSIBILITY:
 * - Defines reusable rules for lists/containers.
 * - Determines allowed contents and constraints.
 *
 * DOMAIN:
 * Game engine logic independent from React.
 */

import type { Container, Entity } from '../types/world';

export interface ValidationResult {
  allowed: boolean;
  reason?: string;
}

export function validateContainerRules(
  container: Container,
  entity: Entity,
  currentEntitiesInContainer: Entity[]
): ValidationResult {
  const rules = container.rules;

  if (!rules) {
    return { allowed: true };
  }

  // 1. Capacity Check
  if (
    rules.maxCapacity !== undefined &&
    container.entityIds.length >= rules.maxCapacity
  ) {
    return {
      allowed: false,
      reason: `Container '${container.name}' capacity reached (${rules.maxCapacity} items max).`,
    };
  }

  // 2. Allowed Types Check
  if (rules.allowedTypes && !rules.allowedTypes.includes(entity.type)) {
    return {
      allowed: false,
      reason: `Container '${container.name}' does not accept entity type '${entity.type}'.`,
    };
  }

  // 3. Unique Types Check
  if (rules.uniqueTypesOnly) {
    const hasTypeAlready = currentEntitiesInContainer.some(
      (e) => e.type === entity.type
    );
    if (hasTypeAlready) {
      return {
        allowed: false,
        reason: `Container '${container.name}' already contains an entity of type '${entity.type}'.`,
      };
    }
  }

  // 4. Custom Validator Check
  if (rules.customValidator) {
    const passesCustom = rules.customValidator(
      container,
      entity,
      currentEntitiesInContainer
    );
    if (!passesCustom) {
      return {
        allowed: false,
        reason: `Entity '${entity.name}' failed custom container rules for '${container.name}'.`,
      };
    }
  }

  return { allowed: true };
}
</file>

<file path="store/middleware/actionLog.test.ts">
import { describe, it, expect, beforeEach } from 'vitest';
import { createStore } from 'zustand/vanilla';
import { devtools } from 'zustand/middleware';
import { actionLog, clearActionLog, getActionLog } from './actionLog';

interface CounterState {
  count: number;
  incrementLabelled: () => void;
  incrementUnlabelled: () => void;
}

function makeStore() {
  return createStore<CounterState>()(
    devtools(
      actionLog((set) => ({
        count: 0,
        incrementLabelled: () =>
          set((state) => ({ count: state.count + 1 }), false, 'INCREMENT'),
        incrementUnlabelled: () => set((state) => ({ count: state.count + 1 })),
      })),
      { enabled: false }
    )
  );
}

describe('actionLog middleware', () => {
  beforeEach(() => {
    clearActionLog();
  });

  it('records a labelled set call', () => {
    const store = makeStore();
    store.getState().incrementLabelled();

    const log = getActionLog();
    expect(log).toHaveLength(1);
    expect(log[0].action).toBe('INCREMENT');
    expect(store.getState().count).toBe(1);
  });

  it('does not record an unlabelled set call', () => {
    const store = makeStore();
    store.getState().incrementUnlabelled();

    expect(getActionLog()).toHaveLength(0);
    expect(store.getState().count).toBe(1);
  });

  it('caps the log at 200 entries, dropping the oldest first', () => {
    const store = makeStore();
    for (let i = 0; i < 205; i++) {
      store.getState().incrementLabelled();
    }

    const log = getActionLog();
    expect(log).toHaveLength(200);
    expect(store.getState().count).toBe(205);
  });

  it('clearActionLog empties the log', () => {
    const store = makeStore();
    store.getState().incrementLabelled();
    clearActionLog();

    expect(getActionLog()).toHaveLength(0);
  });
});
</file>

<file path="store/middleware/actionLog.ts">
/**
 * FILE: actionLog.ts
 *
 * PURPOSE:
 * Zustand middleware for recording world actions.
 *
 * RESPONSIBILITY:
 * - Observes store mutations.
 * - Creates an action history/debug log.
 *
 * USED FOR:
 * - Debugging.
 * - Future replay systems.
 */

import type { StateCreator, StoreMutatorIdentifier } from 'zustand/vanilla';

export interface ActionLogEntry {
  /** The action's label, e.g. "MOVE_ENTITY". */
  action: string;
  timestamp: number;
}

const MAX_ENTRIES = 200;

let entries: ActionLogEntry[] = [];

/** Read-only snapshot of recorded world actions, oldest first. */
export function getActionLog(): ActionLogEntry[] {
  return [...entries];
}

/** Clears the recorded history. Mainly useful between tests. */
export function clearActionLog(): void {
  entries = [];
}

type ActionLogMiddleware = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  initializer: StateCreator<T, Mps, Mcs>,
) => StateCreator<T, Mps, Mcs>;

/**
 * Records every labelled `set` call into an in-memory action log — the
 * "Action Queue" docs/systems.md describes for debugging, replay, and
 * future AI compatibility.
 *
 * A reducer opts a state change into the log by passing a label as the
 * third argument to `set`, the same convention the `devtools` middleware
 * uses for naming actions in Redux DevTools:
 *
 *   set(nextState, false, 'MOVE_ENTITY')
 *
 * Intended to sit directly beneath `devtools` in the middleware stack
 * (`devtools(actionLog(initializer))`), so it observes the same labelled
 * `set` calls devtools does. Calls without a string label are forwarded
 * unlogged.
 */
export const actionLog: ActionLogMiddleware = (initializer) => (set, get, api) => {
  const loggedSet = ((partial: unknown, replace?: unknown, label?: unknown) => {
    if (typeof label === 'string') {
      entries.push({ action: label, timestamp: Date.now() });
      if (entries.length > MAX_ENTRIES) entries.shift();
    }
    return (set as (...args: unknown[]) => void)(partial, replace, label);
  }) as typeof set;

  return initializer(loggedSet, get, api);
};
</file>

<file path="store/gazeStore.ts">
/**
 * FILE: gazeStore.ts
 *
 * PURPOSE:
 * Stores mascot gaze/attention state.
 *
 * RESPONSIBILITY:
 * - Tracks what the mascot is looking at.
 * - Provides gaze information to UI components.
 */

import { create } from 'zustand'
import type { GazeTarget } from '../systems/gaze'

interface GazeState {
  /** Whatever the mascot should be looking at right now, or null to fall back to the mouse. */
  target: GazeTarget | null
  setTarget: (target: GazeTarget | null) => void
  clearTarget: () => void
}

export const useGazeStore = create<GazeState>((set) => ({
  target: null,
  setTarget: (target) => set({ target }),
  clearTarget: () => set({ target: null }),
}))
</file>

<file path="store/worldStore.test.ts">
import { describe, it, expect, beforeEach } from 'vitest';
import { worldStore } from './worldStore';
import { clearActionLog, getActionLog } from './middleware/actionLog';

function seed() {
  worldStore.setState({
    entities: {
      potato: { id: 'potato', name: 'Potato', type: 'ingredient' },
      onion: { id: 'onion', name: 'Onion', type: 'ingredient' },
      knife: { id: 'knife', name: 'Knife', type: 'tool' },
      chef: { id: 'chef', name: 'Chef', type: 'mascot' },
    },
    containers: {
      kitchen: {
        id: 'kitchen',
        name: 'Kitchen',
        type: 'storage',
        entityIds: ['potato', 'onion', 'knife'],
      },
      pan: {
        id: 'pan',
        name: 'Pan',
        type: 'pan',
        entityIds: [],
        rules: { maxCapacity: 1 },
      },
      board: {
        id: 'board',
        name: 'Cutting Board',
        type: 'board',
        entityIds: [],
        rules: { allowedTypes: ['ingredient'] },
      },
      recipe: {
        id: 'recipe',
        name: 'Recipe',
        type: 'plate',
        entityIds: [],
        rules: { allowedTypes: ['ingredient'], uniqueTypesOnly: true },
      },
    },
  });
}

describe('worldStore container rule enforcement', () => {
  beforeEach(() => {
    seed();
    clearActionLog();
  });

  it('allows a move that satisfies the target container rules', () => {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato', targetContainerId: 'pan' },
    });

    const state = worldStore.getState();
    expect(state.containers.pan.entityIds).toEqual(['potato']);
    expect(state.containers.kitchen.entityIds).not.toContain('potato');
  });

  it('blocks a move once the target container is at capacity', () => {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato', targetContainerId: 'pan' },
    });
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'onion', targetContainerId: 'pan' },
    });

    const state = worldStore.getState();
    expect(state.containers.pan.entityIds).toEqual(['potato']);
    expect(state.containers.kitchen.entityIds).toContain('onion');
  });

  it('blocks a move that violates allowedTypes', () => {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'knife', targetContainerId: 'board' },
    });

    // knife is a tool; board only allows ingredients
    const state = worldStore.getState();
    expect(state.containers.board.entityIds).toEqual([]);
    expect(state.containers.kitchen.entityIds).toContain('knife');
  });

  it('blocks a move that would duplicate a type in a uniqueTypesOnly container', () => {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato', targetContainerId: 'recipe' },
    });
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'onion', targetContainerId: 'recipe' },
    });

    // both are 'ingredient' type; uniqueTypesOnly blocks the second
    const state = worldStore.getState();
    expect(state.containers.recipe.entityIds).toEqual(['potato']);
    expect(state.containers.kitchen.entityIds).toContain('onion');
  });

  it('never re-validates a same-container reorder', () => {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato', targetContainerId: 'kitchen', positionIndex: 0 },
    });

    // would fail uniqueTypesOnly-style self-comparison if the entity
    // weren't excluded from its own container's current entities
    const state = worldStore.getState();
    expect(state.containers.kitchen.entityIds[0]).toBe('potato');
  });

  it('is a no-op when the entity does not exist', () => {
    const before = worldStore.getState().containers.pan.entityIds;
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'ghost', targetContainerId: 'pan' },
    });
    expect(worldStore.getState().containers.pan.entityIds).toEqual(before);
  });

  it('enforces the same rules on ADD_ENTITY', () => {
    worldStore.getState().dispatch({
      type: 'ADD_ENTITY',
      payload: {
        entity: { id: 'spoon', name: 'Spoon', type: 'tool' },
        containerId: 'board',
      },
    });

    const state = worldStore.getState();
    expect(state.containers.board.entityIds).toEqual([]);
    expect(state.entities.spoon).toBeUndefined();
  });

  it('logs a labelled entry into the action log for each dispatch', () => {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato', targetContainerId: 'pan' },
    });

    const log = getActionLog();
    expect(log).toHaveLength(1);
    expect(log[0].action).toBe('MOVE_ENTITY');
    expect(typeof log[0].timestamp).toBe('number');
  });
});
</file>

<file path="store/worldStore.ts">
/**
 * FILE: worldStore.ts
 *
 * PURPOSE:
 * Central Zustand store for the game world.
 *
 * RESPONSIBILITY:
 * - Owns world state.
 * - Stores entities, containers and relationships.
 * - Executes state transitions.
 *
 * ARCHITECTURE:
 * Systems request changes.
 * Store applies valid state mutations.
 */

import { createStore } from 'zustand/vanilla';
import { devtools } from 'zustand/middleware';
import type { Container, Entity, WorldAction, WorldState } from '../types/world';
import { validateContainerRules } from '../engine/containerRules';
import { actionLog } from './middleware/actionLog';

function entitiesIn(container: Container, entities: Record<string, Entity>): Entity[] {
  return container.entityIds
    .map((id) => entities[id])
    .filter((entity): entity is Entity => Boolean(entity));
}

export const worldStore = createStore<WorldState>()(
  devtools(
    actionLog((set) => ({
      entities: {},
      containers: {},
      dispatch: (action: WorldAction) => {
        switch (action.type) {
          case 'MOVE_ENTITY': {
            const { entityId, targetContainerId, positionIndex } = action.payload;
            set(
              (state: WorldState) => {
                const entity = state.entities[entityId];
                const targetContainer = state.containers[targetContainerId];
                if (!entity || !targetContainer) return state;

                const sourceContainer = Object.values(state.containers).find((c) =>
                  c.entityIds.includes(entityId)
                );

                // Reordering within the same container never re-checks
                // rules — capacity/uniqueness only guard entities newly
                // arriving from elsewhere.
                if (sourceContainer?.id !== targetContainerId) {
                  const currentEntities = entitiesIn(targetContainer, state.entities).filter(
                    (e) => e.id !== entityId
                  );
                  const result = validateContainerRules(targetContainer, entity, currentEntities);
                  if (!result.allowed) return state;
                }

                const newContainers = { ...state.containers };

                if (sourceContainer) {
                  newContainers[sourceContainer.id] = {
                    ...sourceContainer,
                    entityIds: sourceContainer.entityIds.filter((id) => id !== entityId),
                  };
                }

                const targetIds = [...(newContainers[targetContainerId]?.entityIds || [])];
                if (typeof positionIndex === 'number') {
                  targetIds.splice(positionIndex, 0, entityId);
                } else {
                  targetIds.push(entityId);
                }

                newContainers[targetContainerId] = {
                  ...targetContainer,
                  entityIds: targetIds,
                };

                return { ...state, containers: newContainers };
              },
              false,
              'MOVE_ENTITY'
            );
            break;
          }

          case 'ADD_ENTITY': {
            const { entity, containerId } = action.payload;
            set(
              (state: WorldState) => {
                const targetContainer = state.containers[containerId];
                if (!targetContainer) return state;

                const currentEntities = entitiesIn(targetContainer, state.entities);
                const result = validateContainerRules(
                  targetContainer,
                  entity as Entity,
                  currentEntities
                );
                if (!result.allowed) return state;

                return {
                  ...state,
                  entities: {
                    ...state.entities,
                    [entity.id]: entity as Entity,
                  },
                  containers: {
                    ...state.containers,
                    [containerId]: {
                      ...targetContainer,
                      entityIds: [...targetContainer.entityIds, entity.id],
                    },
                  },
                };
              },
              false,
              'ADD_ENTITY'
            );
            break;
          }

          case 'REMOVE_ENTITY': {
            const { entityId } = action.payload;
            set(
              (state: WorldState) => {
                const newEntities = { ...state.entities };
                delete newEntities[entityId];

                const newContainers = { ...state.containers };
                for (const cId in newContainers) {
                  newContainers[cId] = {
                    ...newContainers[cId],
                    entityIds: newContainers[cId].entityIds.filter((id) => id !== entityId),
                  };
                }

                return {
                  ...state,
                  entities: newEntities,
                  containers: newContainers,
                };
              },
              false,
              'REMOVE_ENTITY'
            );
            break;
          }

          case 'UPDATE_ENTITY_STATE': {
            const { entityId, changes } = action.payload;
            set(
              (state: WorldState) => {
                const targetEntity = state.entities[entityId];
                if (!targetEntity) return state;

                return {
                  ...state,
                  entities: {
                    ...state.entities,
                    [entityId]: {
                      ...targetEntity,
                      state: {
                        ...targetEntity.state,
                        ...changes,
                      },
                    },
                  },
                };
              },
              false,
              'UPDATE_ENTITY_STATE'
            );
            break;
          }
        }
      },
    })),
    { name: 'tortilla-world' }
  )
);
</file>

<file path="systems/dropRules.test.ts">
import { describe, it, expect } from 'vitest'
import { parseDrag, evaluateDrop } from './dropRules'

const kitchenConsumes = { kitchen: { consumesOnDrag: true }, fire: { consumesOnDrag: true } }

describe('parseDrag', () => {
  it('parses a dragged item and a list drop target', () => {
    expect(parseDrag('despensa::potato', 'kitchen')).toEqual({
      source: { listId: 'despensa', itemId: 'potato' },
      target: { listId: 'kitchen', itemId: null },
    })
  })

  it('parses a dragged item and an item drop target', () => {
    expect(parseDrag('despensa::egg', 'despensa::potato')).toEqual({
      source: { listId: 'despensa', itemId: 'egg' },
      target: { listId: 'despensa', itemId: 'potato' },
    })
  })

  it('returns null for malformed ids', () => {
    expect(parseDrag('potato', 'kitchen')).toBeNull()
    expect(parseDrag('despensa::potato', '')).toBeNull()
  })
})

describe('evaluateDrop', () => {
  it('approves same-list reorder without duplicate checks', () => {
    const drag = parseDrag('despensa::egg', 'despensa::potato')!
    const drop = evaluateDrop(drag, { despensa: ['potato', 'egg'], kitchen: [] })
    expect(drop).toMatchObject({
      kind: 'same-list-reorder',
      insertAt: 0,
    })
  })

  it('approves a move from a consuming source', () => {
    const drag = parseDrag('kitchen::potato', 'fire')!
    const drop = evaluateDrop(
      drag,
      { kitchen: ['potato', 'egg'], fire: [] },
      kitchenConsumes,
    )
    expect(drop?.kind).toBe('cross-list-move')
  })

  it('approves a copy from a non-consuming source', () => {
    const drag = parseDrag('despensa::potato', 'kitchen')!
    const drop = evaluateDrop(
      drag,
      { despensa: ['potato', 'onion'], kitchen: [] },
      { despensa: {}, kitchen: { consumesOnDrag: true } },
    )
    expect(drop?.kind).toBe('cross-list-copy')
  })

  it('never lets a consuming target override a non-consuming source', () => {
    const drag = parseDrag('despensa::potato', 'fire')!
    const drop = evaluateDrop(
      drag,
      { despensa: ['potato', 'onion'], fire: [] },
      { despensa: {}, fire: { consumesOnDrag: true } },
    )
    expect(drop?.kind).toBe('cross-list-copy')
  })

  it('blocks copying when the target already holds the same ingredient group', () => {
    const drag = parseDrag('despensa::potato#despensa', 'kitchen')!
    const drop = evaluateDrop(
      drag,
      { despensa: ['potato#despensa'], kitchen: ['potato#kitchen'] },
      {},
      { groupOf: (id) => id.split('#')[0] },
    )
    expect(drop).toBeNull()
  })

  it('blocks copying an item already in the target list (default identity grouping)', () => {
    const drag = parseDrag('despensa::potato', 'kitchen')!
    const drop = evaluateDrop(
      drag,
      { despensa: ['potato', 'onion'], kitchen: ['potato', 'egg'] },
    )
    expect(drop).toBeNull()
  })

  it('blocks copying even when dropping on blank space in a list that already has the item', () => {
    const drag = parseDrag('despensa::potato', 'kitchen')!
    const drop = evaluateDrop(
      drag,
      { despensa: ['potato'], kitchen: ['potato'] },
    )
    expect(drop).toBeNull()
  })

  it('returns null when the item is not in the source list', () => {
    const drag = parseDrag('despensa::garlic', 'kitchen')!
    const drop = evaluateDrop(drag, { despensa: ['potato'], kitchen: [] })
    expect(drop).toBeNull()
  })

  it('returns null when source list does not exist', () => {
    const drag = parseDrag('ghost::potato', 'kitchen')!
    const drop = evaluateDrop(drag, { despensa: ['potato'], kitchen: [] })
    expect(drop).toBeNull()
  })
})
</file>

<file path="systems/dropRules.ts">
/**
 * FILE: dropRules.ts
 *
 * PURPOSE:
 * Defines rules for drag and drop interactions.
 *
 * RESPONSIBILITY:
 * - Determines whether an entity can enter a container.
 * - Validates possible world transitions.
 *
 * SHOULD NOT:
 * - Modify state.
 */

export interface DragEndpoint {
  listId: string
  itemId: string
}

export interface DropTarget {
  listId: string
  itemId: string | null
}

export interface ParsedDrag {
  source: DragEndpoint
  target: DropTarget
}

export type DropKind = 'same-list-reorder' | 'cross-list-move' | 'cross-list-copy'

export interface ApprovedDrop {
  kind: DropKind
  source: DragEndpoint
  target: DropTarget
  insertAt: number
}

export interface ListFlags {
  consumesOnDrag?: boolean
}

export interface DropRuleOptions {
  /**
   * Groups items for the "already in target" duplicate check — e.g. two
   * different physical instances of "potato" should still be treated as
   * the same ingredient for blocking purposes.
   */
  groupOf?: (itemId: string) => string
}

export function parseDrag(activeId: string, overId: string): ParsedDrag | null {
  const sourceParts = activeId.split('::')
  const targetParts = overId.split('::')

  const sourceListId = sourceParts[0]
  const sourceItemId = sourceParts[1]
  const targetListId = targetParts[0]

  if (!sourceListId || !sourceItemId || !targetListId) return null

  return {
    source: { listId: sourceListId, itemId: sourceItemId },
    target: { listId: targetListId, itemId: targetParts[1] ?? null },
  }
}

/**
 * Read-only gate: can this drag-and-drop happen?
 *
 * Same-list reorder: always allowed.
 * Cross-list: blocked when the target already holds an instance of the
 * same group. Otherwise allowed as a move (consuming source) or copy
 * (non-consuming source) — the kind is decided here so interaction.ts
 * only has to apply it.
 */
export function evaluateDrop(
  drag: ParsedDrag,
  lists: Record<string, string[]>,
  listFlags: Record<string, ListFlags> = {},
  options: DropRuleOptions = {},
): ApprovedDrop | null {
  const sourceIds = lists[drag.source.listId]
  const targetIds = lists[drag.target.listId]
  if (!sourceIds || !targetIds || !sourceIds.includes(drag.source.itemId)) return null

  const targetIndex = drag.target.itemId ? targetIds.indexOf(drag.target.itemId) : -1
  const insertAt = targetIndex === -1 ? targetIds.length : targetIndex

  if (drag.source.listId === drag.target.listId) {
    return {
      kind: 'same-list-reorder',
      source: drag.source,
      target: drag.target,
      insertAt,
    }
  }

  const groupOf = options.groupOf ?? ((itemId: string) => itemId)
  const sourceGroup = groupOf(drag.source.itemId)
  if (targetIds.some((itemId) => groupOf(itemId) === sourceGroup)) return null

  const sourceConsumes = listFlags[drag.source.listId]?.consumesOnDrag ?? false

  return {
    kind: sourceConsumes ? 'cross-list-move' : 'cross-list-copy',
    source: drag.source,
    target: drag.target,
    insertAt,
  }
}
</file>

<file path="systems/gaze.test.ts">
import { describe, it, expect, beforeEach } from 'vitest';
import { worldStore } from '../store/worldStore';
import { updateMascotGaze, getMascotGazeTarget } from './gaze';

describe('Gaze System', () => {
  beforeEach(() => {
    worldStore.setState({
      entities: {
        chef: {
          id: 'chef',
          name: 'Chef',
          type: 'mascot',
          state: {
            gazingAt: undefined,
          },
        },
      },
      containers: {
        bench: {
          id: 'bench',
          name: 'Workbench',
          type: 'board',
          rules: { maxCapacity: 1 },
          entityIds: [],
        },
        pan: {
          id: 'pan',
          name: 'Pan',
          type: 'pan',
          rules: { maxCapacity: Infinity },
          entityIds: [],
        },
        plate: {
          id: 'plate',
          name: 'Plate',
          type: 'storage',
          rules: { maxCapacity: Infinity },
          entityIds: [],
        },
      },
    });
  });

  it('updates mascot gaze target correctly', () => {
    updateMascotGaze('chef', 'pan');
    expect(getMascotGazeTarget('chef')).toBe('pan');
  });

  it('is idempotent when gazing at the same target', () => {
    updateMascotGaze('chef', 'pan');
    const firstState = worldStore.getState();

    updateMascotGaze('chef', 'pan');
    const secondState = worldStore.getState();

    expect(firstState).toBe(secondState);
  });
});
</file>

<file path="systems/gaze.ts">
/**
 * FILE: gaze.ts
 *
 * PURPOSE:
 * Calculates gaze behavior.
 *
 * RESPONSIBILITY:
 * - Determines what objects attract attention.
 * - Updates gaze-related state.
 */

import { worldStore } from '../store/worldStore';

export type GazeTarget = string | null;

interface GazeState {
  gazingAt?: GazeTarget;
}

/**
 * Updates what target a mascot is looking at.
 */
export function updateMascotGaze(
  mascotId: string,
  targetId: GazeTarget
): void {
  const currentTarget = getMascotGazeTarget(mascotId);

  if (currentTarget === targetId) {
    return;
  }

  worldStore.getState().dispatch({
    type: 'UPDATE_ENTITY_STATE',
    payload: {
      entityId: mascotId,
      changes: {
        gazingAt: targetId,
      },
    },
  });
}

/**
 * Returns the current gaze target.
 */
export function getMascotGazeTarget(
  mascotId: string
): GazeTarget {
  const entity = worldStore.getState().entities[mascotId];

  if (!entity) {
    return null;
  }

  const state = entity.state as GazeState | undefined;

  return state?.gazingAt ?? null;
}
</file>

<file path="systems/interaction.test.ts">
import { describe, it, expect } from 'vitest'
import { evaluateDrop, parseDrag } from './dropRules'
import { resolveListReorder, applyListReorder } from './interaction'
import type { Entity } from '../types/Entity'

function makeEntity(id: string, ingredientId: string, listId: string | null): Entity {
  return {
    id,
    type: 'ingredient',
    ingredientId,
    position: { x: 0, y: 0 },
    size: { width: 1, height: 1 },
    state: 'idle',
    listId,
  }
}

function resolveDrag(
  activeId: string,
  overId: string,
  lists: Record<string, string[]>,
  listFlags: Record<string, { consumesOnDrag?: boolean }> = {},
  options: { groupOf?: (itemId: string) => string; createCopyId?: (itemId: string) => string } = {},
) {
  const drag = parseDrag(activeId, overId)
  if (!drag) return null
  const drop = evaluateDrop(drag, lists, listFlags, { groupOf: options.groupOf })
  if (!drop) return null
  return resolveListReorder(drop, lists, { createCopyId: options.createCopyId })
}

const kitchenConsumes = { kitchen: { consumesOnDrag: true }, fire: { consumesOnDrag: true } }

// ── consumesOnDrag: move vs copy semantics ─────────────────────────────────

it('dragging from a consuming list removes the item from the source', () => {
  const result = resolveDrag(
    'kitchen::potato',
    'fire',
    { kitchen: ['potato', 'egg'], fire: [] },
    kitchenConsumes,
  )
  expect(result?.lists).toEqual({
    kitchen: ['egg'],
    fire: ['potato'],
  })
  expect(result?.changedListId).toBe('fire')
  expect(result?.removedFromListId).toBe('kitchen')
  expect(result?.copy).toBeNull()
})

it('dragging from a non-consuming list keeps the item in the source', () => {
  const result = resolveDrag(
    'despensa::potato',
    'kitchen',
    { despensa: ['potato', 'onion'], kitchen: [] },
    { despensa: {}, kitchen: { consumesOnDrag: true } },
    { createCopyId: () => 'potato-copy' },
  )
  expect(result?.lists).toEqual({
    despensa: ['potato', 'onion'],
    kitchen: ['potato-copy'],
  })
  expect(result?.removedFromListId).toBeNull()
  expect(result?.copy).toEqual({ sourceItemId: 'potato', newItemId: 'potato-copy' })
})

it('a consuming target never overrides a non-consuming source, even dragging onto fire', () => {
  const result = resolveDrag(
    'despensa::potato',
    'fire',
    { despensa: ['potato', 'onion'], fire: [] },
    { despensa: {}, fire: { consumesOnDrag: true } },
    { createCopyId: () => 'potato-copy' },
  )
  expect(result?.lists).toEqual({
    despensa: ['potato', 'onion'],
    fire: ['potato-copy'],
  })
  expect(result?.changedListId).toBe('fire')
  expect(result?.removedFromListId).toBeNull()
})

it('BUG regression: a copy is a distinct instance, so moving it later never touches the original', () => {
  const copyStep = resolveDrag(
    'despensa::salt#despensa',
    'kitchen',
    { despensa: ['salt#despensa'], kitchen: [], fire: [] },
    { despensa: {}, kitchen: { consumesOnDrag: true }, fire: { consumesOnDrag: true } },
    { createCopyId: () => 'salt#kitchen' },
  )
  expect(copyStep?.copy).toEqual({ sourceItemId: 'salt#despensa', newItemId: 'salt#kitchen' })

  const moveStep = resolveDrag(
    'kitchen::salt#kitchen',
    'fire',
    { despensa: ['salt#despensa'], kitchen: ['salt#kitchen'], fire: [] },
    { despensa: {}, kitchen: { consumesOnDrag: true }, fire: { consumesOnDrag: true } },
  )
  expect(moveStep?.lists).toEqual({
    despensa: ['salt#despensa'],
    kitchen: [],
    fire: ['salt#kitchen'],
  })
  expect(moveStep?.removedFromListId).toBe('kitchen')
})

describe('resolveListReorder', () => {
  it('copies an item to another list, source stays untouched, target gets a new id', () => {
    const drag = parseDrag('despensa::potato', 'kitchen::egg')!
    const drop = evaluateDrop(drag, { despensa: ['potato', 'onion'], kitchen: ['egg'] })!
    const result = resolveListReorder(drop, { despensa: ['potato', 'onion'], kitchen: ['egg'] }, {
      createCopyId: () => 'potato-copy',
    })
    expect(result?.lists).toEqual({
      despensa: ['potato', 'onion'],
      kitchen: ['potato-copy', 'egg'],
    })
    expect(result?.changedListId).toBe('kitchen')
    expect(result?.copy).toEqual({ sourceItemId: 'potato', newItemId: 'potato-copy' })
  })

  it('copies into an empty list', () => {
    const drag = parseDrag('despensa::potato', 'kitchen')!
    const drop = evaluateDrop(drag, { despensa: ['potato', 'onion'], kitchen: [] })!
    const result = resolveListReorder(drop, { despensa: ['potato', 'onion'], kitchen: [] }, {
      createCopyId: () => 'potato-copy',
    })
    expect(result?.lists).toEqual({
      despensa: ['potato', 'onion'],
      kitchen: ['potato-copy'],
    })
  })

  it('default createCopyId still produces an id different from the source', () => {
    const drag = parseDrag('despensa::potato', 'kitchen')!
    const drop = evaluateDrop(drag, { despensa: ['potato'], kitchen: [] })!
    const result = resolveListReorder(drop, { despensa: ['potato'], kitchen: [] })
    expect(result?.copy?.newItemId).not.toBe('potato')
    expect(result?.lists.kitchen[0]).not.toBe('potato')
  })

  it('reorders within the same list', () => {
    const drag = parseDrag('despensa::egg', 'despensa::potato')!
    const drop = evaluateDrop(drag, { despensa: ['potato', 'egg'], kitchen: [] })!
    const result = resolveListReorder(drop, { despensa: ['potato', 'egg'], kitchen: [] })
    expect(result?.lists.despensa).toEqual(['egg', 'potato'])
    expect(result?.lists.kitchen).toEqual([])
    expect(result?.changedListId).toBe('despensa')
    expect(result?.copy).toBeNull()
  })
})

describe('applyListReorder', () => {
  it('moves an existing entity by updating its listId and position', () => {
    const calls: Array<[string, Partial<Omit<Entity, 'id'>>]> = []
    const updateEntity = (id: string, changes: Partial<Omit<Entity, 'id'>>) => calls.push([id, changes])
    const addEntity = () => { throw new Error('should not create a new entity for a plain move') }
    const getEntity = (id: string) => makeEntity(id, id, 'kitchen')

    applyListReorder(updateEntity, addEntity, getEntity, {
      lists: { fire: ['potato'] },
      changedListId: 'fire',
      removedFromListId: 'kitchen',
      copy: null,
    })

    expect(calls).toEqual([['potato', { position: { x: 0, y: 0 }, listId: 'fire' }]])
  })

  it('creates a brand-new entity for a copy, leaving the original alone', () => {
    const updateCalls: Array<[string, unknown]> = []
    const addCalls: Entity[] = []
    const updateEntity = (id: string, changes: Partial<Omit<Entity, 'id'>>) => updateCalls.push([id, changes])
    const addEntity = (entity: Entity) => addCalls.push(entity)
    const original = makeEntity('salt#despensa', 'salt', 'despensa')
    const getEntity = (id: string) => (id === 'salt#despensa' ? original : undefined)

    applyListReorder(updateEntity, addEntity, getEntity, {
      lists: { kitchen: ['salt#kitchen'] },
      changedListId: 'kitchen',
      removedFromListId: null,
      copy: { sourceItemId: 'salt#despensa', newItemId: 'salt#kitchen' },
    })

    expect(updateCalls).toEqual([])
    expect(addCalls).toEqual([{
      id: 'salt#kitchen',
      type: 'ingredient',
      ingredientId: 'salt',
      position: { x: 0, y: 0 },
      size: { width: 1, height: 1 },
      state: 'idle',
      listId: 'kitchen',
    }])
  })

  it('writes position.y as insertion order', () => {
    const calls: Array<[string, Partial<Omit<Entity, 'id'>>]> = []
    const updateEntity = (id: string, changes: Partial<Omit<Entity, 'id'>>) => calls.push([id, changes])
    const addEntity = () => { throw new Error('unexpected addEntity') }
    const getEntity = (id: string) => makeEntity(id, id, 'kitchen')

    applyListReorder(updateEntity, addEntity, getEntity, {
      lists: { kitchen: ['egg', 'potato', 'onion'] },
      changedListId: 'kitchen',
      removedFromListId: null,
      copy: null,
    })

    expect(calls[0][1].position).toEqual({ x: 0, y: 0 })
    expect(calls[1][1].position).toEqual({ x: 0, y: 1 })
    expect(calls[2][1].position).toEqual({ x: 0, y: 2 })
  })
})
</file>

<file path="systems/interaction.ts">
/**
 * FILE: interaction.ts
 *
 * PURPOSE:
 * Handles player interaction logic.
 *
 * RESPONSIBILITY:
 * - Converts user actions into world actions.
 * - Coordinates interaction flow.
 */

import type { Entity } from '../types/Entity'
import type { ApprovedDrop } from './dropRules'

export interface ReorderOptions {
  /**
   * Produces the id for a brand-new instance created by a copy (dragging
   * out of a non-consuming source). MUST be unique per call in real usage,
   * or the copy will collide with another item.
   */
  createCopyId?: (itemId: string) => string
}

export interface ReorderResult {
  lists: Record<string, string[]>
  changedListId: string
  removedFromListId: string | null
  /**
   * Set only when this resolution created a brand-new instance (i.e. a
   * copy out of a non-consuming source). `sourceItemId` is the original,
   * untouched instance; `newItemId` is the id inserted into the target
   * list. The two are intentionally different entities from this point
   * on — moving one must never affect the other.
   */
  copy: { sourceItemId: string; newItemId: string } | null
}

function defaultCreateCopyId(itemId: string): string {
  return `${itemId}--copy--${Math.random().toString(36).slice(2, 8)}`
}

/**
 * Pure: given an already-approved drop, compute the next list ordering.
 * Validation lives in dropRules.ts — this function only rearranges ids.
 */
export function resolveListReorder(
  drop: ApprovedDrop,
  lists: Record<string, string[]>,
  options: ReorderOptions = {},
): ReorderResult | null {
  const sourceIds = lists[drop.source.listId]
  const targetIds = lists[drop.target.listId]
  if (!sourceIds || !targetIds) return null

  const createCopyId = options.createCopyId ?? defaultCreateCopyId
  const next = { ...lists }

  if (drop.kind === 'same-list-reorder') {
    const reordered = sourceIds.filter((itemId) => itemId !== drop.source.itemId)
    reordered.splice(drop.insertAt, 0, drop.source.itemId)
    next[drop.source.listId] = reordered
    return { lists: next, changedListId: drop.source.listId, removedFromListId: null, copy: null }
  }

  if (drop.kind === 'cross-list-move') {
    next[drop.source.listId] = sourceIds.filter((itemId) => itemId !== drop.source.itemId)
    const reorderedTarget = [...targetIds]
    reorderedTarget.splice(drop.insertAt, 0, drop.source.itemId)
    next[drop.target.listId] = reorderedTarget
    return { lists: next, changedListId: drop.target.listId, removedFromListId: drop.source.listId, copy: null }
  }

  const newItemId = createCopyId(drop.source.itemId)
  const reorderedTarget = [...targetIds]
  reorderedTarget.splice(drop.insertAt, 0, newItemId)
  next[drop.target.listId] = reorderedTarget
  return {
    lists: next,
    changedListId: drop.target.listId,
    removedFromListId: null,
    copy: { sourceItemId: drop.source.itemId, newItemId },
  }
}

/**
 * Commit step: writes the changed list's ordering into the store.
 *
 * Each entity belongs to exactly one list at a time (`entity.listId`), so
 * there's nothing to clean up on the source side — reassigning listId (or,
 * for a copy, creating a new entity) is the entire move. The source list's
 * contents are derived live from entity.listId elsewhere (queries.ts), so
 * they update automatically once this runs.
 */
export function applyListReorder(
  updateEntity: (entityId: string, changes: Partial<Omit<Entity, 'id'>>) => void,
  addEntity: (entity: Entity) => void,
  getEntity: (entityId: string) => Entity | undefined,
  result: ReorderResult,
) {
  const itemIds = result.lists[result.changedListId]

  itemIds.forEach((itemId, index) => {
    const position = { x: 0, y: index }

    if (result.copy && itemId === result.copy.newItemId) {
      const original = getEntity(result.copy.sourceItemId)
      if (!original) return
      addEntity({
        id: itemId,
        type: original.type,
        ingredientId: original.ingredientId,
        position,
        size: original.size,
        state: 'idle',
        listId: result.changedListId,
      })
      return
    }

    updateEntity(itemId, { position, listId: result.changedListId })
  })
}
</file>

<file path="systems/movement.ts">
/**
 * FILE: movement.ts
 *
 * PURPOSE:
 * Handles entity movement calculations.
 *
 * RESPONSIBILITY:
 * - Calculates position changes.
 * - Provides movement behavior.
 */

import { worldStore } from '../store/worldStore';

/**
 * Requests that an entity be moved to another container.
 * The reducer determines the source container automatically.
 */
export function moveEntity(
  entityId: string,
  targetContainerId: string,
  positionIndex?: number
): void {
  worldStore.getState().dispatch({
    type: 'MOVE_ENTITY',
    payload: {
      entityId,
      targetContainerId,
      positionIndex,
    },
  });
}
</file>

<file path="systems/queries.test.ts">
import { describe, it, expect } from 'vitest'
import { getIngredientsForList, getListMembership } from './queries'
import { ingredients as catalog } from '../data/catalog/ingredients'
import { recipe as concebolla } from '../data/catalog/recipes/concebolla'
import type { Entity } from '../types/Entity'

function makeEntity(id: string, ingredientId: string, listId: string | null, y = 0): Entity {
  return {
    id,
    type: 'ingredient',
    ingredientId,
    position: { x: 0, y },
    size: { width: 1, height: 1 },
    state: 'idle',
    listId,
  }
}

function allInDespensa(): Record<string, Entity> {
  return Object.fromEntries(
    catalog.map((ingredient, index) => [
      ingredient.id,
      makeEntity(ingredient.id, ingredient.id, 'despensa', index),
    ]),
  )
}

describe('getListMembership', () => {
  it('returns entity ids grouped by listId, sorted by position.y', () => {
    const entities: Record<string, Entity> = {
      onion: makeEntity('onion', 'onion', 'despensa', 1),
      potato: makeEntity('potato', 'potato', 'despensa', 0),
      oil: makeEntity('oil', 'oil', 'fire', 0),
    }
    expect(getListMembership(entities, ['despensa', 'fire', 'kitchen'])).toEqual({
      despensa: ['potato', 'onion'],
      fire: ['oil'],
      kitchen: [],
    })
  })

  it('ignores non-ingredient entities and entities with no listId', () => {
    const entities: Record<string, Entity> = {
      potato: makeEntity('potato', 'potato', 'despensa', 0),
      tortilla: {
        id: 'tortilla',
        type: 'character',
        ingredientId: 'tortilla',
        position: { x: 0, y: 0 },
        size: { width: 1, height: 1 },
        state: 'idle',
        listId: null,
      },
    }
    expect(getListMembership(entities, ['despensa'])).toEqual({ despensa: ['potato'] })
  })
})

describe('getIngredientsForList', () => {

  // ── real entity membership ─────────────────────────────────────────────────

  it('returns entities belonging to the list, sorted by position.y', () => {
    const entities: Record<string, Entity> = {
      onion: makeEntity('onion', 'onion', 'despensa', 1),
      potato: makeEntity('potato', 'potato', 'despensa', 0),
    }
    const result = getIngredientsForList(entities, { id: 'despensa', title: 'Despensa' })
    expect(result.map((i) => i.id)).toEqual(['potato', 'onion'])
  })

  it('ignores entities that do not belong to this list', () => {
    const entities: Record<string, Entity> = {
      potato: makeEntity('potato', 'potato', 'despensa', 0),
      onion: makeEntity('onion', 'onion', 'kitchen', 0),
    }
    const result = getIngredientsForList(entities, { id: 'despensa', title: 'Despensa' })
    expect(result.map((i) => i.id)).toEqual(['potato'])
  })

  it('two instances of the same ingredient in different lists are independent', () => {
    // Regression guard: an ingredient existing in two lists must be two
    // separate entities (separate ids), each pinned to exactly one list —
    // never one entity shared across both.
    const entities: Record<string, Entity> = {
      'potato#despensa': makeEntity('potato#despensa', 'potato', 'despensa', 0),
      'potato#kitchen': makeEntity('potato#kitchen', 'potato', 'kitchen', 0),
    }
    const inDespensa = getIngredientsForList(entities, { id: 'despensa', title: 'Despensa' })
    const inKitchen = getIngredientsForList(entities, { id: 'kitchen', title: 'Kitchen' })

    expect(inDespensa.map((i) => i.id)).toEqual(['potato#despensa'])
    expect(inKitchen.map((i) => i.id)).toEqual(['potato#kitchen'])
  })

  it('an entity belongs to exactly one list — it never appears in a second one', () => {
    const entities: Record<string, Entity> = {
      potato: makeEntity('potato', 'potato', 'kitchen', 0),
    }
    const inDespensa = getIngredientsForList(entities, { id: 'despensa', title: 'Despensa' })
    const inKitchen = getIngredientsForList(entities, { id: 'kitchen', title: 'Kitchen' })

    expect(inDespensa.map((i) => i.id)).not.toContain('potato')
    expect(inKitchen.map((i) => i.id)).toContain('potato')
  })

  it('ignores non-ingredient entities in the same list', () => {
    const entities: Record<string, Entity> = {
      potato: makeEntity('potato', 'potato', 'despensa', 0),
      tortilla: {
        id: 'tortilla',
        type: 'character',
        ingredientId: 'tortilla',
        position: { x: 0, y: 0 },
        size: { width: 1, height: 1 },
        state: 'idle',
        listId: 'despensa',
      },
    }
    const result = getIngredientsForList(entities, { id: 'despensa', title: 'Despensa' })
    expect(result.map((i) => i.id)).toEqual(['potato'])
  })

  it('returns empty when no entities belong to this list and no seed is configured', () => {
    const result = getIngredientsForList(allInDespensa(), { id: 'trash', title: 'Basura' })
    expect(result).toEqual([])
  })

  // ── seedFromCatalog ────────────────────────────────────────────────────────

  it('falls back to full catalog when seedFromCatalog is true and no entities match', () => {
    const result = getIngredientsForList({}, { id: 'despensa', title: 'Despensa', seedFromCatalog: true })
    expect(result.map((i) => i.id)).toEqual(catalog.map((i) => i.id))
  })

  it('despensa shows all ingredients on startup', () => {
    const result = getIngredientsForList(allInDespensa(), {
      id: 'despensa',
      title: 'Despensa',
      seedFromCatalog: true,
    })
    expect(result).toHaveLength(catalog.length)
    expect(result.map((i) => i.id)).toEqual(catalog.map((i) => i.id))
  })

  it('real entity membership takes priority over seedFromCatalog', () => {
    const entities: Record<string, Entity> = {
      potato: makeEntity('potato', 'potato', 'despensa', 0),
    }
    const result = getIngredientsForList(entities, {
      id: 'despensa',
      title: 'Despensa',
      seedFromCatalog: true,
    })
    expect(result.map((i) => i.id)).toEqual(['potato'])
  })

  // ── seedIngredients ────────────────────────────────────────────────────────

  it('kitchen shows concebolla recipe ingredients on startup', () => {
    const kitchenIngredients = concebolla.ingredients
      .filter((i): i is NonNullable<typeof i> => i !== undefined)
      .map((i) => i.id)

    const result = getIngredientsForList(allInDespensa(), {
      id: 'kitchen',
      title: 'Kitchen',
      seedIngredients: kitchenIngredients,
    })
    expect(result.map((i) => i.id)).toEqual(kitchenIngredients)
  })

  it('fire shows only oil on startup', () => {
    const result = getIngredientsForList(allInDespensa(), {
      id: 'fire',
      title: 'Fire',
      seedIngredients: ['oil'],
    })
    expect(result.map((i) => i.id)).toEqual(['oil'])
  })

  it('trash is empty on startup', () => {
    const result = getIngredientsForList(allInDespensa(), { id: 'trash', title: 'Basura' })
    expect(result).toEqual([])
  })

  it('seedIngredients skips ids not found in the catalog', () => {
    const result = getIngredientsForList({}, {
      id: 'kitchen',
      title: 'Kitchen',
      seedIngredients: ['potato', 'unicorn-meat', 'egg'],
    })
    expect(result.map((i) => i.id)).toEqual(['potato', 'egg'])
  })

  it('real entity membership takes priority over seedIngredients', () => {
    const entities: Record<string, Entity> = {
      oil: makeEntity('oil', 'oil', 'fire', 0),
    }
    const result = getIngredientsForList(entities, {
      id: 'fire',
      title: 'Fire',
      seedIngredients: ['oil', 'garlic'],
    })
    expect(result.map((i) => i.id)).toEqual(['oil'])
  })

  // ── view model correctness ─────────────────────────────────────────────────

  it('enriches entities with name and icon from the catalog, keyed by ingredientId', () => {
    const entities = { 'potato#despensa': makeEntity('potato#despensa', 'potato', 'despensa', 0) }
    const result = getIngredientsForList(entities, { id: 'despensa', title: 'Despensa' })
    expect(result[0]).toMatchObject({ id: 'potato#despensa', name: 'Potatoes', icon: '🥔' })
  })

  it('falls back to ingredientId as name and 🥔 icon for unknown ingredient ids', () => {
    const entities: Record<string, Entity> = {
      'mystery#despensa': {
        id: 'mystery#despensa',
        type: 'ingredient',
        ingredientId: 'mystery',
        position: { x: 0, y: 0 },
        size: { width: 1, height: 1 },
        state: 'idle',
        listId: 'despensa',
      },
    }
    const result = getIngredientsForList(entities, { id: 'despensa', title: 'Despensa' })
    expect(result[0]).toMatchObject({ id: 'mystery#despensa', name: 'mystery', icon: '🥔' })
  })

})
</file>

<file path="systems/queries.ts">
/**
 * FILE: queries.ts
 *
 * PURPOSE:
 * Read-only world queries.
 *
 * RESPONSIBILITY:
 * - Finds entities.
 * - Filters world data.
 * - Provides reusable selectors.
 *
 * SHOULD NOT:
 * - Modify state.
 */

import type { Entity } from '../types/Entity'
import type { Ingredient } from '../types/Ingredient'
import type { List } from '../types/IngredientList'
import { ingredients as ingredientCatalog } from '../data/catalog/ingredients'

export function toIngredientView(entity: Entity): Ingredient {
  const catalogEntry = ingredientCatalog.find((ingredient) => ingredient.id === entity.ingredientId)
  return {
    id: entity.id,
    name: catalogEntry?.name ?? entity.ingredientId,
    icon: catalogEntry?.icon ?? '🥔',
  }
}

/**
 * Read-only snapshot of which entity ids live in each list, sorted by
 * position.y. Used by drop rules and interaction — never falls back to
 * seed data; only reflects what's actually in the store.
 */
export function getListMembership(
  entities: Record<string, Entity>,
  listIds: string[],
): Record<string, string[]> {
  const membership = Object.fromEntries(listIds.map((listId) => [listId, [] as string[]]))

  for (const entity of Object.values(entities)) {
    if (entity.type !== 'ingredient' || !entity.listId || !(entity.listId in membership)) continue
    membership[entity.listId].push(entity.id)
  }

  for (const listId of listIds) {
    membership[listId].sort((leftId, rightId) => {
      const leftY = entities[leftId]?.position.y ?? 0
      const rightY = entities[rightId]?.position.y ?? 0
      return leftY - rightY
    })
  }

  return membership
}

export function getIngredientsForList(
  entities: Record<string, Entity>,
  list: List,
): Ingredient[] {
  const matching = Object.values(entities)
    .filter((entity) => entity.type === 'ingredient' && entity.listId === list.id)
    .sort((left, right) => left.position.y - right.position.y)
    .map(toIngredientView)

  if (matching.length > 0) return matching

  if (list.seedFromCatalog) return [...ingredientCatalog]

  if (list.seedIngredients) {
    return list.seedIngredients
      .map((id) => ingredientCatalog.find((i) => i.id === id))
      .filter((i): i is Ingredient => i !== undefined)
  }

  return []
}
</file>

<file path="types/actions.ts">
/**
 * FILE: actions.ts
 *
 * PURPOSE:
 * Defines world actions/events.
 *
 * RESPONSIBILITY:
 * - Creates the communication contract between systems and store.
 */

import type { EntityType } from './world';

export type WorldAction =
  | {
      type: 'MOVE_ENTITY';
      payload: {
        entityId: string;
        targetContainerId: string;
        positionIndex?: number;
      };
    }
  | {
      type: 'ADD_ENTITY';
      payload: {
        entity: {
          id: string;
          name: string;
          type: EntityType;
          state?: Record<string, unknown>;
        };
        containerId: string;
      };
    }
  | {
      type: 'REMOVE_ENTITY';
      payload: {
        entityId: string;
      };
    }
  | {
      type: 'UPDATE_ENTITY_STATE';
      payload: {
        entityId: string;
        changes: Record<string, unknown>;
      };
    };
</file>

<file path="types/Entity.ts">
/**
 * FILE: Entity.ts
 *
 * PURPOSE:
 * Defines the base entity contract.
 *
 * RESPONSIBILITY:
 * - Shared structure for all world objects.
 */

export type EntityType = 'character' | 'ingredient' | 'kitchen-object'

export interface Position {
  x: number
  y: number
}

export interface Size {
  width: number
  height: number
}

export interface Entity {
  id: string            // unique per physical instance — NOT the same as ingredientId
  type: EntityType
  ingredientId: string  // catalog id used to look up name/icon; for non-ingredient
                         // entities (mascot, kitchen-objects) this equals `id`
  position: Position
  size: Size
  state: string          // behavior state: 'idle' | 'walking' | 'carrying' etc
  listId: string | null  // the single list this entity currently lives in (null = unplaced)
}

export interface EntityRelationship {
  sourceId: string
  targetId: string
  type: string
}
</file>

<file path="types/Ingredient.ts">
/**
 * FILE: Ingredient.ts
 *
 * PURPOSE:
 * Defines ingredient data structures.
 *
 * RESPONSIBILITY:
 * - Represents ingredient definitions.
 */

export interface Ingredient {
  id: string
  name: string
  icon: string
}
</file>

<file path="types/IngredientList.ts">
/**
 * FILE: IngredientList.ts
 *
 * PURPOSE:
 * Defines container/list data structures.
 *
 * RESPONSIBILITY:
 * - Represents collections of entities.
 */

import type { Ingredient } from './Ingredient'

export interface IngredientList {
  id: string
  name: string
  ingredients: Ingredient[]
}

export interface List {
  id: string
  title: string
  seedFromCatalog?: boolean
  seedIngredients?: string[]
  consumesOnDrag?: boolean   // true = item is removed from this list when dragged out
}
</file>

<file path="types/RecipeIngredient.ts">
/**
 * FILE: RecipeIngredient.ts
 *
 * PURPOSE:
 * Defines ingredient usage inside recipes.
 *
 * RESPONSIBILITY:
 * - Stores ingredient quantity and unit information.
 */

export interface RecipeIngredient {
  id: string
  ingredientId: string
  amount: number
  unit: string
}
</file>

<file path="types/world.ts">
/**
 * FILE: world.ts
 *
 * PURPOSE:
 * Defines complete world state structures.
 *
 * RESPONSIBILITY:
 * - Describes the game world's data model.
 */

import type { WorldAction } from './actions';

export type EntityType = 'ingredient' | 'tool' | 'mascot';
export type ContainerType = 'storage' | 'pan' | 'board' | 'plate' | 'trash';

export interface Entity {
  id: string;
  name: string;
  type: EntityType;
  state?: Record<string, unknown>;
}

export interface ContainerRules {
  maxCapacity?: number;
  allowedTypes?: EntityType[];
  uniqueTypesOnly?: boolean;
  customValidator?: ( 
    container: Container,
    entity: Entity,
    currentEntities: Entity[]
  ) => boolean;
}

export interface Container {
  id: string;
  name: string;
  type: ContainerType;
  entityIds: string[];
  rules?: ContainerRules;
}

export interface WorldState {
  entities: Record<string, Entity>;
  containers: Record<string, Container>;
  dispatch: (action: WorldAction) => void;
}

export type { WorldAction };
</file>

<file path="App.tsx">
/**
 * FILE: App.tsx
 *
 * PURPOSE:
 * Main React application component.
 *
 * RESPONSIBILITY:
 * - Creates the application layout.
 * - Connects major UI areas together.
 * - Acts as the entry point for the game world.
 *
 * SHOULD NOT:
 * - Contain game rules.
 * - Modify world state directly.
 */

import { Scene } from './components/Scene/Scene';

function App() {
  return (
    <Scene />
  );
}

export default App;
</file>

<file path="index.css">
:root {
  --text: #6b6375;
  --text-h: #08060d;
  --bg: #fff;
  --border: #e5e4e7;
  --code-bg: #f4f3ec;
  --accent: #aa3bff;
  --accent-bg: rgba(170, 59, 255, 0.1);
  --accent-border: rgba(170, 59, 255, 0.5);
  --social-bg: rgba(244, 243, 236, 0.5);
  --shadow:
    rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0 4px 6px -2px;

  --sans: system-ui, 'Segoe UI', Roboto, sans-serif;
  --heading: system-ui, 'Segoe UI', Roboto, sans-serif;
  --mono: ui-monospace, Consolas, monospace;

  font: 18px/145% var(--sans);
  letter-spacing: 0.18px;
  color-scheme: light dark;
  color: var(--text);
  background: var(--bg);
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  @media (max-width: 1024px) {
    font-size: 16px;
  }
}

@media (prefers-color-scheme: dark) {
  :root {
    --text: #9ca3af;
    --text-h: #f3f4f6;
    --bg: #16171d;
    --border: #2e303a;
    --code-bg: #1f2028;
    --accent: #c084fc;
    --accent-bg: rgba(192, 132, 252, 0.15);
    --accent-border: rgba(192, 132, 252, 0.5);
    --social-bg: rgba(47, 48, 58, 0.5);
    --shadow:
      rgba(0, 0, 0, 0.4) 0 10px 15px -3px, rgba(0, 0, 0, 0.25) 0 4px 6px -2px;
  }

  #social .button-icon {
    filter: invert(1) brightness(2);
  }
}

#root {
  width: 1126px;
  max-width: 100%;
  margin: 0 auto;
  text-align: center;
  border-inline: 1px solid var(--border);
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

body {
  margin: 0;
}

h1,
h2 {
  font-family: var(--heading);
  font-weight: 500;
  color: var(--text-h);
}

h1 {
  font-size: 56px;
  letter-spacing: -1.68px;
  margin: 32px 0;
  @media (max-width: 1024px) {
    font-size: 36px;
    margin: 20px 0;
  }
}
h2 {
  font-size: 24px;
  line-height: 118%;
  letter-spacing: -0.24px;
  margin: 0 0 8px;
  @media (max-width: 1024px) {
    font-size: 20px;
  }
}
p {
  margin: 0;
}

code,
.counter {
  font-family: var(--mono);
  display: inline-flex;
  border-radius: 4px;
  color: var(--text-h);
}

code {
  font-size: 15px;
  line-height: 135%;
  padding: 4px 8px;
  background: var(--code-bg);
}
</file>

<file path="main.tsx">
/**
 * FILE: main.tsx
 *
 * PURPOSE:
 * React application bootstrap file.
 *
 * RESPONSIBILITY:
 * - Creates the React root.
 * - Loads global styles.
 * - Starts the application.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
</file>

</files>
</file>

<file path=".gitignore">
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
*.patch
</file>

<file path="README.md">
# Tortilla World 🌮

An interactive cooking world built with React, TypeScript, and Zustand.

Tortilla World is not just a recipe application. It is a small simulation engine where ingredients, tools, and objects exist as entities inside a living kitchen environment.

Objects can be moved, combined, transformed, and controlled through world rules.

The long-term goal is a kitchen where users and AI agents can interact naturally with the environment.

---

# Vision

Traditional applications are based around screens and forms.

Tortilla World explores a different approach:

> Build a world first. Let applications emerge from the world.

The kitchen is modeled as a collection of entities and containers.

Examples:

```text
Kitchen

 ├── Potato
 ├── Onion
 ├── Egg
 ├── Knife
 └── Pan
```

Actions modify relationships inside the world:

```text
Move potato

Kitchen
   |
   v

Pan
```

The object does not disappear and reappear.

Ownership changes.

---

# Features

## Current

✅ Entity-based world model
✅ Container architecture
✅ Zustand world state
✅ Drag and drop interactions
✅ Ingredient system
✅ Tool system foundation
✅ Animated world objects

---

## Planned

🚧 Cooking simulation
🚧 Recipe engine
🚧 Entity transformations
🚧 Character interactions
🚧 AI kitchen assistant
🚧 Autonomous actions
🚧 Living kitchen environment

See the full roadmap:

[`docs/roadmap.md`](docs/roadmap.md)

---

# Architecture

The project follows a simulation-oriented architecture.

The main concepts are:

```text
Entities
    |
    v
Containers
    |
    v
Systems
    |
    v
Actions
    |
    v
World State
```

---

## Entities

Everything in the world is an entity.

Examples:

* ingredients
* tools
* containers
* characters
* machines

Entities have identity.

Moving an entity changes ownership, not the entity itself.

---

## Containers

Containers are world objects that own entities.

Examples:

* Kitchen
* Pantry
* Recipe
* Pan
* Plate

Containers define rules:

* what they accept
* ordering
* uniqueness
* transfer behaviour

---

## Systems

Systems contain world behaviour.

Examples:

### Movement System

Handles:

* moving objects
* validating transfers
* changing ownership

### Interaction System

Handles:

* user input
* drag and drop
* actions

### Cooking System

Future:

* combining ingredients
* changing states
* producing results

---

More details:

* [`docs/entities.md`](docs/entities.md)
* [`docs/architecture.md`](docs/architecture.md)
* [`docs/systems.md`](docs/systems.md)
* [`docs/decisions.md`](docs/decisions.md)

---

# Technology Stack

## Frontend

* React
* TypeScript
* Vite

## State Management

* Zustand

## Interaction

* dnd-kit

## Animation

* Framer Motion

---

# Project Structure

```text
src/

├── components/
│   UI and world rendering

├── entities/
│   Entity definitions

├── systems/
│   World behaviour

├── store/
│   Zustand world state

├── data/
│   Static world data

└── types/
    TypeScript models
```

---

# Development

## Requirements

* Node.js
* npm

---

## Install

```bash
npm install
```

---

## Run Development Server

```bash
npm run dev
```

---

## Build

```bash
npm run build
```

---

# Design Principles

## World First

The simulation model is independent from the UI.

---

## Systems Control Behaviour

Components display the world.

Systems change the world.

---

## Actions Describe Intent

Actions represent what should happen.

Example:

```ts
{
 type:"MOVE_ENTITY",
 entity:"potato",
 target:"pan"
}
```

The world decides if it is possible.

---

## AI Compatible

Future AI agents will not directly manipulate state.

They will create actions:

```text
AI
 |
 v
Action
 |
 v
World Validation
 |
 v
World Update
```

---

# Why Tortilla?

A tortilla de patatas is a simple dish with interesting complexity:

* few ingredients
* many preparation steps
* tools matter
* timing matters
* small changes affect the result

It is a perfect example for exploring interactive worlds.

---

# Contributing

This project is currently under active development.

The most valuable contributions are:

* architecture discussions
* gameplay ideas
* UI improvements
* simulation ideas
* technical experiments

---

# License

Add license information here.

````

---

## Documentation Map

```text
README.md
    |
    |-- What is Tortilla World?
    |-- How to run it?
    |-- High-level architecture


docs/

├── entities.md
│     What exists?

├── decisions.md
│     Why is it designed this way?

├── architecture.md
│     How does everything connect?

├── systems.md
│     How does behaviour work?

└── roadmap.md
      Where is it going?
````
</file>

<file path="docs/architecture.md">
# Architecture

## Overview

Tortilla World is a simulation-driven React application.

The application is not designed as a collection of UI components with local state.
Instead, it models a small interactive world where entities exist, move, interact, and change state through controlled systems.

The architecture is based on four main concepts:

```text
              User / AI
                  |
                  v
          Interaction System
                  |
                  v
          Action Validation
                  |
                  v
             World Store
                  |
                  v
       Entities and Containers
```

---

# Core Concepts

## Entities

Entities are all objects that exist in the world.

Examples:

* ingredients
* tools
* containers
* characters
* machines

An entity has:

* identity
* type
* properties
* optional state

Example:

```ts
{
  id: "potato",
  type: "ingredient"
}
```

Entities do not control their own behaviour.

They are controlled by systems.

---

# Workstations

Workstations represent *where actions can be performed* in the kitchen simulation:

* **Pantry (`pantry`)**: Store ingredients (`despensa`).
* **Washing Station (`washing_station`)**: Clean ingredients (`sink`).
* **Cutting Station (`cutting_station`)**: Preparation (`board`, `knife`, `peeler`).
* **Preparation Station (`preparation_station`)**: Mix & combine (`bowl`, `whisk`, `fork`).
* **Cooking Station (`cooking_station`)**: Apply heat (`pan`, `spatula`).
* **Serving Station (`serving_station`)**: Plate and serve (`plate`).

---

# Containers

Containers are entities that own other entities.

Examples:

* Kitchen
* Pantry
* Recipe
* Pan
* Plate

A container defines:

* what it can contain
* ordering
* uniqueness rules
* transfer behaviour

Example:

```text
Kitchen
 ├── Potato
 ├── Onion
 ├── Knife
 └── Pan
```

A container is not a simple array.

It is a world object with rules.

---

# Ownership Model

Every movable entity has an owner.

Example:

Initial:

```text
Kitchen
 ├── Potato
 ├── Egg


Pan
 └── Oil
```

After moving potato:

```text
Kitchen
 └── Egg


Pan
 ├── Oil
 └── Potato
```

The potato entity remains the same.

Only the relationship changes:

```text
Before:

Kitchen owns Potato


After:

Pan owns Potato
```

---

# State Management

The world state is stored centrally.

Current technology:

* React
* Zustand

The store represents the complete world.

Example:

```ts
interface WorldState {

 entities:
   Record<string, Entity>

 containers:
   Record<string, Container>

 actions:
   WorldActions

}
```

---

# Data Flow

## User interaction

Example:

User drags potato into pan.

Flow:

```text
Drag Event
    |
    v
D&D Layer
    |
    v
Interaction System
    |
    v
Move Action
    |
    v
Container Validation
    |
    v
World Store Update
    |
    v
React Render
```

---

# Drag and Drop Architecture

Drag and drop is only an input method.

It does not contain business rules.

The DnD system provides:

```ts
{
 entityId:"potato",
 targetContainer:"pan"
}
```

The Interaction System decides:

* is the move allowed?
* what transfer rule applies?
* what state changes happen?

---

# Systems

Systems contain world behaviour.

Examples:

## Movement System

Responsible for:

* moving entities
* validating ownership
* applying transfer rules

---

## Interaction System

Responsible for:

* converting user input into actions
* handling clicks
* handling drag operations

---

## Cooking System

Future system.

Responsible for:

* combining ingredients
* changing states
* producing results

Example:

```text
Potato + Egg + Onion

       |
       v

Tortilla
```

---

## AI System

Future system.

Responsible for:

* generating actions
* planning
* interacting with the world

AI does not modify state directly.

Example:

```ts
{
 type:"MOVE_ENTITY",
 entity:"egg",
 destination:"recipe"
}
```

---

# Actions

All world changes happen through actions.

Example:

```ts
{
 type:"MOVE_ENTITY",

 entityId:"potato",

 source:"kitchen",

 target:"pan"
}
```

Actions provide:

* traceability
* debugging
* replay
* AI compatibility

---

# Containers and Transfer Rules

Moving an entity is not a simple remove/add operation.

The process is:

```text
Move Request

      |
      v

Check source container

      |
      v

Check destination container

      |
      v

Apply transfer rules

      |
      v

Update ownership

      |
      v

Update world state
```

---

# Rendering Architecture

React components display world state.

They do not own world logic.

Example:

```text
World Store

    |
    v

Scene Component

    |
    +---- Container Component
    |
    +---- Entity Component
```

---

# Component Responsibilities

## Entity Component

Responsible for:

* rendering an entity
* animations
* visual state

Does not:

* move itself
* validate actions

---

## Container Component

Responsible for:

* rendering contents
* layout
* accepting interactions

Does not:

* decide business rules

---

# Future Architecture

The architecture is designed to support:

## More containers

Examples:

* fridge
* cupboard
* oven
* table
* customer tray

---

## More entities

Examples:

* characters
* animals
* machines
* recipes

---

## More systems

Examples:

* physics
* time
* cooking
* economy
* AI planning

---

# Design Principles

## 1. Data before UI

The world model exists independently of React.

---

## 2. Rules before actions

Every action must be validated.

---

## 3. Entities keep identity

Movement changes ownership, not objects.

---

## 4. Containers own behaviour

Rules belong to locations, not items.

---

## 5. Systems change the world

Components only represent the world.

---

# Final Architecture Diagram

```text

                 User
                  |
                  |
                  v

          React Interaction Layer
                  |
                  |
                  v

          Interaction System
                  |
                  |
                  v

             Action Queue
                  |
                  |
                  v

          World Simulation
                  |
        +---------+---------+
        |                   |
        v                   v

    Containers          Entities

        |
        |
        v

     Zustand Store

        |
        |
        v

      React UI

```

Tortilla World is therefore structured as a small simulation engine with a React interface, rather than a traditional CRUD application.
</file>

<file path="docs/redux-devtools-commands.md">
# Redux DevTools & Console Test Commands

This document lists test actions and script sequences for Tortilla mascot automation that can be dispatched via **Redux DevTools** or directly in the **Browser Console**.

---

## 1. Redux DevTools Actions (JSON)

Copy and paste these individual action objects into the **Dispatcher** tab of Redux DevTools:

### Step 1: Look at Despensa (Pantry)
```json
{
  "type": "MASCOT_MOVE",
  "payload": {
    "mascotId": "chef",
    "targetContainerId": "despensa"
  }
}
```

### Step 2: Grab Potato from Despensa
```json
{
  "type": "MASCOT_GRAB",
  "payload": {
    "mascotId": "chef",
    "entityId": "potato",
    "sourceContainerId": "despensa"
  }
}
```

### Step 3: Move gaze to Tabla (Workspace Table / Cutting Board)
```json
{
  "type": "MASCOT_MOVE",
  "payload": {
    "mascotId": "chef",
    "targetContainerId": "board"
  }
}
```

### Step 4: Drop Potato in Tabla
```json
{
  "type": "MASCOT_DROP",
  "payload": {
    "mascotId": "chef",
    "targetContainerId": "board"
  }
}
```

### Step 5: Flip Tortilla
```json
{
  "type": "MASCOT_FLIP",
  "payload": {
    "mascotId": "chef"
  }
}
```

---

## 2. Follow Recipe Automation Script Example (Con Cebolla)

This sequence demonstrates how "Follow the recipe" brings all recipe ingredients (potato, egg, oil, onion, salt, pepper) from the catalog pantry to the table (`board`) one by one:

```js
// Browser Console: Follow Recipe Script Example
(async () => {
  const store = window.__ZUSTAND_STORE__ || (await import('/src/store/worldStore.ts')).worldStore;
  const dispatch = store.getState().dispatch;
  const wait = (ms) => new Promise(res => setTimeout(res, ms));

  const recipeIngredients = ['potato', 'egg', 'oil', 'onion', 'salt', 'pepper'];

  for (const ing of recipeIngredients) {
    console.log(`Bringing ${ing} to table...`);
    dispatch({ type: 'MASCOT_MOVE', payload: { mascotId: 'chef', targetContainerId: 'despensa' } });
    await wait(400);

    dispatch({ type: 'MASCOT_GRAB', payload: { mascotId: 'chef', entityId: ing, sourceContainerId: 'despensa' } });
    await wait(400);

    dispatch({ type: 'MASCOT_MOVE', payload: { mascotId: 'chef', targetContainerId: 'board' } });
    await wait(400);

    dispatch({ type: 'MASCOT_DROP', payload: { mascotId: 'chef', targetContainerId: 'board' } });
    await wait(400);
  }

  console.log('Recipe complete! Flip Tortilla!');
  dispatch({ type: 'MASCOT_FLIP', payload: { mascotId: 'chef' } });
})();
```

---

## 3. Helper Function Example

Alternatively, call the system function directly in console:

```js
const { runFollowRecipeScript } = await import('/src/systems/mascotActions.ts');
await runFollowRecipeScript('concebolla', 'chef', 'board', 500);
```
</file>

<file path="src/components/Ingredients/Ingredient.tsx">
/**
 * FILE: Ingredient.tsx
 *
 * PURPOSE:
 * Visual representation of one ingredient.
 *
 * RESPONSIBILITY:
 * - Displays ingredient information.
 * - Handles ingredient presentation only.
 *
 * SHOULD NOT:
 * - Manage inventory.
 * - Apply game rules.
 * - Modify world state.
 */

import type { Ingredient as IngredientModel } from '../../types/Ingredient'

interface IngredientProps {
  ingredient: IngredientModel
}

export function Ingredient({ ingredient }: IngredientProps) {
  return (
    <>
      <span aria-hidden="true">{ingredient.icon}</span>
      <span>{ingredient.name}</span>
    </>
  )
}
</file>

<file path="src/components/Ingredients/Ingredients.scss">
/**
 * FILE: src/components/Ingredients/Ingredients.scss
 *
 * PURPOSE:
 * SCSS styles for ingredient list panels, item lists, and recipe ingredients.
 */

@use 'sass:color';
@use '../../styles/variables' as *;
@use '../../styles/mixins' as *;

.ingredient-list-panel {
  @include ceramic-card($warm-surface, $warm-border);
  min-width: 240px;
  padding: 16px;
}

.ingredient-list-header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;

  h3 {
    color: $dark-brown;
    font-size: 1rem;
    font-weight: 700;
    margin: 0;
  }

  span {
    color: $wood-muted;
    font-size: 0.82rem;
    font-weight: 600;
  }
}

.ingredient-list,
.recipe-ingredient-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.ingredient-list-item,
.recipe-ingredient-item {
  align-items: center;
  background: #ffffff;
  border: 1px solid $warm-border;
  border-radius: $radius-md;
  box-shadow: 0 2px 6px rgba(44, 26, 20, 0.04);
  display: flex;
  gap: 0.5rem;
  padding: 8px 12px;
  user-select: none;
  transition: all 0.2s ease;

  &:hover {
    border-color: color.mix($tortilla-yellow, $warm-border, 50%);
  }

  &:active {
    cursor: grabbing;
  }
}

.ingredient-list-item-body {
  align-items: center;
  cursor: grab;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  gap: 0.5rem;
  min-width: 0;

  &:active {
    cursor: grabbing;
  }
}

.ingredient-remove {
  align-items: center;
  background: transparent;
  border: none;
  border-radius: $radius-sm;
  color: $wood-muted;
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  font-size: 1.15rem;
  height: 1.75rem;
  justify-content: center;
  line-height: 1;
  padding: 0;
  width: 1.75rem;
  transition: all 0.15s ease;

  &:hover {
    background: $warm-beige;
    color: $terracotta;
  }

  &:focus-visible {
    outline: 2px solid $terracotta;
    outline-offset: 2px;
  }
}

.recipe-ingredient-amount {
  margin-left: auto;
  font-size: 0.8rem;
  color: $wood-muted;
  font-weight: 600;
}

.scene-panel {
  display: flex;
  gap: 16px;
  margin-top: 16px;
  flex-wrap: wrap;
}

@media (max-width: 30rem) {
  .recipe-ingredient-amount {
    margin-left: 0;
    width: 100%;
  }
}
</file>

<file path="src/components/Mascot/TortillaSvg.scss">
/**
 * FILE: src/components/Mascot/TortillaSvg.scss
 *
 * PURPOSE:
 * Styles and animations for TortillaSvg mascot using SCSS variables and mixins.
 */

@use 'sass:color';
@use '../../styles/variables' as *;
@use '../../styles/mixins' as *;

/* === Root SVG Styles & State Animations === */
.tortilla-svg {
  transform-origin: center;
  overflow: visible;

  &.is-idle {
    animation: tortillaIdle 2.5s infinite ease-in-out;
  }

  &.is-flipping {
    animation: tortillaFlip 0.8s ease-in-out forwards;
  }
}

@keyframes tortillaIdle {
  0%, 100% {
    transform: translateY(0) scaleY(1);
  }
  50% {
    transform: translateY(-3px) scaleY(1.02);
  }
}

@keyframes tortillaFlip {
  0% {
    transform: translateY(0) rotateX(0deg) scale(1);
  }
  50% {
    transform: translateY(-60px) rotateX(180deg) scale(1.15);
  }
  100% {
    transform: translateY(0) rotateX(360deg) scale(1);
  }
}

/* === Physical Movement & Wrapper Animations === */
.mascot-card {
  @include ceramic-card($warm-surface, $warm-border);
  padding: 12px 16px;
}

.mascot-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  transform: translate3d(var(--offset-x, 0px), var(--offset-y, 0px), 0);
  transition: transform 0.65s cubic-bezier(0.34, 1.25, 0.64, 1), filter 0.3s ease;
  will-change: transform, filter;
  z-index: 1;

  &.is-floating {
    z-index: 1000;
    filter: drop-shadow(0 14px 22px rgba(44, 26, 20, 0.25));
  }

  &.is-holding {
    animation: mascotGrabPulse 0.4s ease-in-out;
  }
}

@keyframes mascotGrabPulse {
  0% { transform: translate3d(var(--offset-x, 0px), var(--offset-y, 0px), 0) scale(1); }
  50% { transform: translate3d(var(--offset-x, 0px), var(--offset-y, 0px), 0) scale(1.1); }
  100% { transform: translate3d(var(--offset-x, 0px), var(--offset-y, 0px), 0) scale(1); }
}

/* === Held Ingredient Badge CSS Animations === */
.mascot-held-badge {
  position: absolute;
  bottom: -8px;
  right: -12px;
  background: #ffffff;
  border: 2px solid $tortilla-yellow;
  border-radius: 20px;
  padding: 3px 8px;
  box-shadow: 0 4px 14px rgba(44, 26, 20, 0.18);
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: bold;
  color: $dark-brown;
  white-space: nowrap;
  pointer-events: none;
  z-index: 1001;
  animation: heldBadgeEnter 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards, heldBadgeFloat 2.5s ease-in-out infinite 0.35s;
}

@keyframes heldBadgeEnter {
  0% {
    opacity: 0;
    transform: translateY(15px) scale(0);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes heldBadgeFloat {
  0%, 100% {
    transform: translateY(0) rotate(-2deg);
  }
  50% {
    transform: translateY(-4px) rotate(3deg);
  }
}

/* === Internal Element Animations === */
.tortilla-blink {
  animation: tortillaBlink 4s infinite;
  transform-box: fill-box;
  transform-origin: center;
}

@keyframes tortillaBlink {
  0%, 92%, 100% {
    transform: scaleY(0);
    opacity: 0;
  }
  94%, 98% {
    transform: scaleY(1);
    opacity: 1;
  }
}
</file>

<file path="src/components/Scene/RecipePlayer.scss">
/**
 * FILE: RecipePlayer.scss
 *
 * PURPOSE:
 * Stylesheet for RecipePlayer component.
 * Uses warm Spanish kitchen ceramic palette with sleek interactive controls.
 */

@use 'sass:color';
@use '../../styles/variables' as *;
@use '../../styles/mixins' as *;

.recipe-player-container {
  @include ceramic-card($warm-surface, $warm-border);
  padding: 16px 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: $shadow-ceramic;
  position: relative;
  overflow: hidden;

  // Header Row
  .player-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;

    .recipe-select-group {
      display: flex;
      align-items: center;
      gap: 12px;

      .recipe-label {
        font-weight: 800;
        font-size: 0.9rem;
        color: $dark-brown;
      }

      .recipe-buttons {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;

        .recipe-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #ffffff;
          border: 2px solid $warm-border;
          border-radius: $radius-sm;
          padding: 6px 14px;
          font-size: 0.88rem;
          font-weight: 700;
          color: $dark-brown;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 2px 4px rgba(44, 26, 20, 0.04);
          user-select: none;

          .recipe-btn-icon {
            font-size: 1.1rem;
            line-height: 1;
            transition: transform 0.2s ease;
          }

          &:hover {
            border-color: $tortilla-yellow;
            background: $tortilla-yellow-light;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(232, 168, 56, 0.2);

            .recipe-btn-icon {
              transform: scale(1.2) rotate(-5deg);
            }
          }

          &:active {
            transform: translateY(0);
          }

          &.active {
            background: linear-gradient(135deg, $tortilla-yellow, $tortilla-yellow-hover);
            color: #ffffff;
            border-color: $tortilla-yellow-hover;
            box-shadow: 0 4px 10px rgba(232, 168, 56, 0.35);

            .recipe-btn-icon {
              transform: scale(1.15);
            }
          }
        }
      }
    }

    .player-status-badge {
      display: flex;
      align-items: center;
      gap: 10px;

      .step-count {
        font-size: 0.88rem;
        color: $wood-muted;
        background: $warm-beige;
        padding: 4px 10px;
        border-radius: $radius-sm;
        border: 1px solid $warm-border;

        strong {
          color: $dark-brown;
          font-weight: 800;
        }
      }

      .speed-badge {
        font-size: 0.82rem;
        font-weight: 700;
        padding: 4px 10px;
        border-radius: $radius-sm;
        background: $olive-green-light;
        color: $olive-green;
        border: 1px solid $olive-green-border;
      }
    }
  }

  // Recipe Requirements Section (Left Sidebar Panel)
  .recipe-requirements-section {
    width: 260px;
    min-width: 230px;
    flex-shrink: 0;
    background: #ffffff;
    border: 1px solid $warm-border;
    border-radius: $radius-md;
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    box-shadow: $shadow-ceramic;
    box-sizing: border-box;

    @media (max-width: 860px) {
      width: 100%;
    }

    .requirements-header {
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding-bottom: 8px;
      border-bottom: 2px dashed color.mix($dark-brown, white, 15%);

      .requirements-title {
        font-size: 0.85rem;
        font-weight: 800;
        color: $dark-brown;
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }

      .requirements-subtitle {
        font-size: 0.75rem;
        font-weight: 600;
        color: $wood-muted;
      }
    }

    .recipe-requirements {
      display: flex;
      flex-direction: column;
      gap: 10px;
      list-style: none;
      margin: 0;
      padding: 0;
      width: 100%;

      .requirement-view {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: $warm-surface;
        border: 1px solid $warm-border;
        border-radius: $radius-md;
        padding: 8px 12px;
        font-size: 0.88rem;
        font-weight: 700;
        color: $dark-brown;
        box-shadow: 0 1px 3px rgba(44, 26, 20, 0.04);
        width: 100%;
        box-sizing: border-box;
        transition: all 0.2s ease;

        &:hover {
          border-color: $tortilla-yellow;
          box-shadow: 0 3px 6px rgba(232, 168, 56, 0.15);
          transform: translateX(2px);
        }

        &__amount {
          font-size: 0.8rem;
          font-weight: 800;
          color: $terracotta;
          background: $terracotta-light;
          padding: 3px 8px;
          border-radius: 6px;
          border: 1px solid $terracotta-border;
          white-space: nowrap;
        }
      }
    }
  }

  // Progress Bar Track
  .player-progress-track {
    width: 100%;
    height: 6px;
    background: $warm-beige;
    border-radius: 999px;
    overflow: hidden;
    position: relative;

    .player-progress-bar {
      height: 100%;
      background: linear-gradient(90deg, $tortilla-yellow, $terracotta);
      border-radius: 999px;
      transition: width 0.25s ease-out;
    }
  }

  // Active Step Description Card
  .current-step-card {
    display: flex;
    align-items: center;
    gap: 14px;
    background: #ffffff;
    border: 1px solid $warm-border;
    border-radius: $radius-md;
    padding: 12px 16px;
    box-shadow: 0 2px 5px rgba(44, 26, 20, 0.04);

    .step-icon-area {
      font-size: 1.8rem;
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: $tortilla-yellow-light;
      border: 1px solid $tortilla-yellow-border;
      border-radius: $radius-sm;
      flex-shrink: 0;
    }

    .step-text-area {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .step-action-badge {
        display: inline-block;
        align-self: flex-start;
        font-size: 0.68rem;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        padding: 2px 6px;
        border-radius: 4px;
        background: $terracotta-light;
        color: $terracotta;
        border: 1px solid $terracotta-border;
      }

      .step-description {
        margin: 0;
        font-size: 0.95rem;
        font-weight: 600;
        color: $dark-brown;
        line-height: 1.35;
      }
    }
  }

  // Controls Row
  .player-controls-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    padding-top: 4px;

    .ctrl-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      font-size: 0.85rem;
      font-weight: 700;
      border-radius: $radius-sm;
      border: 1px solid $warm-border;
      background: #ffffff;
      color: $dark-brown;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
      transition: all 0.18s ease;
      user-select: none;

      &:hover:not(:disabled) {
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-color: $tortilla-yellow;
      }

      &:active:not(:disabled) {
        transform: translateY(0);
      }

      &:disabled {
        opacity: 0.45;
        cursor: not-allowed;
        box-shadow: none;
      }

      // Primary Play Button
      &.play-btn {
        background: $tortilla-yellow;
        color: #ffffff;
        border-color: $tortilla-yellow-hover;
        padding: 10px 22px;
        font-size: 0.95rem;

        &:hover:not(:disabled) {
          background: $tortilla-yellow-hover;
        }

        &.is-playing {
          background: $terracotta;
          border-color: $terracotta-hover;
        }
      }

      // Slow & Fast buttons
      &.slow-btn, &.fast-btn {
        background: $warm-surface;
      }

      // Reset button
      &.reset-btn {
        margin-left: auto;
        background: #ffffff;
        border: 2px solid $terracotta;
        color: $terracotta;
        font-size: 0.9rem;
        font-weight: 800;
        padding: 9px 18px;

        &:hover:not(:disabled) {
          background: $terracotta;
          color: #ffffff;
          border-color: $terracotta-hover;
          box-shadow: 0 4px 8px rgba(217, 83, 79, 0.25);
        }
      }
    }
  }

  // Footer: Speed Pills & Stepper Dots
  .player-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    padding-top: 6px;
    border-top: 1px dashed $warm-border;

    .speed-pills {
      display: flex;
      align-items: center;
      gap: 6px;

      .speed-title {
        font-size: 0.8rem;
        font-weight: 700;
        color: $wood-muted;
        margin-right: 2px;
      }

      .speed-pill {
        border: 1px solid $warm-border;
        background: #ffffff;
        color: $dark-brown;
        font-size: 0.75rem;
        font-weight: 700;
        padding: 3px 8px;
        border-radius: $radius-sm;
        cursor: pointer;
        transition: all 0.15s;

        &:hover {
          border-color: $olive-green;
        }

        &.active {
          background: $olive-green;
          color: #ffffff;
          border-color: $olive-green-hover;
        }
      }
    }

    .stepper-dots {
      display: flex;
      align-items: center;
      gap: 5px;
      flex-wrap: wrap;

      .step-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: $warm-border;
        border: none;
        padding: 0;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          transform: scale(1.3);
          background: $tortilla-yellow;
        }

        &.completed {
          background: $olive-green;
        }

        &.active {
          background: $terracotta;
          transform: scale(1.3);
          box-shadow: 0 0 0 2px $terracotta-light;
        }
      }
    }
  }
}
</file>

<file path="src/components/Scene/RecipePlayer.tsx">
/**
 * FILE: RecipePlayer.tsx
 *
 * PURPOSE:
 * Interactive recipe playback and step navigation control component.
 *
 * RESPONSIBILITY:
 * - Provides play/pause, slow, fast, step up (forward), and step down (backward) controls.
 * - Displays active recipe progress, current step index, and human-readable step description.
 * - Manages automated execution using RecipeRunner engine.
 * - Supports instant step navigation and timeline jumping while maintaining simulation world state.
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { recipes } from '../../data/catalog/recipes';
import { ingredients } from '../../data/catalog/ingredients';
import { catalogTools as tools } from '../../data/catalog/tools';
import { RecipeRunner } from '../../systems/recipeRunner';
import { worldStore } from '../../store/worldStore';
import type { RecipeStep } from '../../types/RecipeStep';
import type { Recipe } from '../../types/Recipe';
import { getRecipeRequirementsArray } from '../../types/Recipe';
import { RecipeRequirements } from '../Recipe/RecipeRequirements';
import './RecipePlayer.scss';

// Speed options and corresponding delays in ms
const SPEED_DELAYS: Record<number, number> = {
  0.5: 1200, // Slow
  1: 600,    // Normal
  2: 300,    // Fast
  3: 150,    // Turbo
};

/**
 * Formats an ingredient key with its current preparation and cooking state from worldStore.
 */
function formatIngredientWithState(inputKey: string): string {
  const store = worldStore.getState();

  const singularKey =
    inputKey.endsWith('es') && inputKey.length > 3
      ? inputKey.slice(0, -2)
      : inputKey.endsWith('s') && inputKey.length > 2
      ? inputKey.slice(0, -1)
      : inputKey;

  const entity = Object.values(store.entities).find(
    (e) =>
      e &&
      (e.id === inputKey ||
        e.ingredientId === inputKey ||
        e.ingredientId === singularKey ||
        e.id.startsWith(inputKey + '_') ||
        e.id.startsWith(singularKey + '_'))
  );

  const parts: string[] = [];

  if (entity?.state) {
    // Cooking state
    const cooking = entity.state.cooking as string | undefined;
    if (cooking && cooking !== 'raw') {
      if (cooking === 'fry' || cooking === 'fried' || cooking === 'cooked') {
        parts.push('cooked');
      } else {
        parts.push(cooking);
      }
    }

    // Preparation state
    const prep = entity.state.preparation as string | undefined;
    if (prep && prep !== 'whole' && prep !== 'raw') {
      parts.push(prep);
    }
  }

  // Fallback defaults for recipe step descriptions when state is not yet populated
  if (parts.length === 0) {
    if (inputKey === 'potatoes') {
      parts.push('cooked', 'sliced');
    } else if (inputKey === 'eggs') {
      parts.push('beaten');
    } else if (inputKey === 'onions') {
      parts.push('cooked', 'diced');
    }
  }

  parts.push(inputKey);
  return parts.join(' ');
}

/**
 * Generates human-readable step details (icon, text label, badge) for a given RecipeStep.
 */
function getStepDetails(step?: RecipeStep): { icon: string; text: string; actionName: string } {
  if (!step) {
    return { icon: '✨', text: 'Select a recipe and press Play or Step Up to begin!', actionName: 'Ready' };
  }

  switch (step.action) {
    case 'move':
      return {
        icon: '🚚',
        text: `Move ${step.ingredient || 'ingredient'} from ${step.source || 'storage'} to ${step.target || 'workspace'}`,
        actionName: 'Move',
      };
    case 'grab':
      return {
        icon: '🫳',
        text: `Grab ${step.ingredient} from ${step.source || 'storage'}`,
        actionName: 'Grab',
      };
    case 'drop':
      return {
        icon: '⬇️',
        text: `Drop held ingredient into ${step.target || 'workspace'}`,
        actionName: 'Drop',
      };
    case 'cut':
    case 'prepare':
    case 'peel':
      return {
        icon: '🔪',
        text: `${step.action.toUpperCase()} ${step.ingredient || step.target || ''} (${step.preparation || step.style || 'prepared'})`,
        actionName: step.action,
      };
    case 'wash':
    case 'rinse':
    case 'drain':
      return {
        icon: '💧',
        text: `${step.action.toUpperCase()} ${step.ingredient || step.target || ''}`,
        actionName: step.action,
      };
    case 'cook':
      return {
        icon: '🍳',
        text: `Cook ${step.target || step.ingredient || ''} (${step.method || 'fry'}${step.duration ? `, ${step.duration} ${step.unit || 'min'}` : ''})`,
        actionName: 'Cook',
      };
    case 'flip':
      return {
        icon: '🍳',
        text: step.instruction || `Flip ${step.target || 'tortilla'} in the pan`,
        actionName: 'Flip',
      };
    case 'mix':
    case 'beat':
    case 'combine': {
      const formattedInputs = (step.inputs || step.ingredients || []).map(formatIngredientWithState);
      const targetContainer = step.targetContainerId;
      const containerName =
        !targetContainer || targetContainer === 'bowl' || targetContainer === 'preparation_bowl'
          ? 'preparation bowl'
          : targetContainer.replace('_', ' ');
      return {
        icon: '🥣',
        text: `Mix ${formattedInputs.join(', ')} in the ${containerName} -> ${step.output || 'mixture'}`,
        actionName: step.action,
      };
    }
    case 'serve':
      return {
        icon: '🍽️',
        text: `Serve ${step.target || 'dish'} to ${step.containerId || 'plate'}`,
        actionName: 'Serve',
      };
    case 'instruction':
      return {
        icon: '👨‍🍳',
        text: step.text || step.instruction || 'Follow recipe instruction',
        actionName: 'Instruction',
      };
    case 'speak':
      return {
        icon: '💬',
        text: `Tortilla says: "${step.message}"`,
        actionName: 'Speak',
      };
    case 'celebrate':
      return {
        icon: '🎉',
        text: 'Flip celebration! Recipe completed successfully!',
        actionName: 'Celebrate',
      };
    case 'wait':
      return {
        icon: '⏳',
        text: `Wait for ${step.durationMs || 600}ms`,
        actionName: 'Wait',
      };
    default:
      return {
        icon: '📝',
        text: 'Execute recipe step',
        actionName: 'Step',
      };
  }
}

interface RecipePlayerProps {
  renderWorkspace?: (requirementsNode: React.ReactNode) => React.ReactNode;
}

export const RecipePlayer: React.FC<RecipePlayerProps> = ({ renderWorkspace }) => {
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>(recipes[0]?.id || 'concebolla');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1); // 0.5, 1, 2, 3

  const activeRecipe: Recipe = useMemo(
    () => recipes.find((r) => r.id === selectedRecipeId) || recipes[0],
    [selectedRecipeId]
  );
  const steps: RecipeStep[] = useMemo(() => activeRecipe?.steps || [], [activeRecipe]);
  const totalSteps = steps.length;

  const runnerRef = useRef<RecipeRunner | null>(null);
  const isExecutingRef = useRef<boolean>(false);

  // Get delay in ms based on active speed multiplier
  const currentDelayMs = SPEED_DELAYS[speed] || 600;

  // Synchronize required materials for active recipe in despensa container
  useEffect(() => {
    const store = worldStore.getState();
    const reqs = getRecipeRequirementsArray(activeRecipe);
    reqs.forEach((req) => {
      const existing = store.entities[req.entityId];
      if (!existing) {
        const catalogIng = ingredients.find((i) => i.id === req.entityId);
        const catalogTool = tools.find((t: { id: string }) => t.id === req.entityId);
        store.dispatch({
          type: 'ADD_ENTITY',
          payload: {
            entity: {
              id: req.entityId,
              name: req.name || catalogIng?.name || catalogTool?.name || req.entityId,
              type: (catalogTool ? 'tool' : 'ingredient') as 'tool' | 'ingredient',
              icon: catalogIng?.icon || catalogTool?.icon,
              ingredientId: req.entityId,
              state: {},
            },
            containerId: 'despensa',
          },
        });
      }
    });
  }, [activeRecipe]);

  // Re-sync runner context or reset when recipe changes
  const handleRecipeChange = (newRecipeId: string) => {
    setIsPlaying(false);
    setSelectedRecipeId(newRecipeId);
    setCurrentStepIndex(0);
    runnerRef.current = null;
    worldStore.getState().dispatch({ type: 'RESET_WORLD' });
  };

  // Full reset of world and player step
  const handleReset = useCallback(() => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
    runnerRef.current = null;
    worldStore.getState().dispatch({ type: 'RESET_WORLD' });
  }, []);

  // Jump to a specific target step index by replaying from step 0
  const jumpToStep = useCallback(
    async (targetIndex: number) => {
      if (isExecutingRef.current) return;
      setIsPlaying(false);

      const clampedTarget = Math.min(Math.max(0, targetIndex), totalSteps);
      isExecutingRef.current = true;

      try {
        // Reset world state to initial kitchen
        worldStore.getState().dispatch({ type: 'RESET_WORLD' });

        // Instantiate zero-delay runner for fast-forward
        const fastRunner = new RecipeRunner({
          mascotId: 'chef',
          defaultTargetId: 'board',
          delayMs: 0,
        });
        fastRunner.bindRecipeContext(activeRecipe);

        for (let i = 0; i < clampedTarget; i++) {
          await fastRunner.executeStep(steps[i]);
        }

        fastRunner.delayMs = currentDelayMs;
        runnerRef.current = fastRunner;
        setCurrentStepIndex(clampedTarget);
      } catch (err) {
        console.error('[RecipePlayer] Error jumping to step:', err);
      } finally {
        isExecutingRef.current = false;
      }
    },
    [activeRecipe, totalSteps, steps, currentDelayMs]
  );

  // Step Up (Step forward 1 step)
  const handleStepUp = useCallback(async () => {
    if (isExecutingRef.current) return;
    setIsPlaying(false);

    if (currentStepIndex >= totalSteps) return;

    isExecutingRef.current = true;

    try {
      if (!runnerRef.current || currentStepIndex === 0) {
        if (currentStepIndex === 0) {
          worldStore.getState().dispatch({ type: 'RESET_WORLD' });
        }
        runnerRef.current = new RecipeRunner({
          mascotId: 'chef',
          defaultTargetId: 'board',
          delayMs: currentDelayMs,
        });
        runnerRef.current.bindRecipeContext(activeRecipe);
      } else {
        runnerRef.current.delayMs = currentDelayMs;
      }

      const stepToRun = steps[currentStepIndex];
      await runnerRef.current.executeStep(stepToRun);
      setCurrentStepIndex((prev) => Math.min(prev + 1, totalSteps));
    } catch (err) {
      console.error('[RecipePlayer] Error stepping up:', err);
    } finally {
      isExecutingRef.current = false;
    }
  }, [currentStepIndex, totalSteps, activeRecipe, steps, currentDelayMs]);

  // Step Down (Step back 1 step)
  const handleStepDown = useCallback(() => {
    if (currentStepIndex <= 0) return;
    jumpToStep(currentStepIndex - 1);
  }, [currentStepIndex, jumpToStep]);

  // Toggle Play / Pause
  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      // If at end of recipe, restart from beginning
      if (currentStepIndex >= totalSteps) {
        handleReset();
      }
      setIsPlaying(true);
    }
  };

  // Decrease speed (Slow button)
  const handleSlow = () => {
    if (speed === 3) setSpeed(2);
    else if (speed === 2) setSpeed(1);
    else if (speed === 1) setSpeed(0.5);
    else setSpeed(0.5);
  };

  // Increase speed (Fast button)
  const handleFast = () => {
    if (speed === 0.5) setSpeed(1);
    else if (speed === 1) setSpeed(2);
    else if (speed === 2) setSpeed(3);
    else setSpeed(3);
  };

  // Auto-play step loop effect
  useEffect(() => {
    if (!isPlaying) return;

    let isCancelled = false;

    const playNextStep = async () => {
      if (currentStepIndex >= totalSteps) {
        setIsPlaying(false);
        return;
      }

      if (isExecutingRef.current) return;
      isExecutingRef.current = true;

      try {
        if (!runnerRef.current || currentStepIndex === 0) {
          if (currentStepIndex === 0) {
            worldStore.getState().dispatch({ type: 'RESET_WORLD' });
          }
          runnerRef.current = new RecipeRunner({
            mascotId: 'chef',
            defaultTargetId: 'board',
            delayMs: currentDelayMs,
          });
          runnerRef.current.bindRecipeContext(activeRecipe);
        } else {
          runnerRef.current.delayMs = currentDelayMs;
        }

        const stepToRun = steps[currentStepIndex];
        await runnerRef.current.executeStep(stepToRun);

        if (!isCancelled) {
          const nextIndex = currentStepIndex + 1;
          setCurrentStepIndex(nextIndex);
          if (nextIndex >= totalSteps) {
            setIsPlaying(false);
          }
        }
      } catch (err) {
        console.error('[RecipePlayer] Playback loop error:', err);
        if (!isCancelled) setIsPlaying(false);
      } finally {
        isExecutingRef.current = false;
      }
    };

    playNextStep();

    return () => {
      isCancelled = true;
    };
  }, [isPlaying, currentStepIndex, totalSteps, activeRecipe, steps, currentDelayMs]);

  // Details for current step
  const currentStep = steps[currentStepIndex < totalSteps ? currentStepIndex : totalSteps - 1];
  const stepDetails = getStepDetails(currentStepIndex < totalSteps ? currentStep : undefined);
  const progressPercent = totalSteps > 0 ? Math.min(100, (currentStepIndex / totalSteps) * 100) : 0;

  const requirementsNode = (
    <div className="recipe-requirements-section" data-container-id="despensa">
      <div className="requirements-header">
        <span className="requirements-title">📋 Required Materials</span>
        <span className="requirements-subtitle">(Drag items to workstation)</span>
      </div>
      <RecipeRequirements requirements={getRecipeRequirementsArray(activeRecipe)} />
    </div>
  );

  return (
    <>
      <div className="recipe-player-container">
        {/* Header Row */}
        <div className="player-header">
          <div className="recipe-select-group">
            <span className="recipe-label">Recipe:</span>
            <div className="recipe-buttons">
              {recipes.map((r) => {
                const isActive = r.id === selectedRecipeId;
                const recipeIcon = r.id === 'concebolla' ? '🧅' : '🥔';
                return (
                  <button
                    key={r.id}
                    type="button"
                    className={`recipe-btn ${isActive ? 'active' : ''}`}
                    onClick={() => handleRecipeChange(r.id)}
                  >
                    <span className="recipe-btn-icon">{recipeIcon}</span>
                    <span className="recipe-btn-text">{r.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="player-status-badge">
            <span className="step-count">
              Step <strong>{currentStepIndex}</strong> / {totalSteps}
            </span>
            <span className={`speed-badge speed-${speed.toString().replace('.', '_')}`}>
              ⚡ {speed}x
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="player-progress-track">
          <div
            className="player-progress-bar"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Active Step Description Card */}
        <div className="current-step-card">
          <div className="step-icon-area">{stepDetails.icon}</div>
          <div className="step-text-area">
            <div className="step-action-badge">{stepDetails.actionName}</div>
            <p className="step-description">{stepDetails.text}</p>
          </div>
        </div>

        {/* Main Controls Row */}
        <div className="player-controls-bar">
          {/* Slow Control */}
          <button
            type="button"
            className="ctrl-btn slow-btn"
            onClick={handleSlow}
            title="Slow down playback speed (0.5x)"
          >
            🐢 Slow
          </button>

          {/* Step Down (Step Back) */}
          <button
            type="button"
            className="ctrl-btn step-down-btn"
            onClick={handleStepDown}
            disabled={currentStepIndex <= 0}
            title="Step Down: Go back to previous step"
          >
            ⏮ Step Down
          </button>

          {/* Play / Pause Toggle */}
          <button
            type="button"
            className={`ctrl-btn play-btn ${isPlaying ? 'is-playing' : ''}`}
            onClick={handleTogglePlay}
            title={isPlaying ? 'Pause recipe auto-play' : 'Play recipe step-by-step'}
          >
            {isPlaying ? '⏸ Pause' : currentStepIndex >= totalSteps ? '🔄 Replay' : '▶ Play'}
          </button>

          {/* Step Up (Step Forward) */}
          <button
            type="button"
            className="ctrl-btn step-up-btn"
            onClick={handleStepUp}
            disabled={currentStepIndex >= totalSteps}
            title="Step Up: Advance to next step"
          >
            Step Up ⏭
          </button>

          {/* Fast Control */}
          <button
            type="button"
            className="ctrl-btn fast-btn"
            onClick={handleFast}
            title="Speed up playback speed (2x/3x)"
          >
            Fast ⚡
          </button>

          {/* Kitchen Reset Button */}
          <button
            type="button"
            className="ctrl-btn reset-btn"
            onClick={handleReset}
            title="Reset kitchen world to starting state"
          >
            🔄 Reset
          </button>
        </div>

        {/* Speed Presets & Step Timeline Dots */}
        <div className="player-footer">
          <div className="speed-pills">
            <span className="speed-title">Speed:</span>
            {[0.5, 1, 2, 3].map((sp) => (
              <button
                key={sp}
                type="button"
                className={`speed-pill ${speed === sp ? 'active' : ''}`}
                onClick={() => setSpeed(sp)}
              >
                {sp}x
              </button>
            ))}
          </div>

          {/* Interactive Step Stepper Dots */}
          <div className="stepper-dots">
            {steps.map((_, idx) => (
              <button
                key={`step-dot-${idx}`}
                type="button"
                className={`step-dot ${idx < currentStepIndex ? 'completed' : ''} ${
                  idx === currentStepIndex ? 'active' : ''
                }`}
                onClick={() => jumpToStep(idx)}
                title={`Jump to step ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {!renderWorkspace && requirementsNode}
      </div>
      {renderWorkspace && renderWorkspace(requirementsNode)}
    </>
  );
};
</file>

<file path="src/components/World/EntityView.tsx">
/**
 * FILE: EntityView.tsx
 *
 * PURPOSE:
 * Generic entity renderer component.
 *
 * RESPONSIBILITY:
 * - Renders entities based on entity type via a renderer registry.
 * - Handles drag-and-drop interactions or static read-only presentation.
 */

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import type { Entity } from '../../types/world';
import { EntityIcon } from './EntityIcon';
import { EntityStateBadge } from './EntityStateBadge';
import { entityRendererRegistry, type EntityRendererProps } from './rendererRegistry';

/**
 * Default Entity Renderer used when no custom renderer is registered for an entity type.
 */
export const DefaultEntityRenderer: React.FC<EntityRendererProps> = ({ entity, containerId }) => {
  return (
    <>
      <span className="entity-view__icon">
        <EntityIcon entity={entity} />
      </span>
      <span className="entity-view__name">{entity.name}</span>
      <EntityStateBadge entity={entity} containerId={containerId} />
    </>
  );
};

interface EntityViewProps {
  entity: Entity;
  containerId?: string;
  readOnly?: boolean;
}

/**
 * Inner component for interactive draggable entities (must be used inside a DndContext).
 */
const DraggableEntityView: React.FC<EntityViewProps> = ({ entity, containerId }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: entity.id,
  });

  const style: React.CSSProperties = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.6 : 1,
        zIndex: isDragging ? 1000 : 1,
        cursor: 'grab',
      }
    : {
        cursor: 'grab',
      };

  const CustomRenderer = entityRendererRegistry[entity.type];
  const RendererComponent = CustomRenderer || DefaultEntityRenderer;

  const className = [
    'entity-view',
    `entity-view--type-${entity.type}`,
    isDragging ? 'entity-view--dragging' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      data-entity-id={entity.id}
      data-ingredient-id={entity.ingredientId || entity.id}
      className={className}
    >
      <RendererComponent entity={entity} containerId={containerId} readOnly={false} />
    </div>
  );
};

export const EntityView: React.FC<EntityViewProps> = ({ entity, containerId, readOnly = false }) => {
  if (readOnly) {
    const CustomRenderer = entityRendererRegistry[entity.type];
    const RendererComponent = CustomRenderer || DefaultEntityRenderer;

    const className = [
      'entity-view',
      `entity-view--type-${entity.type}`,
      'entity-view--readonly',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        data-entity-id={entity.id}
        data-ingredient-id={entity.ingredientId || entity.id}
        className={className}
      >
        <RendererComponent entity={entity} containerId={containerId} readOnly />
      </div>
    );
  }

  return <DraggableEntityView entity={entity} containerId={containerId} />;
};
</file>

<file path="src/data/catalog/recipes/index.ts">
/**
 * FILE: index.ts
 *
 * PURPOSE:
 * Master export and catalog for all recipe definitions.
 *
 * RESPONSIBILITY:
 * - Collects all available recipes into a typed RecipeList.
 * - Provides a single entry point for accessing recipes.
 * - New recipes only need to be added here to appear in the catalog.
 */

import type { RecipeList } from '../../../types/Recipe'

import { concebollaRecipe } from './concebolla';
import { clasicaRecipe } from './clasica';

/**
 * Master recipe catalog.
 *
 * Used by systems that need access to all available recipes.
 */
export const recipes: RecipeList = [
  concebollaRecipe,
  clasicaRecipe,
];

export const sincebollaRecipe = clasicaRecipe;

/**
 * Individual recipe exports.
 *
 * Useful for:
 * - Recipe detail views
 * - Testing
 * - Debugging
 * - Future recipe editors
 */
export {
  concebollaRecipe,
  clasicaRecipe,
};
</file>

<file path="src/data/catalog/workstations.ts">
/**
 * FILE: workstations.ts
 *
 * PURPOSE:
 * Static registry of kitchen workstations.
 *
 * RESPONSIBILITY:
 * - Defines all workstations in the kitchen and their supported actions/capabilities.
 */

import type { Workstation, WorkstationId } from '../../types/workstations';

export const KITCHEN_WORKSTATIONS: Record<WorkstationId, Workstation> = {
  pantry: {
    id: 'pantry',
    name: 'Pantry',
    purpose: 'Store ingredients',
    supportedActions: ['take', 'store', 'move', 'grab'],
    defaultContainerId: 'despensa',
  },
  washing_station: {
    id: 'washing_station',
    name: 'Washing Station',
    purpose: 'Clean ingredients',
    supportedActions: ['wash', 'rinse', 'drain'],
    defaultContainerId: 'sink',
  },
  cutting_station: {
    id: 'cutting_station',
    name: 'Cutting Station',
    purpose: 'Change ingredient preparation',
    supportedActions: ['prepare', 'cut', 'peel'],
    defaultContainerId: 'board',
    requiredTools: ['knife'],
    optionalTools: ['peeler', 'mandoline', 'grater'],
  },
  preparation_station: {
    id: 'preparation_station',
    name: 'Preparation Station',
    purpose: 'Combine ingredients',
    supportedActions: ['crack', 'beat', 'whisk', 'mix', 'season', 'knead'],
    defaultContainerId: 'bowl',
    requiredTools: [],
    optionalTools: ['fork', 'whisk', 'spoon'],
  },
  cooking_station: {
    id: 'cooking_station',
    name: 'Cooking Station',
    purpose: 'Apply heat',
    supportedActions: ['heat', 'fry', 'boil', 'steam', 'grill', 'bake', 'roast', 'cook'],
    defaultContainerId: 'pan',
    requiredTools: ['pan'],
    optionalTools: ['pot', 'spatula'],
    isOn: false,
  },
  serving_station: {
    id: 'serving_station',
    name: 'Serving Station',
    purpose: 'Finish recipes',
    supportedActions: ['plate', 'garnish', 'serve'],
    defaultContainerId: 'plate',
  },
};
</file>

<file path="src/engine/ingredientState.ts">
/**
 * FILE: ingredientState.ts
 *
 * PURPOSE:
 * Helpers for deriving ingredient status and display name transformations.
 *
 * RESPONSIBILITY:
 * - Derives preparation status strings (e.g., 'sliced-potatoe', 'peeled').
 * - Derives cooking status strings (e.g., 'fried-sliced-potatoe').
 * - Formats updated ingredient names with emoji and preparation.
 */

import type { Entity } from '../types/world';
import { ingredients as catalogIngredients } from '../data/catalog/ingredients';

/**
 * Normalizes an ingredient entity ID or ingredientId to a singular ingredient key for generic status formatting.
 * Examples: 'potatoes' | 'potato' -> 'potatoe'
 *           'onions' | 'onion' -> 'onion'
 *           'carrots' | 'carrot' -> 'carrot'
 */
export function getIngredientSingularKey(targetEntity: Entity): string {
  const baseKey = (targetEntity.ingredientId || targetEntity.id.split('_')[0] || 'ingredient').toLowerCase();
  if (baseKey.startsWith('potato')) return 'potatoe';
  if (baseKey.startsWith('tomato')) return 'tomato';
  if (baseKey.startsWith('onion')) return 'onion';
  if (baseKey.startsWith('carrot')) return 'carrot';
  if (baseKey.endsWith('es') && baseKey.length > 3) return baseKey.slice(0, -2);
  if (baseKey.endsWith('s') && !['cheese', 'glass'].includes(baseKey) && baseKey.length > 2) return baseKey.slice(0, -1);
  return baseKey;
}

/**
 * Derives the generic status string for a prepared ingredient.
 * Examples:
 * - preparation 'peeled' -> 'peeled'
 * - preparation 'sliced' for potato -> 'sliced-potatoe'
 * - preparation 'diced' for onion -> 'diced-onion'
 */
export function derivePreparationStatus(targetEntity: Entity, preparation: string): string {
  const singularKey = getIngredientSingularKey(targetEntity);
  return preparation === 'peeled' ? 'peeled' : `${preparation}-${singularKey}`;
}

/**
 * Derives the generic status string for a cooked ingredient.
 * Examples:
 * - cooking 'fried' with prep 'sliced' for potato -> 'fried-sliced-potatoe'
 */
export function deriveCookingStatus(targetEntity: Entity, cooking: string): string {
  const singularKey = getIngredientSingularKey(targetEntity);
  const prep = targetEntity.state?.preparation;
  if (cooking === 'raw') {
    return prep ? (prep === 'peeled' ? 'peeled' : `${prep}-${singularKey}`) : 'raw';
  }
  return `${cooking}-${prep ? prep + '-' : ''}${singularKey}`;
}

/**
 * Formats an ingredient entity's display name after preparation.
 */
export function formatPreparedName(targetEntity: Entity, preparation: string): string {
  const singularKey = getIngredientSingularKey(targetEntity);
  const baseKey = (targetEntity.ingredientId || targetEntity.id.split('_')[0] || 'ingredient').toLowerCase();
  const catalogItem = catalogIngredients.find(
    (i) => i.id === targetEntity.ingredientId || i.id === baseKey || i.id === singularKey
  );
  const icon = catalogItem?.icon || (targetEntity.name.match(/^(\p{Emoji}|\p{Extended_Pictographic})/u)?.[0] ?? '');
  const baseName = catalogItem?.name || targetEntity.name.replace(/^(\p{Emoji}|\p{Extended_Pictographic})\s*/u, '');

  const capitalizedPrep = preparation.charAt(0).toUpperCase() + preparation.slice(1);
  return `${icon} ${capitalizedPrep} ${baseName}`.trim();
}

/**
 * Formats an ingredient entity's display name after cooking.
 */
export function formatCookedName(targetEntity: Entity, cooking: string): string {
  if (
    targetEntity.id.startsWith('mixture_') ||
    targetEntity.ingredientId === 'mixture' ||
    targetEntity.name.toLowerCase().includes('mixture')
  ) {
    return targetEntity.name;
  }

  const singularKey = getIngredientSingularKey(targetEntity);
  const baseKey = (targetEntity.ingredientId || targetEntity.id.split('_')[0] || 'ingredient').toLowerCase();
  const catalogItem = catalogIngredients.find(
    (i) => i.id === targetEntity.ingredientId || i.id === baseKey || i.id === singularKey
  );
  const icon = catalogItem?.icon || (targetEntity.name.match(/^(\p{Emoji}|\p{Extended_Pictographic})/u)?.[0] ?? '');
  const baseName = catalogItem?.name || targetEntity.name.replace(/^(\p{Emoji}|\p{Extended_Pictographic})\s*/u, '');

  const cookingWord = cooking === 'fry' || cooking === 'fried' ? 'Cooked' : cooking.charAt(0).toUpperCase() + cooking.slice(1);
  const prep = targetEntity.state?.preparation;
  const prepWord = prep && prep !== 'whole' && prep !== 'raw' ? prep.charAt(0).toUpperCase() + prep.slice(1) + ' ' : '';
  return `${icon} ${cookingWord} ${prepWord}${baseName}`.trim();
}
</file>

<file path="src/store/middleware/actionLog.test.ts">
/**
 * FILE: actionLog.test.ts
 *
 * PURPOSE:
 * Unit tests for actionLog Zustand middleware.
 *
 * RESPONSIBILITY:
 * - Validates action recording, log size limits, and clearing behavior.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { createStore } from 'zustand/vanilla';
import { devtools } from 'zustand/middleware';
import { actionLog, clearActionLog, getActionLog } from './actionLog';

interface CounterState {
  count: number;
  incrementLabelled: () => void;
  incrementUnlabelled: () => void;
}

function makeStore() {
  return createStore<CounterState>()(
    devtools(
      actionLog((set) => ({
        count: 0,
        incrementLabelled: () =>
          set((state) => ({ count: state.count + 1 }), false, 'INCREMENT'),
        incrementUnlabelled: () => set((state) => ({ count: state.count + 1 })),
      })),
      { enabled: false }
    )
  );
}

describe('actionLog middleware', () => {
  beforeEach(() => {
    clearActionLog();
  });

  it('records a labelled set call', () => {
    const store = makeStore();
    store.getState().incrementLabelled();

    const log = getActionLog();
    expect(log).toHaveLength(1);
    expect(log[0].action).toBe('INCREMENT');
    expect(store.getState().count).toBe(1);
  });

  it('does not record an unlabelled set call', () => {
    const store = makeStore();
    store.getState().incrementUnlabelled();

    expect(getActionLog()).toHaveLength(0);
    expect(store.getState().count).toBe(1);
  });

  it('caps the log at 200 entries, dropping the oldest first', () => {
    const store = makeStore();
    for (let i = 0; i < 205; i++) {
      store.getState().incrementLabelled();
    }

    const log = getActionLog();
    expect(log).toHaveLength(200);
    expect(store.getState().count).toBe(205);
  });

  it('clearActionLog empties the log', () => {
    const store = makeStore();
    store.getState().incrementLabelled();
    clearActionLog();

    expect(getActionLog()).toHaveLength(0);
  });
});
</file>

<file path="src/store/middleware/actionLog.ts">
/**
 * FILE: actionLog.ts
 *
 * PURPOSE:
 * Zustand middleware for recording world actions.
 *
 * RESPONSIBILITY:
 * - Observes store mutations.
 * - Creates an action history/debug log.
 *
 * USED FOR:
 * - Debugging.
 * - Future replay systems.
 */

import type { StateCreator, StoreMutatorIdentifier } from 'zustand/vanilla';

export interface ActionLogEntry {
  /** The action's label, e.g. "MOVE_ENTITY". */
  action: string;
  timestamp: number;
}

const MAX_ENTRIES = 200;

let entries: ActionLogEntry[] = [];

/** Read-only snapshot of recorded world actions, oldest first. */
export function getActionLog(): ActionLogEntry[] {
  return [...entries];
}

/** Clears the recorded history. Mainly useful between tests. */
export function clearActionLog(): void {
  entries = [];
}

type ActionLogMiddleware = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  initializer: StateCreator<T, Mps, Mcs>,
) => StateCreator<T, Mps, Mcs>;

/**
 * Records every labelled `set` call into an in-memory action log — the
 * "Action Queue" docs/systems.md describes for debugging, replay, and
 * future AI compatibility.
 *
 * A reducer opts a state change into the log by passing a label as the
 * third argument to `set`, the same convention the `devtools` middleware
 * uses for naming actions in Redux DevTools:
 *
 *   set(nextState, false, 'MOVE_ENTITY')
 *
 * Intended to sit directly beneath `devtools` in the middleware stack
 * (`devtools(actionLog(initializer))`), so it observes the same labelled
 * `set` calls devtools does. Calls without a string label are forwarded
 * unlogged.
 */
export const actionLog: ActionLogMiddleware = (initializer) => (set, get, api) => {
  const loggedSet = ((partial: unknown, replace?: unknown, label?: unknown) => {
    if (typeof label === 'string') {
      entries.push({ action: label, timestamp: Date.now() });
      if (entries.length > MAX_ENTRIES) entries.shift();
    }
    return (set as (...args: unknown[]) => void)(partial, replace, label);
  }) as typeof set;

  return initializer(loggedSet, get, api);
};
</file>

<file path="src/styles/_mixins.scss">
/**
 * FILE: src/styles/_mixins.scss
 *
 * PURPOSE:
 * Reusable SCSS mixins for ceramic cards, workstation panels, and interactive elements.
 */

@use 'sass:color';
@use './variables' as *;

// Cozy ceramic card container mixin
@mixin ceramic-card($bg-color: $warm-surface, $border-color: $warm-border) {
  background: $bg-color;
  border: 1px solid $border-color;
  border-radius: $radius-lg;
  box-shadow: $shadow-ceramic;
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}

// Workstation panel header styling
@mixin workstation-header($accent-color, $text-color: $dark-brown) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 2px dashed color.mix($accent-color, white, 35%);
  margin-bottom: 12px;

  h3 {
    color: $text-color;
    font-size: 1.05rem;
    font-weight: 700;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .workstation-badge {
    font-size: 0.75rem;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: $radius-sm;
    background: color.mix($accent-color, white, 18%);
    color: $accent-color;
    border: 1px solid color.mix($accent-color, white, 40%);
  }
}

// Interactive wooden/playful button mixin
@mixin playful-button($bg: $tortilla-yellow, $text: #ffffff) {
  background: $bg;
  color: $text;
  border: none;
  border-radius: $radius-sm;
  padding: 8px 14px;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(44, 26, 20, 0.12);
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(44, 26, 20, 0.18);
    filter: brightness(1.04);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 1px 3px rgba(44, 26, 20, 0.15);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    box-shadow: none;
  }
}

// Flex center helper
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</file>

<file path="src/styles/_variables.scss">
/**
 * FILE: src/styles/_variables.scss
 *
 * PURPOSE:
 * Design system tokens and color variables for Tortilla World simulation app.
 */

// === PRIMARY PALETTE ===
// Warm tortilla yellow: main brand color (cooked egg & golden potato)
$tortilla-yellow: #e8a838;
$tortilla-yellow-hover: #d99729;
$tortilla-yellow-light: #fef7e8;
$tortilla-yellow-border: #f1c875;

// Olive green: secondary actions & natural Mediterranean elements
$olive-green: #5b8a46;
$olive-green-hover: #4b7339;
$olive-green-light: #f1f7ef;
$olive-green-border: #a4c795;

// Terracotta orange/red: highlights, alerts & active kitchen states (Spanish clay cookware)
$terracotta: #c85a32;
$terracotta-hover: #b34b25;
$terracotta-light: #fdf2ee;
$terracotta-border: #e8a58e;

// Warm cream/beige: background surfaces (flour, whitewashed walls, paper)
$warm-cream: #fbf6ee;
$warm-beige: #f5ebd0;
$warm-surface: #faf3e8;
$warm-border: #e6d7c3;

// Dark brown/wood: text, headers & grounding structural elements
$dark-brown: #2c1a14;
$wood-medium: #6b4226;
$wood-muted: #8c6b4a;
$wood-light: #f1e4d1;

// === KITCHEN AREA WORKSTATION COLOR SYSTEM ===
// Pantry / Ingredient Storage
$pantry-bg: #f5ebdc;
$pantry-border: #e2d2bd;
$pantry-accent: #8c6b4a;

// Washing Area (Sink) - Water & cleanliness with natural tones
$washing-bg: #ebf5f8;
$washing-border: #c5e2eb;
$washing-accent: #2b7890;
$washing-text: #1d5466;

// Cutting Area (Board) - Warm wood & neutral preparation space
$cutting-bg: #f8f1e5;
$cutting-border: #e7d7c1;
$cutting-accent: #8b5a2b;
$cutting-text: #4e3217;

// Mixing / Preparation Area (Bowl) - Cream/yellow transformation & creativity
$mixing-bg: #fff8eb;
$mixing-border: #f5e2b8;
$mixing-accent: #d49b2a;
$mixing-text: #6e4e0c;

// Cooking Area (Pan) - Orange/red heat, fire & activity
$cooking-bg: #fdf2ee;
$cooking-border: #f5cbbf;
$cooking-accent: #c85a32;
$cooking-text: #732a10;

// Serving Area (Plate) - Green/terracotta final presentation stage
$serving-bg: #f3f8f2;
$serving-border: #cde0c8;
$serving-accent: #5b8a46;
$serving-text: #2d4c20;

// === INGREDIENT STATE PALETTE ===
// Raw: natural, muted earthy colors
$state-raw-bg: #faf6f0;
$state-raw-border: #d8ccc0;
$state-raw-text: #6e5f53;

// Prepared: brighter, clean preparation teal/emerald
$state-prep-bg: #ebf7f5;
$state-prep-border: #a8e0d6;
$state-prep-text: #206157;

// Cooking: warmer orange/red active heat
$state-cook-bg: #fff2ee;
$state-cook-border: #f8beb0;
$state-cook-text: #a83a14;

// Finished Food: golden, satisfying cooked food yellow/gold
$state-finished-bg: #fff8e7;
$state-finished-border: #e8c872;
$state-finished-text: #8c5a0d;

// === SHADOWS & ELEVATIONS ===
$shadow-ceramic: 0 4px 14px rgba(44, 26, 20, 0.07);
$shadow-ceramic-hover: 0 8px 22px rgba(44, 26, 20, 0.12);
$shadow-floating: 0 12px 28px rgba(44, 26, 20, 0.18);

// === TYPOGRAPHY & RADII ===
$font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
$font-mono: ui-monospace, SFMono-Regular, Consolas, monospace;

$radius-sm: 8px;
$radius-md: 12px;
$radius-lg: 16px;
$radius-xl: 24px;
</file>

<file path="src/systems/recipeRunner/types.ts">
/**
 * FILE: src/systems/recipeRunner/types.ts
 *
 * PURPOSE:
 * Type definitions and execution context contract for RecipeRunner and its step handlers.
 */

import type { Recipe } from '../../types/Recipe';
import type { Entity } from '../../types/world';

export interface RecipeContextData {
  recipeId: string;
  /**
   * Maps key/alias/ingredient name (e.g. 'potatoes', 'egg', 'mixture') to a specific stable Entity ID.
   */
  bindings: Record<string, string>;
}

export interface RecipeRunnerOptions {
  mascotId?: string;
  defaultSourceId?: string;
  defaultTargetId?: string;
  delayMs?: number;
}

export interface RecipeRunnerContext {
  mascotId: string;
  defaultSourceId: string;
  defaultTargetId: string;
  delayMs: number;
  currentRecipe?: Recipe;
  recipeContext: RecipeContextData;

  wait(ms?: number): Promise<void>;

  /**
   * Binds initial recipe ingredients to entity IDs in the world state.
   */
  bindRecipeContext(recipe: Recipe): void;

  /**
   * Retrieves the bound Entity ID for a target or key from RecipeContext.
   */
  getBoundEntityId(targetOrKey?: string): string | undefined;

  /**
   * Validates that an entity exists and is not consumed. Throws descriptive error on failure.
   */
  validateEntity(entityId: string, stepAction?: string): Entity;

  /**
   * Ensures specified bound entity is in target workspace container or held by mascot.
   */
  ensureEntityInWorkspace(
    entityId: string,
    targetContainerId?: string
  ): Promise<string>;

  /**
   * Updates bindings if an entity ID changed (e.g. copied from immutable storage).
   */
  updateBindingIfCopied(oldEntityId: string, newEntityId: string, specificKey?: string): void;

  resolveIngredientId(targetOrKey?: string): string | undefined;
  ensureIngredientInWorkspace(
    ingredientCatalogId: string,
    targetContainerId?: string
  ): Promise<string | undefined>;
}
</file>

<file path="src/types/RecipeIngredient.ts">
/**
 * FILE: RecipeIngredient.ts
 *
 * PURPOSE:
 * Defines ingredient usage inside recipes.
 *
 * RESPONSIBILITY:
 * - Stores ingredient quantity and unit information.
 */

export interface RecipeIngredient {
  id: string
  ingredientId: string
  amount: number
  unit: string
}
</file>

<file path="src/types/workstations.ts">
/**
 * FILE: workstations.ts
 *
 * PURPOSE:
 * Defines workstation structures and capabilities.
 *
 * RESPONSIBILITY:
 * - Represents workstations as functional kitchen areas where actions take place.
 * - Maps cooking/preparation actions to workstations and required tools.
 */

export type WorkstationId =
  | 'pantry'
  | 'washing_station'
  | 'cutting_station'
  | 'preparation_station'
  | 'cooking_station'
  | 'serving_station';

export type Workstation = {
  id: WorkstationId;
  name: string;
  purpose: string;
  supportedActions: string[];
  defaultContainerId: string;
  requiredTools?: string[];
  optionalTools?: string[];
  isOn?: boolean;
};
</file>

<file path="src/main.tsx">
/**
 * FILE: main.tsx
 *
 * PURPOSE:
 * React application bootstrap file.
 *
 * RESPONSIBILITY:
 * - Creates the React root.
 * - Loads global styles.
 * - Starts the application.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
</file>

<file path="AGENTS.md">
# AGENTS.md

## Tortilla World — AI Coding Agent Guide

Welcome to Tortilla World.

This file explains the project context, architecture rules, development environment, and expectations for AI coding agents.

Before changing code:

1. Read this file completely.
2. Understand the entity/container architecture.
3. Check related documentation.
4. Make the smallest correct change.
5. Keep the simulation model consistent.

---

# Project Overview

Tortilla World is an interactive cooking simulation built with:

* React
* TypeScript
* Vite
* Zustand
* dnd-kit
* Framer Motion

It is not a traditional CRUD application.

The application models a small living world.

Objects exist as entities.

Entities are placed inside containers.

Systems modify the world.

---

# Core Mental Model

The most important concept:

```
Entities exist in Containers.

Systems create Actions.

Actions modify the World State.
```

Example:

```
Kitchen

 ├── Potato
 ├── Egg
 ├── Knife
 └── Pan


User action:

Move Potato to Pan


Result:

Kitchen

 ├── Egg
 ├── Knife
 └── Pan


Pan

 └── Potato
```

The potato is not recreated.

Ownership changes.

---

# Important Terminology

## Entity

Anything that exists in the world.

Examples:

* ingredient
* tool
* container
* character
* machine

---

## Container

A world object that owns entities.

Examples:

* kitchen
* pantry
* recipe
* pan
* plate

Containers define:

* what they accept
* ordering
* uniqueness rules
* transfer behaviour

Do not call these "lists".

They are not simple arrays.

---

## System

A piece of logic that changes the world.

Examples:

* Movement System
* Interaction System
* Cooking System
* AI System

React components are not systems.

---

# Architectural Rules

## Rule 1 — Do Not Put Business Logic Into Components

Bad:

```tsx
onDrop={() => {
   moveIngredient()
   validateRecipe()
   updateCooking()
}}
```

Good:

```tsx
onDrop={() => {
   dispatchAction()
}}
```

Components display.

Systems decide.

---

# Rule 2 — Zustand Is the World State

Zustand stores:

* entities
* containers
* relationships
* world state

Zustand should not know:

* mouse events
* DOM elements
* animations
* React components

---

# Rule 3 — Entities Keep Identity

Never solve movement by deleting and recreating objects.

Bad:

```
delete potato

create new potato
```

Good:

```
Kitchen owns potato

changes to:

Pan owns potato
```

---

# Rule 4 — Containers Enforce Rules

Entities do not decide where they can go.

The container decides.

Example:

Potato:

```
Allowed:

Kitchen
Recipe
Pan
Plate
```

The rule belongs to the container.

---

# Rule 5 — Container Contents Are Ordered

Do not replace container contents with Set.

Order matters.

Reasons:

* rendering
* animations
* drag and drop
* visual arrangement

Uniqueness is handled by validation.

---

# Rule 6 — Ingredient Uniqueness

A container cannot contain two identical ingredients.

Valid:

```
Recipe

Potato
Egg
Onion
```

Invalid:

```
Recipe

Potato
Potato
```

Tools are different.

Valid:

```
Kitchen

Pan
Pan
Knife
Knife
```

---

# Repository Structure

```
src/

├── components/
│   React rendering components

├── store/
│   Zustand world state

├── systems/
│   World behaviour

├── types/
│   TypeScript contracts

├── data/
│   Static definitions

└── assets/
    Images and visual resources


docs/

├── entities.md
├── architecture.md
├── systems.md
├── decisions.md
└── roadmap.md
```

---

# Development Environment

## Requirements

Node.js

npm

---

## Install

```bash
npm install
```

---

## Development Server

```bash
npm run dev
```

---

## Build

```bash
npm run build
```

---

## Tests

Run:

```bash
npm run test
```

---

## Lint

Run:

```bash
npm run lint
```

---

# Current Technology Choices

## Frontend

React 19

TypeScript

Vite

---

## State

Zustand

The store represents the simulation state.

---

## Drag and Drop

dnd-kit

Drag and drop is only input.

It does not contain world rules.

---

## Animation

Framer Motion

Animations react to world changes.

---

# Coding Style

## Prefer

Small functions.

Explicit types.

Clear names.

Domain terminology.

Example:

Good:

```ts
moveEntity()
validateContainer()
transferOwnership()
```

Avoid:

```ts
handleStuff()
processData()
updateThing()
```

---

# Before Adding New Features

Ask:

## Is this a new entity?

Example:

```
Knife
Plate
Customer
```

Add entity definition.

---

## Is this a new container?

Example:

```
Fridge
Oven
Table
```

Add container rules.

---

## Is this behaviour?

Example:

```
Cooking
Cutting
Heating
```

Add a system.

---

## Is this only visual?

Example:

```
animation
sprite
layout
```

Keep it inside components.

---

# Common Mistakes To Avoid

## Do not create local copies of world state

Bad:

```ts
const [items,setItems]=useState([])
```

for world objects.

Use the world store.

---

## Do not bypass systems

Bad:

```ts
world.entities[id].container="pan"
```

Good:

```ts
dispatch({
 type:"MOVE_ENTITY"
})
```

---

## Do not create generic abstractions too early

Prefer:

```
one clear system
```

over:

```
many configurable frameworks
```

---

# When Changing Architecture

Update documentation.

Required files:

Architecture change:

```
docs/architecture.md
docs/decisions.md
```

Entity change:

```
docs/entities.md
```

System change:

```
docs/systems.md
```

Future direction:

```
docs/roadmap.md
```

---

# Current Development Priority

The priority order is:

1. Stable entity/container model
2. Reliable movement system
3. Correct drag and drop behaviour
4. Animation layer
5. Cooking mechanics
6. AI actions

Do not skip the foundation.

---

# Final Instruction For Agents

Treat Tortilla World as a simulation engine.

Do not optimize for the shortest React implementation.

Optimize for:

* predictable world behaviour
* clear ownership
* extensibility
* understandable systems

The goal is not a page.

The goal is a living world.

The actual whole code of this repo is in: [repomix-output.xml](https://github.com/felixinberlin/tortilla-world/blob/main/repomix-output.xml)
</file>

<file path="docs/entities.md">
# Entities

## Overview

Tortilla World is built around a world model composed of **entities** and **containers**.

Everything that exists in the world is an entity:

* ingredients
* tools
* containers
* future objects such as plates, machines, characters, or decorations

Entities do not decide where they can exist.
Containers own entities and enforce the rules of what they can contain.

The world state is therefore based on:

```
Entity
   |
   | owned by
   v
Container
```

---

# Entity

An entity is a unique object inside the world.

Example:

```ts
{
  id: "potato",
  type: "ingredient"
}
```

or:

```ts
{
  id: "pan-small",
  type: "tool"
}
```

Entities have identity.

Moving an entity does not create a new entity.
A move changes the ownership relationship between containers.

---

# Entity Types

## Ingredient

Ingredients are cooking resources.

Examples:

* potato
* egg
* onion
* oil

Ingredients have special rules:

* an ingredient can only appear once inside the same container
* ingredients can move between containers
* ingredients can be consumed by actions
* ingredients can be transformed by cooking systems

Example:

```ts
{
  id: "potato",
  type: "ingredient",
  name: "Potato",
  icon: "🥔"
}
```

---

## Tool

Tools are reusable objects used by actions at workstations.

Examples:

* knife (`knife`)
* peeler (`peeler`)
* whisk (`whisk`)
* fork (`fork`)
* spatula (`spatula`)
* grater (`grater`)
* mandoline (`mandoline`)
* spoon (`spoon`)

Tools have different rules from ingredients:

* duplicate tools are allowed
* tools can exist multiple times inside a container
* tools are normally not consumed

Example:

```ts
{
  id: "pan-001",
  type: "tool",
  name: "Pan",
  icon: "🍳"
}
```

A kitchen can contain:

```
Kitchen
 ├── pan-001
 └── pan-002
```

Both are valid.

---

# Container

A container is an entity that can own other entities.

Examples:

* kitchen
* pantry
* recipe
* pan
* plate
* fridge

A container is not a simple programming list.

It is a world object with:

* ordered contents
* ownership
* validation rules
* capabilities

Example:

```ts
{
  id: "kitchen",
  type: "container",
  children:[
    "potato",
    "egg",
    "pan-001"
  ]
}
```

---

# Container Rules

Containers define what they allow.

Rules are not stored in the entity itself.

The same entity type can behave differently depending on the container.

Example:

A potato can exist in:

```
Kitchen
Recipe
Pan
Plate
```

but each container decides what happens.

---

## Content ordering

Container contents are ordered.

The order matters for:

* visual rendering
* drag and drop
* animations
* UI positioning

Therefore container contents use an ordered collection.

Example:

```ts
children:[
  "potato",
  "egg",
  "onion"
]
```

---

# Ingredient uniqueness

A container cannot contain two identical ingredients.

Valid:

```
Recipe
 ├── potato
 ├── onion
 └── egg
```

Invalid:

```
Recipe
 ├── potato
 ├── potato
```

This rule applies only to ingredients.

---

# Duplicate entities

Duplicate rules depend on entity type.

Example:

Kitchen:

Valid:

```
Kitchen
 ├── potato
 ├── onion
 ├── pan-001
 └── pan-002
```

Invalid:

```
Kitchen
 ├── potato
 └── potato
```

---

# Ownership

Every movable entity has an owner.

Example:

Initial state:

```
Kitchen
 ├── potato
 ├── egg


Pan
 └── oil
```

After moving potato:

```
Kitchen
 └── egg


Pan
 ├── oil
 └── potato
```

The potato entity did not change.

Only the ownership relation changed.

---

# Static and Dynamic Containers

Containers can have different ownership behaviour.

## Static Container

A static container represents predefined world content.

Examples:

* kitchen ingredients
* initial inventory
* environment objects

Characteristics:

* content is defined by the world
* removing an item does not necessarily delete it
* moving an item out can create a new reference/copy depending on rules

Example:

```
Kitchen
 ├── potato
 ├── onion
 └── egg
```

---

## Dynamic Container

A dynamic container represents changing ownership.

Examples:

* recipe
* pan
* plate
* trash

Characteristics:

* items can be added
* items can be removed
* items can be transferred

Example:

```
Recipe
 ├── potato
 └── egg
```

---

# Container Capabilities

Containers expose capabilities that systems can check.

Example:

```ts
{
  canAdd: true,
  canRemove: true,
  allowsDuplicateIngredients: false,
  acceptedTypes:[
    "ingredient",
    "tool"
  ]
}
```

Before performing an action, systems validate these capabilities.

---

# Relationships

The world is composed of relationships:

```
Kitchen
   owns
      Potato


Pan
   owns
      Oil
```

The Entity itself does not know:

* where it is
* what contains it
* what actions are possible

The world systems decide this.

---

# Future Extensions

This model allows adding:

## Characters

```
Tortilla
  owns
    Knife
```

## Machines

```
Oven
  owns
    Tray
```

## Recipes

```
Recipe
  owns
    Potato
    Egg
```

## Entity State (Preparation & Cooking)

Entities store mutable properties inside their `state` field without changing entity identity:

```ts
{
  id: "potato",
  type: "ingredient",
  name: "Potato",
  state: {
    preparation: "diced", // "whole" | "peeled" | "sliced" | "diced" | "minced"
    cooking: "fried"     // "raw" | "fried" | "boiled" | "burned"
  }
}
```

Preparation and cooking actions mutate this state via `PREPARE_INGREDIENT` and `COOK_INGREDIENT` actions without recreating entities.
</file>

<file path="docs/roadmap.md">
# Tortilla World Roadmap

## Vision

Tortilla World is an interactive cooking simulation built around a living world model.

The goal is not only to create a recipe application, but to create a small simulated environment where:

* objects exist as entities
* containers define relationships
* actions modify the world
* characters and AI can interact with the environment

The long-term vision is a "living kitchen" where the user can interact with objects naturally and where autonomous agents can understand and manipulate the world.

---

# Current Status

## Phase: World Foundation

Status:

🟡 In development

Current focus:

* stable world model
* entity system
* container system
* drag and drop interactions
* predictable state management

Completed foundations:

✅ React + TypeScript application
✅ Zustand world store
✅ Entity-based architecture
✅ Container concept
✅ Drag and drop foundation
✅ Ingredient data model
✅ Documentation structure

---

# Roadmap Overview

```text
Foundation
    |
    v
World Interaction
    |
    v
Cooking Simulation
    |
    v
Living Kitchen
    |
    v
AI Assisted World
```

---

# Phase 1 — World Foundation

## Goal

Create a reliable simulation core.

## Features

### Entity System

Implement:

* ingredients
* tools
* containers
* entity identity

Example:

```text
Potato
Knife
Pan
Kitchen
```

---

### Container System

Implement:

* ownership
* ordered contents
* container rules
* validation

Examples:

```text
Kitchen
Recipe
Pan
Plate
```

---

### Movement System

Implement:

* moving entities
* validating moves
* transfer rules
* ownership changes

Example:

```text
Kitchen

 potato

    |
    v

Pan

 potato
```

---

# Phase 2 — Interaction Layer

## Goal

Make the world feel alive.

## Features

### Improved Drag and Drop

Support:

* visual feedback
* invalid drop states
* animations
* multi-container interactions

---

### Entity Animations

Entities should:

* move naturally
* react to interactions
* have visual states

Examples:

* potato jumps into pan
* knife moves to cutting board
* ingredients combine

---

### Action System

Introduce:

```ts
Action
{
 type
 payload
 timestamp
}
```

Benefits:

* replay
* debugging
* AI compatibility

Status:

✅ Traceability — every `dispatch` call is logged (`devtools` +
`src/store/middleware/actionLog.ts`) and validated through
`engine/containerRules.ts`.
🚧 Replay — the log is in-memory only; replaying a recorded sequence back
into the store is not implemented.

---

# Phase 3 — Cooking Simulation

## Goal

Create actual cooking behaviour.

## Features

## Recipe System

Support:

* recipes
* ingredient requirements
* preparation steps

Example:

```text
Potato
Egg
Onion

    +
    
Cooking

    =

Tortilla
```

---

## Cooking States

Entities gain states:

Example:

```text
Potato

raw
 |
 v
cut
 |
 v
fried
```

---

## Tools Become Functional

Examples:

Knife:

```text
ingredient
      |
      v
cut ingredient
```

Pan:

```text
ingredient
      |
      v
cook ingredient
```

---

# Phase 4 — Living Kitchen

## Goal

Create a world that behaves independently.

## Features

### Characters

Introduce:

* player character
* helpers
* customers
* NPCs

---

### Time System

Add:

* cooking duration
* events
* schedules

Example:

```text
Egg on pan

0s
 |
30s
 |
Cooked
```

---

### Environment

Add:

* fridge
* cupboards
* tables
* oven
* restaurant area

---

# Phase 5 — AI Kitchen Assistant

## Goal

Allow AI agents to understand and interact with the world.

The AI does not directly change state.

The AI creates actions.

Example:

```json
{
"type":"MOVE_ENTITY",
"entity":"egg",
"target":"pan"
}
```

The world validates and executes the action.

---

## AI Features

Possible future capabilities:

* recipe planning
* cooking assistance
* autonomous helpers
* explanations
* suggestions
* learning user preferences

---

# Phase 6 — Multiplayer / Shared World (Future)

Possible future direction:

* shared kitchens
* collaborative cooking
* synchronized worlds
* multiple AI agents

---

# Development Principles

## Keep the World Model Independent

The simulation should not depend on React.

---

## Prefer Systems Over Component Logic

Components display.

Systems decide.

---

## Preserve Entity Identity

Objects are moved, not recreated.

---

## Document Decisions

Important architecture changes should be recorded in:

```text
docs/decisions.md
```

---

# Current Priority

The immediate goal is:

> Build a stable interactive kitchen world where every object follows predictable rules.

Everything else depends on this foundation.
</file>

<file path="src/components/Ingredients/RecipeIngredientItem.tsx">
/**
 * FILE: RecipeIngredientItem.tsx
 *
 * PURPOSE:
 * Displays an ingredient used in a recipe.
 *
 * RESPONSIBILITY:
 * - Shows ingredient amount and unit.
 * - Represents recipe-specific ingredient data.
 */

import type { Ingredient } from '../../types/Ingredient'

interface RecipeIngredientItemProps {
  key?: string | number
  ingredient: Ingredient
  amount: number
  unit: string
}

export function RecipeIngredientItem({
  ingredient,
  amount,
  unit,
}: RecipeIngredientItemProps) {
  return (
    <li className="recipe-ingredient-item">
      <span aria-hidden="true">{ingredient.icon}</span>
      <span className="recipe-ingredient-name">{ingredient.name}</span>
      <span className="recipe-ingredient-amount">
        {amount} {unit}
      </span>
    </li>
  )
}
</file>

<file path="src/components/Ingredients/RecipeIngredientList.tsx">
/**
 * FILE: RecipeIngredientList.tsx
 *
 * PURPOSE:
 * Displays the ingredients required by a recipe.
 *
 * RESPONSIBILITY:
 * - Renders recipe ingredient collection.
 * - Provides recipe-oriented presentation.
 */

import type { Ingredient } from '../../types/Ingredient'
import type { RecipeIngredient } from '../../types/RecipeIngredient'
import './Ingredients.scss'
import { RecipeIngredientItem } from './RecipeIngredientItem'

interface RecipeIngredientListProps {
  ingredients: RecipeIngredient[]
  ingredientCatalog: Ingredient[]
}

export function RecipeIngredientList({
  ingredients,
  ingredientCatalog,
}: RecipeIngredientListProps) {
  const ingredientsById = new Map(
    ingredientCatalog.map((ingredient) => [ingredient.id, ingredient]),
  )

  return (
    <ul className="recipe-ingredient-list">
      {ingredients.map((recipeIngredient) => {
        const ingredient = ingredientsById.get(recipeIngredient.ingredientId)

        if (!ingredient) {
          return null
        }

        return (
          <RecipeIngredientItem
            key={recipeIngredient.id}
            amount={recipeIngredient.amount}
            ingredient={ingredient}
            unit={recipeIngredient.unit}
          />
        )
      })}
    </ul>
  )
}
</file>

<file path="src/components/Recipe/RequirementView.tsx">
/**
 * FILE: RequirementView.tsx
 *
 * PURPOSE:
 * Displays a single required entity inside a recipe.
 *
 * RESPONSIBILITY:
 * - Uses EntityView in readOnly mode to visualize required entity.
 * - Always uses fresh catalog data to keep Required Materials immutable.
 *
 * NOTE: Required Materials should show the original, uncooked state of ingredients.
 * Even if an ingredient gets cooked (e.g., oil heated), the Required Materials list
 * should always display the same original names. We achieve this by always using
 * fresh catalog data instead of world state (which gets mutated during cooking).
 * - Renders requirement quantity and unit.
 */

import React, { useEffect } from 'react';
import type { Requirement } from '../../types/Requirement';
import type { Entity } from '../../types/world';
import { worldStore } from '../../store/worldStore';
import { ingredients } from '../../data/catalog/ingredients';
import { catalogTools as tools } from '../../data/catalog/tools';
import { EntityView } from '../World/EntityView';

interface RequirementViewProps {
  requirement: Requirement;
}

export const RequirementView: React.FC<RequirementViewProps> = ({ requirement }) => {
  // const entities = useStore(worldStore, (state) => state.entities);
  const catalogIng = ingredients.find((i) => i.id === requirement.entityId);
  const catalogTool = tools.find((t: { id: string }) => t.id === requirement.entityId);

  /**
   * CHANGE: Always use fresh catalog data for Required Materials.
   *
   * WHY: This ensures Required Materials remain visually immutable throughout the recipe,
   * regardless of any state changes (cooking, consumed, etc.) in the world state.
   *
   * EXAMPLE:
   *   - Catalog says: { icon: '🫒', name: 'Olive Oil' }
   *   - After heating: world state has { cooking: 'heat' } but display stays "Olive Oil"
   *   - Not: "Heat Olive Oil" (which would be wrong)
   *
   * We intentionally ignore realEntity to keep the UI clean and consistent.
   */
  const entity: Entity = {
    id: requirement.entityId,
    name: requirement.name || catalogIng?.name || catalogTool?.name || requirement.entityId,
    type: (catalogTool ? 'tool' : 'ingredient') as 'tool' | 'ingredient',
    icon: catalogIng?.icon || catalogTool?.icon,
    ingredientId: requirement.entityId,
    state: {}, // Always fresh, never mutated
  };

  useEffect(() => {
    const store = worldStore.getState();
    const existing = store.entities[requirement.entityId];
    if (!existing) {
      // If entity doesn't exist in world state yet, create it in pantry
      store.dispatch({
        type: 'ADD_ENTITY',
        payload: {
          entity: {
            id: requirement.entityId,
            name: requirement.name || catalogIng?.name || catalogTool?.name || requirement.entityId,
            type: (catalogTool ? 'tool' : 'ingredient') as 'tool' | 'ingredient',
            icon: catalogIng?.icon || catalogTool?.icon,
            ingredientId: requirement.entityId,
            state: {},
          },
          containerId: 'despensa',
        },
      });
    } else {
      // If entity exists, ensure it's in the pantry (source container)
      const despensa = store.containers['despensa'];
      if (despensa && !despensa.entityIds.includes(requirement.entityId)) {
        store.dispatch({
          type: 'MOVE_ENTITY',
          payload: { entityId: requirement.entityId, targetContainerId: 'despensa' },
        });
      }
    }
  }, [requirement.entityId, catalogIng?.name, catalogIng?.icon, catalogTool?.name, catalogTool?.icon, catalogTool, requirement.name]);

  return (
    <li className="requirement-view">
      <EntityView entity={entity} containerId="despensa" readOnly={false} />
      <span className="requirement-view__amount">
        {requirement.amount} {requirement.unit}
      </span>
    </li>
  );
};
</file>

<file path="src/components/World/ContainerView.tsx">
/**
 * FILE: ContainerView.tsx
 *
 * PURPOSE:
 * Displays a world container and its owned entities.
 *
 * RESPONSIBILITY:
 * - Renders container title and its inner entities via EntityView.
 * - Acts as a droppable target for drag-and-drop actions.
 */

import React from 'react';
import { useStore } from 'zustand';
import { useDroppable } from '@dnd-kit/core';
import { motion, AnimatePresence } from 'framer-motion';
import { worldStore } from '../../store/worldStore';
import type { Container, Entity } from '../../types/world';
import { EntityView } from './EntityView';
import './World.scss';

interface ContainerViewProps {
  key?: string | number;
  container: Container;
}

export const ContainerView: React.FC<ContainerViewProps> = ({ container }) => {
  const entities = useStore(worldStore, (state) => state.entities);

  // Set up dnd-kit droppable binding for this container
  const { setNodeRef, isOver } = useDroppable({
    id: container.id,
  });

  const containerEntities = container.entityIds
    .map((id: string) => entities[id])
    .filter((e: Entity | undefined): e is Entity => Boolean(e));

  const isMixturePresent = containerEntities.some(
    (e) => e.id.includes('mixture') || e.name.toLowerCase().includes('mixture')
  );

  const getWorkstationBadge = (id: string) => {
    switch (id) {
      case 'sink': return 'Washing Area 💧';
      case 'board': return 'Cutting Workspace 🔪';
      case 'bowl': return 'Preparation 🥣';
      case 'burner': return 'Cooking Heat 🍳';
      case 'burner1': return 'Cooking Heat 1🍳';
      case 'burner2': return 'Cooking Heat 2🍳';
      case 'plate': return 'Serving Stage 🍽️';
      case 'despensa': return 'Pantry 🧺';
      default: return 'Workstation 📦';
    }
  };

  const containerOnFireClass = container.isOn ? 'container-onFire' : '';
  const dispatch = useStore(worldStore, (state) => state.dispatch);

  return (
    <div
      ref={setNodeRef}
      data-container-id={container.id}
      className={`${container.isOn ? 'container-view--on' : ''} ${containerOnFireClass} container-view container-view--${container.id} ${isOver ? 'container-view--drag-over' : ''} ${isMixturePresent ? 'container-view--mixture' : ''}`}
    >
      <div className="container-view__header">
        <h3 className="container-view__title">{container.name}</h3>
        <span className="container-view__badge">{getWorkstationBadge(container.id)}</span>
        <button
          className={`burner-toggle ${container.isOn ? 'burner-toggle--on' : ''}`}
          onClick={(e) => {
            e.stopPropagation();

            dispatch({
              type: 'TOGGLE_BURNER',
              payload: {
                containerId: container.id,
              },
            });
          }}
        />
      </div>
      <div className="container-view__items">
        <AnimatePresence mode="popLayout">
          {containerEntities.map((entity: Entity) => {
            const isMixture = entity.id.includes('mixture') || entity.name.toLowerCase().includes('mixture');
            return (
              <motion.div
                key={entity.id}
                layout
                initial={
                  isMixture
                    ? { scale: 0.1, rotate: -180, opacity: 0 }
                    : { scale: 0.8, opacity: 0, y: -10 }
                }
                animate={
                  isMixture
                    ? {
                      scale: [0.2, 1.15, 1],
                      rotate: [-180, 10, 0],
                      opacity: 1,
                      transition: { duration: 0.65, ease: 'easeOut' },
                    }
                    : { scale: 1, rotate: 0, opacity: 1, y: 0 }
                }
                exit={{
                  scale: 0,
                  rotate: 180,
                  opacity: 0,
                  filter: 'blur(4px)',
                  transition: { duration: 0.5, ease: 'easeInOut' },
                }}
                transition={{ duration: 0.35 }}
              >
                <EntityView entity={entity} containerId={container.id} />
              </motion.div>
            );
          })}
        </AnimatePresence>
        {containerEntities.length === 0 && (
          <span className="container-view__empty-hint">Drop entities here</span>
        )}
      </div>
    </div>
  );
};
</file>

<file path="src/components/World/World.scss">
/**
 * FILE: World.scss
 *
 * PURPOSE:
 * SCSS styles for world containers and entity views.
 */

@use 'sass:color';
@use '../../styles/variables' as *;
@use '../../styles/mixins' as *;

.container-view {
  @include ceramic-card($warm-surface, $warm-border);
  min-width: 240px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: border-color 0.2s ease, background-color 0.2s ease;

  &--drag-over {
    border-color: $tortilla-yellow;
    background-color: color.mix($tortilla-yellow, $warm-surface, 10%);
  }

  &--mixture {
    border-color: $tortilla-yellow;
    box-shadow: 0 0 16px rgba(245, 180, 50, 0.35);
  }
}

.burner-toggle {
  width: 18px;
  height: 18px;
  padding: 0;

  border: 2px solid #666;
  border-radius: 50%;
  background: #2f2f2f;

  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.15);
    border-color: #999;
  }

  &:active {
    transform: scale(0.95);
  }
}

.burner-toggle--on {
  background: #ff6b00;
  border-color: #ff9d4d;

  box-shadow:
    0 0 6px rgba(255, 120, 0, .8),
    0 0 14px rgba(255, 120, 0, .5);
}

.container-onFire {
  animation: burnerGlow 1s infinite alternate;
}

@keyframes burnerGlow {
  from {
    box-shadow: 0 0 5px red;
  }

  to {
    box-shadow: 0 0 25px orange;
  }
}

.container-view__header {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.container-view__title {
  color: $dark-brown;
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
}

.container-view__badge {
  color: $wood-muted;
  font-size: 0.82rem;
  font-weight: 600;
}

.container-view__items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  min-height: 48px;
}

.container-view__empty-hint {
  color: $wood-muted;
  font-size: 0.85rem;
  font-style: italic;
  text-align: center;
  padding: 12px;
  border: 1px dashed $warm-border;
  border-radius: $radius-md;
}

.entity-view {
  align-items: center;
  background: #ffffff;
  border: 1px solid $warm-border;
  border-radius: $radius-md;
  box-shadow: 0 2px 6px rgba(44, 26, 20, 0.04);
  display: flex;
  gap: 0.5rem;
  padding: 8px 12px;
  user-select: none;
  transition: all 0.2s ease;

  &:hover {
    border-color: color.mix($tortilla-yellow, $warm-border, 50%);
  }

  &--dragging {
    opacity: 0.6;
    cursor: grabbing;
  }

  &--readonly {
    cursor: default;
    background: color.mix($warm-beige, #ffffff, 40%);
    box-shadow: none;

    &:hover {
      border-color: $warm-border;
    }
  }
}

.entity-view__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.entity-view__name {
  font-weight: 600;
  color: $dark-brown;
  font-size: 0.9rem;
}

.entity-view__state {
  margin-left: auto;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: $radius-sm;

  &--raw {
    background: #fef3c7;
    color: #92400e;
  }

  &--prepared {
    background: #e0f2fe;
    color: #0369a1;
  }

  &--cooking {
    background: #ffedd5;
    color: #c2410c;
  }

  &--finished {
    background: #dcfce7;
    color: #15803d;
  }
}
</file>

<file path="src/data/catalog/ingredients.ts">
/**
 * FILE: ingredients.ts
 *
 * PURPOSE:
 * Catalog of available ingredient definitions.
 *
 * RESPONSIBILITY:
 * - Provides master list of ingredient metadata (names, icons, ids).
 */

import type { Ingredient } from "../../types/Ingredient";


export const ingredients: Ingredient[] = [

  {
    id: "potato",
    icon: "🥔",
    name: "Potatoes",
  },

  {
    id: "egg",
    icon: "🥚",
    name: "Eggs",
  },

  {
    id: "oil",
    icon: "🫒",
    name: "Olive Oil",
  },

  {
    id: "onion",
    icon: "🧅",
    name: "Onion",
  },

  {
    id: "chorizo",
    icon: "🌭",
    name: "Chorizo",
  },

  {
    id: "salt",
    icon: "🧂",
    name: "Salt",
  },

  {
    id: "pepper",
    icon: "🫑",
    name: "Bell Pepper",
  },

  {
    id: "garlic",
    icon: "🧄",
    name: "Garlic",
  },

  {
    id: "tomato",
    icon: "🍅",
    name: "Tomato",
  },

  {
    id: "cheese",
    icon: "🧀",
    name: "Cheese",
  },

  {
    id: "bread",
    icon: "🍞",
    name: "Bread",
  },

  {
    id: "milk",
    icon: "🥛",
    name: "Milk",
  },

  {
    id: "butter",
    icon: "🧈",
    name: "Butter",
  },

  // --- Expanded Ingredients ---

  {
    id: "black_pepper",
    icon: "🌶️",
    name: "Black Pepper",
  },

  {
    id: "flour",
    icon: "🌾",
    name: "Flour",
  },

  {
    id: "sugar",
    icon: "🍚",
    name: "Sugar",
  },

  {
    id: "rice",
    icon: "🍚",
    name: "Rice",
  },

  {
    id: "chicken",
    icon: "🍗",
    name: "Chicken",
  },

  {
    id: "beef",
    icon: "🥩",
    name: "Beef",
  },

  {
    id: "mushroom",
    icon: "🍄",
    name: "Mushroom",
  },

  {
    id: "spinach",
    icon: "🥬",
    name: "Spinach",
  },

  {
    id: "lemon",
    icon: "🍋",
    name: "Lemon",
  },

];
</file>

<file path="src/store/slices/mascotSlice.ts">
/**
 * FILE: mascotSlice.ts
 *
 * PURPOSE:
 * Zustand slice for mascot (Chef Tortilla) state actions.
 *
 * RESPONSIBILITY:
 * - Mutates mascot gaze, flip, grab, and drop states.
 */

import type { StateCreator } from 'zustand/vanilla';
import type { Entity } from '../../types/world';
import type { WorldStateStore } from '../types';
import { validateContainerRules } from '../../engine/containerRules';
import type { GazeTarget } from '../../systems/gaze';

export interface MascotSlice {
  mascotFlip: (mascotId?: string) => void;
  mascotMove: (targetContainerId: string, mascotId?: string) => void;
  mascotGrab: (entityId: string, sourceContainerId?: string, mascotId?: string) => void;
  mascotDrop: (targetContainerId: string, positionIndex?: number, mascotId?: string) => void;
  mascotClearGaze: (mascotId?: string) => void;
}

export const createMascotSlice: StateCreator<
  WorldStateStore,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  MascotSlice
> = (set, get) => ({
  mascotFlip: (mascotId = 'chef') => {
    set(
      (draft) => {
        const mascot = draft.entities[mascotId];
        if (!mascot) return;
        mascot.state = {
          ...mascot.state,
          state: 'flipping',
          isFlipping: true,
        };
      },
      false,
      'MASCOT_FLIP'
    );

    setTimeout(() => {
      set(
        (draft) => {
          const mascot = draft.entities[mascotId];
          if (!mascot || mascot.state?.state !== 'flipping') return;
          mascot.state = {
            ...mascot.state,
            state: 'idle',
            isFlipping: false,
          };
        },
        false,
        'RESET_MASCOT_FLIP'
      );
    }, 800);
  },

  mascotMove: (targetContainerId, mascotId = 'chef') => {
    set(
      (draft) => {
        const mascot = draft.entities[mascotId];
        if (!mascot) return;
        const gaze: GazeTarget = { type: 'entity', entityId: targetContainerId };
        mascot.state = {
          ...mascot.state,
          gazingAt: gaze,
          targetContainerId,
        };
      },
      false,
      'MASCOT_MOVE'
    );
  },

  mascotGrab: (entityId, sourceContainerId, mascotId = 'chef') => {
    const state = get();
    const mascot = state.entities[mascotId];
    if (!mascot) return;
    const grabbedEntity = state.entities[entityId];
    if (!grabbedEntity) return;

    const foundSource = sourceContainerId
      ? state.containers[sourceContainerId]
      : Object.values(state.containers).find((c) => c.entityIds.includes(entityId));

    set(
      (draft) => {
        const m = draft.entities[mascotId];
        if (!m) return;
        const grabGaze: GazeTarget = { type: 'entity', entityId };
        m.state = {
          ...m.state,
          holdingEntityId: entityId,
          sourceContainerId: foundSource?.id,
          gazingAt: grabGaze,
        };
      },
      false,
      'MASCOT_GRAB'
    );
  },

  mascotClearGaze: (mascotId = 'chef') => {
    set(
      (draft) => {
        const mascot = draft.entities[mascotId];
        if (!mascot) return;
        mascot.state = { ...mascot.state, gazingAt: null, targetContainerId: undefined };
      },
      false,
      'MASCOT_CLEAR_GAZE'
    );
  },

  mascotDrop: (targetContainerId, positionIndex, mascotId = 'chef') => {
    const state = get();
    const mascot = state.entities[mascotId];
    if (!mascot) return;

    const holdingEntityId = mascot.state?.holdingEntityId as string | undefined;

    if (!holdingEntityId) {
      set(
        (draft) => {
          const m = draft.entities[mascotId];
          if (m) {
            m.state = { ...m.state, gazingAt: { type: 'entity', entityId: targetContainerId } };
          }
        },
        false,
        'MASCOT_DROP'
      );
      return;
    }

    const entityToMove = state.entities[holdingEntityId];
    const targetContainer = state.containers[targetContainerId];
    if (!entityToMove || !targetContainer) return;

    const sourceContainerId = mascot.state?.sourceContainerId as string | undefined;
    const sourceContainer = sourceContainerId
      ? state.containers[sourceContainerId]
      : Object.values(state.containers).find((c) => c.entityIds.includes(holdingEntityId));

    const isSourceImmutable =
      sourceContainer?.rules?.isImmutable || sourceContainer?.rules?.consumesOnDrag === false;

    let finalEntityId = holdingEntityId;
    let copyEntity: Entity | undefined;

    if (sourceContainer && sourceContainer.id !== targetContainerId && isSourceImmutable) {
      const copyId = `${entityToMove.id}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      copyEntity = {
        ...entityToMove,
        id: copyId,
        ingredientId: entityToMove.ingredientId || entityToMove.id.split('_')[0],
      };

      const currentEntities = targetContainer.entityIds
        .map((id) => state.entities[id])
        .filter((e): e is Entity => Boolean(e));
      const result = validateContainerRules(targetContainer, copyEntity, currentEntities);
      if (!result.allowed) return;

      finalEntityId = copyId;
    } else {
      const currentEntities = targetContainer.entityIds
        .map((id) => state.entities[id])
        .filter((e): e is Entity => Boolean(e) && e.id !== holdingEntityId);
      const result = validateContainerRules(targetContainer, entityToMove, currentEntities);
      if (!result.allowed) return;
    }

    set(
      (draft) => {
        if (copyEntity) {
          draft.entities[copyEntity.id] = copyEntity;
        }

        if (sourceContainer && !isSourceImmutable) {
          draft.containers[sourceContainer.id].entityIds = draft.containers[
            sourceContainer.id
          ].entityIds.filter((id) => id !== holdingEntityId);
        }

        if (typeof positionIndex === 'number') {
          draft.containers[targetContainerId].entityIds.splice(positionIndex, 0, finalEntityId);
        } else {
          draft.containers[targetContainerId].entityIds.push(finalEntityId);
        }

        const m = draft.entities[mascotId];
        if (m) {
          m.state = {
            ...m.state,
            holdingEntityId: undefined,
            sourceContainerId: undefined,
            gazingAt: { type: 'entity', entityId: targetContainerId } satisfies GazeTarget,
          };
        }
      },
      false,
      'MASCOT_DROP'
    );
  },
});
</file>

<file path="src/store/gazeStore.ts">
/**
 * FILE: gazeStore.ts
 *
 * PURPOSE:
 * Stores mascot gaze/attention state.
 *
 * RESPONSIBILITY:
 * - Tracks what the mascot is looking at.
 * - Provides gaze information to UI components.
 */

import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { GazeTarget } from '../systems/gaze';
import { gazeEntityId } from '../systems/gaze';

interface GazeState {
  /**
   * Whatever the mascot should be looking at right now.
   * null → fall back to idle eye position.
   */
  target: GazeTarget;
  setTarget: (target: GazeTarget) => void;
  clearTarget: () => void;
}

/**
 * Standalone gaze store — separate from worldStore so UI components
 * (TortillaSvg, eye-tracking overlays) can subscribe to gaze changes
 * with fine-grained selectors and zero coupling to world state shape.
 *
 * Uses subscribeWithSelector middleware so callers can subscribe to
 * slices of gaze state without triggering on unrelated updates.
 *
 * @example
 *   // React component: only re-renders when entityId changes
 *   const entityId = useGazeStore((s) => gazeEntityId(s.target));
 *
 *   // Outside React: subscribe to entity-gaze changes only
 *   useGazeStore.subscribe(
 *     (s) => gazeEntityId(s.target),
 *     (id) => console.log('now gazing at entity', id)
 *   );
 */
export const useGazeStore = create<GazeState>()(
  subscribeWithSelector((set) => ({
    target: null,
    setTarget: (target) => set({ target }),
    clearTarget: () => set({ target: null }),
  }))
);

// Re-export the narrow helper so consumers don't need a separate import.
export { gazeEntityId };
</file>

<file path="src/store/types.ts">
/**
 * FILE: types.ts
 *
 * PURPOSE:
 * Type contract for Zustand world store and its slices.
 */

import type { Container, Entity, WorldAction, WorldEvent } from '../types/world';
import type { EntitySlice } from './slices/entitySlice';
import type { ContainerSlice } from './slices/containerSlice';
import type { MascotSlice } from './slices/mascotSlice';

export type WorldStateStore = {
  entities: Record<string, Entity>;
  containers: Record<string, Container>;
  events: WorldEvent[];
  dispatch: (action: WorldAction) => void;
  emitEvent: (event: WorldEvent) => void;
  onEvent: (listener: (event: WorldEvent) => void) => () => void;
  resetWorld: () => void;
} & EntitySlice &
  ContainerSlice &
  MascotSlice;
</file>

<file path="src/systems/recipeRunner/handlers/cookHandlers.test.ts">
/**
 * FILE: src/systems/recipeRunner/handlers/cookHandlers.test.ts
 *
 * PURPOSE:
 * Unit tests for cooking step handlers and oil heating behavior.
 *
 * RESPONSIBILITY:
 * - Verify oil heating doesn't mark oil as consumed
 * - Verify oil stays in the burner1/container after heating
 * - Verify oil IS consumed when it's used as a cooking medium
 * - Distinguish between oil as target vs oil as cooking medium
 * - Test garlic cooking and other ingredients
 * - Verify Required Materials immutability concept
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { worldStore } from '../../../store/worldStore';
import { handleCookStep, handleFlipStep } from './cookHandlers';
import type { RecipeStep } from '../../../types/RecipeStep';
import type { RecipeRunnerContext } from '../types';

type CookStep = Extract<RecipeStep, { action: 'cook' }>;
type FlipStep = Extract<RecipeStep, { action: 'flip' }>;

/**
 * Helper: Create mock RecipeRunnerContext
 */
function createMockContext(overrides?: Partial<RecipeRunnerContext>): RecipeRunnerContext {
  return {
    mascotId: 'chef_1',
    defaultSourceId: 'burner1try',
    defaultTargetId: 'board',
    delayMs: 0, // No delay in tests
    recipeContext: {
      recipeId: 'test_recipe',
      bindings: {},
    },
    getBoundEntityId: vi.fn((key: string) => {
      const mapping: Record<string, string> = {
        oil: 'oil_1',
        potatoes: 'potatoes_1',
        garlic: 'garlic_1',
        mixture: 'mixture_1',
      };
      return mapping[key] || null;
    }),
    validateEntity: vi.fn(),
    updateBindingIfCopied: vi.fn(),
    wait: vi.fn(async () => {}),
    bindStepsContext: vi.fn(),
    ensureEntityInWorkspace: vi.fn(async (id: string) => id),
    ensureIngredientInWorkspace: vi.fn(async (id: string) => id),
    resolveIngredientId: vi.fn((key: string) => key),
    currentRecipe: undefined,
    bindRecipeContext: vi.fn(),
    runRecipe: vi.fn(),
    runSteps: vi.fn(),
    executeStep: vi.fn(),
    ...overrides,
  } as unknown as RecipeRunnerContext;
}

/**
 * Helper: Setup world state with ingredients
 */
function seedWorld() {
  worldStore.setState({
    entities: {
      oil_1: {
        id: 'oil_1',
        name: '🫒 Olive Oil',
        type: 'ingredient',
        ingredientId: 'oil',
        state: {},
      },
      potatoes_1: {
        id: 'potatoes_1',
        name: '🥔 Potatoes',
        type: 'ingredient',
        ingredientId: 'potatoes',
        state: { preparation: 'sliced' },
      },
      garlic_1: {
        id: 'garlic_1',
        name: '🧄 Garlic',
        type: 'ingredient',
        ingredientId: 'garlic',
        state: { preparation: 'peeled' },
      },
      eggs_1: {
        id: 'eggs_1',
        name: '🥚 Eggs',
        type: 'ingredient',
        ingredientId: 'egg',
        state: {},
      },
    },
    containers: {
      burner1: {
        id: 'burner1',
        name: 'burner1',
        type: 'workstation',
        entityIds: [],
      },
      burner1try: {
        id: 'burner1try',
        name: 'burner1try',
        type: 'storage',
        entityIds: ['oil_1', 'potatoes_1', 'garlic_1', 'eggs_1'],
      },
      board: {
        id: 'board',
        name: 'Board',
        type: 'workstation',
        entityIds: [],
      },
    },
    events: [],
  });
}

describe('Cook Handlers - Oil & Ingredient Cooking', () => {
  beforeEach(() => {
    seedWorld();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Test Group 1: Oil Heating (Primary Target)', () => {
    it('1.1: Heat oil - Oil should NOT be marked as consumed', async () => {
      const ctx = createMockContext();

      const heatOilStep: CookStep = {
        action: 'cook',
        target: 'oil',
        method: 'heat',
      };

      await handleCookStep(ctx, heatOilStep, 'burner1');

      const state = worldStore.getState();
      const oil = state.entities.oil_1;

      expect(oil.state?.consumed).not.toBe(true);
      expect(oil.state?.consumedBy).toBeUndefined();
    });

    it('1.2: Heat oil - Oil should be moved to burner1', async () => {
      const ctx = createMockContext();

      const heatOilStep: CookStep = {
        action: 'cook',
        target: 'oil',
        method: 'heat',
      };

      await handleCookStep(ctx, heatOilStep, 'burner1');

      const state = worldStore.getState();
      const burner1Container = state.containers.burner1;

      expect(burner1Container.entityIds).toContain('oil_1');
    });

    it('1.3: Heat oil - Oil state should show cooking method "heat"', async () => {
      const ctx = createMockContext();

      const heatOilStep: CookStep = {
        action: 'cook',
        target: 'oil',
        method: 'heat',
      };

      await handleCookStep(ctx, heatOilStep, 'burner1');

      const state = worldStore.getState();
      const oil = state.entities.oil_1;

      expect(oil.state?.cooking).toBe('heat');
    });

  });

  describe('Test Group 2: Garlic Cooking & Removal', () => {
    it('2.1: Fry garlic - Garlic should be marked with cooking state', async () => {
      const ctx = createMockContext();

      const fryGarlicStep: CookStep = {
        action: 'cook',
        target: 'garlic',
        method: 'fry',
        instruction: 'Que no se quemen.', // Don't let them burn
      };

      await handleCookStep(ctx, fryGarlicStep, 'burner1');

      const state = worldStore.getState();
      const garlic = state.entities.garlic_1;

      expect(garlic.state?.cooking).toBe('fry');
    });

    it('2.2: Fry garlic - Garlic should be moved to burner1', async () => {
      const ctx = createMockContext();

      const fryGarlicStep: CookStep = {
        action: 'cook',
        target: 'garlic',
        method: 'fry',
      };

      await handleCookStep(ctx, fryGarlicStep, 'burner1');

      const state = worldStore.getState();
      const burner1Container = state.containers.burner1;

      expect(burner1Container.entityIds).toContain('garlic_1');
    });

    it('2.3: Fry garlic - Garlic should NOT be consumed (it\'s the target)', async () => {
      const ctx = createMockContext();

      const fryGarlicStep: CookStep = {
        action: 'cook',
        target: 'garlic',
        method: 'fry',
      };

      await handleCookStep(ctx, fryGarlicStep, 'burner1');

      const state = worldStore.getState();
      const garlic = state.entities.garlic_1;

      expect(garlic.state?.consumed).not.toBe(true);
      expect(garlic.state?.consumedBy).toBeUndefined();
    });

    it('2.4: Fry garlic - Oil should be consumed as cooking medium', async () => {
      const ctx = createMockContext();

      // First heat oil
      const heatOilStep: CookStep = {
        action: 'cook',
        target: 'oil',
        method: 'heat',
      };
      await handleCookStep(ctx, heatOilStep, 'burner1');

      // Now fry garlic
      const fryGarlicStep: CookStep = {
        action: 'cook',
        target: 'garlic',
        method: 'fry',
      };
      await handleCookStep(ctx, fryGarlicStep, 'burner1');

      const state = worldStore.getState();
      const oil = state.entities.oil_1;

      // Oil should be consumed since garlic (not oil) is the target
      expect(oil.state?.consumed).toBe(true);
      expect(oil.state?.consumedBy).toBe('garlic_1');
    });
  });

  describe('Test Group 3: Frying with Oil (Oil as Cooking Medium)', () => {
    it('3.1: Fry potatoes - Oil should be consumed as cooking medium', async () => {
      const ctx = createMockContext();

      // Heat oil first
      const heatOilStep: CookStep = {
        action: 'cook',
        target: 'oil',
        method: 'heat',
      };
      await handleCookStep(ctx, heatOilStep, 'burner1');

      // Move potatoes to burner1 manually for test
      worldStore.getState().dispatch({
        type: 'MOVE_ENTITY',
        payload: {
          entityId: 'potatoes_1',
          targetContainerId: 'burner1',
        },
      });

      // Fry potatoes
      const fryPotatoesStep: CookStep = {
        action: 'cook',
        target: 'potatoes',
        method: 'fry',
      };
      await handleCookStep(ctx, fryPotatoesStep, 'burner1');

      const state = worldStore.getState();
      const oil = state.entities.oil_1;

      // Oil SHOULD be consumed when potatoes are fried
      expect(oil.state?.consumed).toBe(true);
      expect(oil.state?.consumedBy).toBe('potatoes_1');
    });

    it('3.2: Potatoes should NOT be consumed (they are the target)', async () => {
      const ctx = createMockContext();

      // Heat oil
      const heatOilStep: CookStep = {
        action: 'cook',
        target: 'oil',
        method: 'heat',
      };
      await handleCookStep(ctx, heatOilStep, 'burner1');

      // Move potatoes to burner1
      worldStore.getState().dispatch({
        type: 'MOVE_ENTITY',
        payload: {
          entityId: 'potatoes_1',
          targetContainerId: 'burner1',
        },
      });

      // Fry potatoes
      const fryPotatoesStep: CookStep = {
        action: 'cook',
        target: 'potatoes',
        method: 'fry',
      };
      await handleCookStep(ctx, fryPotatoesStep, 'burner1');

      const state = worldStore.getState();
      const potatoes = state.entities.potatoes_1;

      expect(potatoes.state?.consumed).not.toBe(true);
      expect(potatoes.state?.consumedBy).toBeUndefined();
    });
  });

  describe('Test Group 4: Complete Cooking Sequence', () => {
    it('4.1: Full sequence - Heat oil, fry garlic, fry potatoes', async () => {
      const ctx = createMockContext();

      // Step 1: Heat oil
      const heatOilStep: CookStep = {
        action: 'cook',
        target: 'oil',
        method: 'heat',
      };
      await handleCookStep(ctx, heatOilStep, 'burner1');

      // Verify oil is in burner1 but not consumed
      let state = worldStore.getState();
      let oil = state.entities.oil_1;
      expect(state.containers.burner1.entityIds).toContain('oil_1');
      expect(oil.state?.consumed).not.toBe(true);
      expect(oil.state?.cooking).toBe('heat');

      // Step 2: Fry garlic
      const fryGarlicStep: CookStep = {
        action: 'cook',
        target: 'garlic',
        method: 'fry',
      };
      await handleCookStep(ctx, fryGarlicStep, 'burner1');

      // Verify garlic is in burner1, oil is consumed
      state = worldStore.getState();
      const garlic = state.entities.garlic_1;
      oil = state.entities.oil_1;
      expect(state.containers.burner1.entityIds).toContain('garlic_1');
      expect(garlic.state?.cooking).toBe('fry');
      expect(oil.state?.consumed).toBe(true);

      // Step 3: Move potatoes to burner1 (simulating move step)
      worldStore.getState().dispatch({
        type: 'MOVE_ENTITY',
        payload: {
          entityId: 'potatoes_1',
          targetContainerId: 'burner1',
        },
      });

      // Step 4: Fry potatoes (oil already consumed, won't be consumed again)
      const fryPotatoesStep: CookStep = {
        action: 'cook',
        target: 'potatoes',
        method: 'fry',
      };
      await handleCookStep(ctx, fryPotatoesStep, 'burner1');

      // Final state check
      state = worldStore.getState();
      const potatoes = state.entities.potatoes_1;
      oil = state.entities.oil_1;

      expect(state.containers.burner1.entityIds).toContain('potatoes_1');
      expect(potatoes.state?.cooking).toBe('fry');
      expect(oil.state?.consumed).toBe(true); // Still consumed from garlic step
    });

    it('4.2: Oil consumption happens only once per session', async () => {
      const ctx = createMockContext();

      // Heat oil
      const heatOilStep: CookStep = {
        action: 'cook',
        target: 'oil',
        method: 'heat',
      };
      await handleCookStep(ctx, heatOilStep, 'burner1');

      // Fry garlic (consumes oil)
      worldStore.getState().dispatch({
        type: 'MOVE_ENTITY',
        payload: {
          entityId: 'garlic_1',
          targetContainerId: 'burner1',
        },
      });

      const fryGarlicStep: CookStep = {
        action: 'cook',
        target: 'garlic',
        method: 'fry',
      };
      await handleCookStep(ctx, fryGarlicStep, 'burner1');

      let state = worldStore.getState();
      let oil = state.entities.oil_1;
      const firstConsumption = oil.state?.consumedBy;

      // Fry potatoes (oil already consumed, shouldn't be consumed again)
      worldStore.getState().dispatch({
        type: 'MOVE_ENTITY',
        payload: {
          entityId: 'potatoes_1',
          targetContainerId: 'burner1',
        },
      });

      const fryPotatoesStep: CookStep = {
        action: 'cook',
        target: 'potatoes',
        method: 'fry',
      };
      await handleCookStep(ctx, fryPotatoesStep, 'burner1');

      state = worldStore.getState();
      oil = state.entities.oil_1;

      // Oil should still be consumed by garlic, not potatoes
      expect(oil.state?.consumedBy).toBe(firstConsumption);
      expect(oil.state?.consumedBy).toBe('garlic_1');
    });
  });

  describe('Test Group 5: Flip Step', () => {
    it('5.1: Flip mixture - Should mark mixture as flipped', async () => {
      const ctx = createMockContext();

      // Create a mixture entity
      worldStore.getState().dispatch({
        type: 'ADD_ENTITY',
        payload: {
          entity: {
            id: 'mixture_1',
            name: '🍳 Mixture',
            type: 'ingredient',
            ingredientId: 'mixture',
            state: {},
          },
          containerId: 'burner1',
        },
      });

      const flipStep: FlipStep = {
        action: 'flip',
        target: 'mixture',
        instruction: 'Dale la vuelta a la tortilla.',
      };

      await handleFlipStep(ctx, flipStep);

      const state = worldStore.getState();
      const mixture = state.entities.mixture_1;

      expect(mixture.state?.isFlipped).toBe(true);
    });
  });

  describe('Test Group 6: Edge Cases', () => {
    it('6.1: Cook oil again - Should NOT consume it again', async () => {
      const ctx = createMockContext();

      // Heat oil first time
      const heatOilStep1: CookStep = {
        action: 'cook',
        target: 'oil',
        method: 'heat',
      };
      await handleCookStep(ctx, heatOilStep1, 'burner1');

      let state = worldStore.getState();
      let oil = state.entities.oil_1;
      expect(oil.state?.cooking).toBe('heat');

      // Try to heat oil again (should just update state)
      const heatOilStep2: CookStep = {
        action: 'cook',
        target: 'oil',
        method: 'heat',
      };
      await handleCookStep(ctx, heatOilStep2, 'burner1');

      state = worldStore.getState();
      oil = state.entities.oil_1;

      // Oil should still not be consumed
      expect(oil.state?.consumed).not.toBe(true);
    });

    it('6.2: Multiple ingredients in burner1 - Only oil consumed', async () => {
      const ctx = createMockContext();

      // Setup: Move multiple items to burner1
      worldStore.getState().dispatch({
        type: 'MOVE_ENTITY',
        payload: {
          entityId: 'oil_1',
          targetContainerId: 'burner1',
        },
      });

      worldStore.getState().dispatch({
        type: 'MOVE_ENTITY',
        payload: {
          entityId: 'eggs_1',
          targetContainerId: 'burner1',
        },
      });

      // Fry potatoes
      worldStore.getState().dispatch({
        type: 'MOVE_ENTITY',
        payload: {
          entityId: 'potatoes_1',
          targetContainerId: 'burner1',
        },
      });

      const fryStep: CookStep = {
        action: 'cook',
        target: 'potatoes',
        method: 'fry',
      };

      await handleCookStep(ctx, fryStep, 'burner1');

      const state = worldStore.getState();
      const oil = state.entities.oil_1;
      const eggs = state.entities.eggs_1;

      // Oil should be consumed
      expect(oil.state?.consumed).toBe(true);

      // Eggs should not be consumed (not detected as cooking medium)
      expect(eggs.state?.consumed).not.toBe(true);
    });

    it('6.3: Fire control - Mascot turns fire ON before cooking and OFF after cooking', async () => {
      const fireStates: boolean[] = [];

      const ctx = createMockContext({
        wait: vi.fn(async () => {
          // Record burner1 isOn state during wait
          const isOn = Boolean(worldStore.getState().containers.burner1?.isOn);
          fireStates.push(isOn);
        }),
      });

      // Ensure burner1 is off initially
      worldStore.setState({
        containers: {
          ...worldStore.getState().containers,
          burner1: {
            id: 'burner1',
            name: 'burner1',
            type: 'workstation',
            entityIds: [],
            isOn: false,
          },
        },
      });

      const cookStep: CookStep = {
        action: 'cook',
        target: 'potatoes',
        method: 'fry',
      };

      await handleCookStep(ctx, cookStep, 'burner1');

      // During cooking (in first wait after toggle or second wait), fire was turned ON
      expect(fireStates).toContain(true);

      // After cooking step finishes, burner1 fire is turned OFF
      const finalBurnerState = worldStore.getState().containers.burner1;
      expect(finalBurnerState.isOn).toBe(false);
    });
  });
});
</file>

<file path="src/systems/recipeRunner/handlers/prepHandlers.ts">
/**
 * FILE: src/systems/recipeRunner/handlers/prepHandlers.ts
 *
 * PURPOSE:
 * Step handlers for ingredient preparation steps ('cut', 'prepare', 'peel', 'wash', 'rinse', 'drain').
 */

import { worldStore } from '../../../store/worldStore';
import { moveTortillaTo } from '../../mascotActions';
import type { RecipeStep } from '../../../types/RecipeStep';
import type { RecipeRunnerContext } from '../types';

type PrepStep = Extract<
  RecipeStep,
  { action: 'cut' | 'prepare' | 'peel' | 'wash' | 'rinse' | 'drain' }
>;

export async function handlePrepStep(
  ctx: RecipeRunnerContext,
  step: PrepStep,
  workstationDefaultContainerId?: string
): Promise<void> {
  const rawKey = step.target || step.ingredient;
  let entityId = ctx.getBoundEntityId(rawKey);

  if (!entityId) {
    return;
  }

  ctx.validateEntity(entityId, step.action);

  const targetContainerId = step.containerId || workstationDefaultContainerId || ctx.defaultTargetId;

  // Ensure bound entity is in workspace
  entityId = await ctx.ensureEntityInWorkspace(entityId, targetContainerId);

  moveTortillaTo(targetContainerId, ctx.mascotId);
  await ctx.wait();

  const prepStyle = (() => {
    if ('preparation' in step && step.preparation) return step.preparation;
    if ('style' in step && step.style) return step.style;
    if (step.action === 'peel') return 'peeled';
    if (step.action === 'wash') return 'washed';
    return 'prepared';
  })();

  worldStore.getState().dispatch({
    type: 'PREPARE_INGREDIENT',
    payload: {
      entityId,
      preparation: prepStyle,
    },
  });

  await ctx.wait();
}
</file>

<file path="src/systems/recipeMatcher.test.ts">
import { describe, expect, it } from 'vitest'
import { countMatchingRequirements } from './recipeMatcher'
import type { Recipe } from '../types/Recipe'
import type { Entity } from '../types/world'

describe('countMatchingRequirements', () => {
  const sampleRecipe: Recipe = {
    id: 'test-recipe',
    name: 'Test Recipe',
    requirements: [
      { id: 'req-1', entityId: 'potato', amount: 3, unit: 'pcs' },
      { id: 'req-2', entityId: 'egg', amount: 4, unit: 'pcs' },
      { id: 'req-3', entityId: 'onion', amount: 1, unit: 'pcs' },
    ],
    steps: [],
  }

  it('returns zeros when recipe is undefined', () => {
    const result = countMatchingRequirements(undefined, [])
    expect(result.matchingCount).toBe(0)
    expect(result.totalCount).toBe(0)
    expect(result.matchingRequirementIds).toEqual([])
    expect(result.missingRequirementIds).toEqual([])
  })

  it('returns zero matching count when workspace is empty', () => {
    const result = countMatchingRequirements(sampleRecipe, [])
    expect(result.matchingCount).toBe(0)
    expect(result.totalCount).toBe(3)
    expect(result.matchingRequirementIds).toEqual([])
    expect(result.missingRequirementIds).toEqual(['potato', 'egg', 'onion'])
  })

  it('correctly matches entities present in workspace', () => {
    const workspaceEntities: Entity[] = [
      { id: 'potato_123', ingredientId: 'potato', name: 'Potato', type: 'ingredient' },
      { id: 'egg_456', ingredientId: 'egg', name: 'Egg', type: 'ingredient' },
    ]

    const result = countMatchingRequirements(sampleRecipe, workspaceEntities)
    expect(result.matchingCount).toBe(2)
    expect(result.totalCount).toBe(3)
    expect(result.matchingRequirementIds).toEqual(['potato', 'egg'])
    expect(result.missingRequirementIds).toEqual(['onion'])
  })

  it('handles entities without explicit ingredientId field by fallback prefix parsing', () => {
    const workspaceEntities: Entity[] = [
      { id: 'onion_999', name: 'Onion', type: 'ingredient' },
    ]

    const result = countMatchingRequirements(sampleRecipe, workspaceEntities)
    expect(result.matchingCount).toBe(1)
    expect(result.matchingRequirementIds).toEqual(['onion'])
  })

  it('matches tool or product entities in workspace', () => {
    const workspaceEntities: Entity[] = [
      { id: 'knife_1', name: 'Knife', type: 'tool' },
      { id: 'potato_100', ingredientId: 'potato', name: 'Potato', type: 'ingredient' },
    ]

    const result = countMatchingRequirements(sampleRecipe, workspaceEntities)
    expect(result.matchingCount).toBe(1)
    expect(result.matchingRequirementIds).toEqual(['potato'])
  })
})
</file>

<file path="src/systems/recipeMatcher.ts">
/**
 * FILE: recipeMatcher.ts
 *
 * PURPOSE:
 * Utility functions for evaluating recipe completion and matching requirements against workspace entities.
 *
 * RESPONSIBILITY:
 * - Computes matching requirements and counts for a recipe given active world entities.
 * - Identifies matched and missing entity IDs.
 */

import { getRecipeRequirementsArray } from '../types/Recipe'
import type { Recipe } from '../types/Recipe'
import type { Entity } from '../types/world'
import { getIngredientCatalogId } from '../engine/containerRules'

export interface RecipeMatchResult {
  matchingCount: number
  totalCount: number
  matchingRequirementIds: string[]
  missingRequirementIds: string[]
  // Backward compatibility aliases
  matchingIngredientIds: string[]
  missingIngredientIds: string[]
}

/**
 * Calculates matching requirement count and detailed breakdown for a given recipe
 * based on entities present in workspace containers.
 */
export function countMatchingRequirements(
  recipe: Recipe | undefined | null,
  entities: Entity[]
): RecipeMatchResult {
  if (!recipe) {
    return {
      matchingCount: 0,
      totalCount: 0,
      matchingRequirementIds: [],
      missingRequirementIds: [],
      matchingIngredientIds: [],
      missingIngredientIds: [],
    }
  }

  const requirements = getRecipeRequirementsArray(recipe)

  const workspaceEntityIds = new Set(
    entities
      .filter((e) => Boolean(e))
      .map((e) => e.ingredientId || getIngredientCatalogId(e) || e.id)
  )

  const matchingRequirementIds: string[] = []
  const missingRequirementIds: string[] = []

  for (const req of requirements) {
    const reqId = req.entityId || (req as unknown as { ingredientId?: string }).ingredientId || ''
    if (workspaceEntityIds.has(reqId)) {
      matchingRequirementIds.push(reqId)
    } else {
      missingRequirementIds.push(reqId)
    }
  }

  return {
    matchingCount: matchingRequirementIds.length,
    totalCount: requirements.length,
    matchingRequirementIds,
    missingRequirementIds,
    matchingIngredientIds: matchingRequirementIds,
    missingIngredientIds: missingRequirementIds,
  }
}

/** Alias for backward compatibility */
export const countMatchingIngredients = countMatchingRequirements
</file>

<file path="src/types/Ingredient.ts">
/**
 * FILE: Ingredient.ts
 *
 * PURPOSE:
 * Defines ingredient data structures.
 *
 * RESPONSIBILITY:
 * - Represents ingredient definitions.
 */

export interface Ingredient {
  id: string
  name: string
  icon: string
}
</file>

<file path="src/types/Recipe.ts">
/**
 * FILE: Recipe.ts
 *
 * PURPOSE:
 * Defines recipe data structure.
 *
 * RESPONSIBILITY:
 * - Represents a recipe with required entities (requirements) and steps.
 * - Supports both array and key-based dictionary requirement declarations.
 */

import type { Requirement, RequirementDictItem } from './Requirement';
import type { RecipeStep } from './RecipeStep';

export type RecipeRequirementDictItem = RequirementDictItem;

export type RecipeRequirements =
  | Requirement[]
  | Record<string, RequirementDictItem>;

export interface Recipe {
  id: string;
  name: string;
  requirements: RecipeRequirements;
  steps: RecipeStep[];
}

export type RecipeList = Recipe[];

/**
 * Normalizes a Recipe's requirements into a standard array of Requirement objects.
 */
export function getRecipeRequirementsArray(recipe: Recipe): Requirement[] {
  const reqs = recipe.requirements;
  if (Array.isArray(reqs)) {
    return reqs.map((item) => ({
      ...item,
      entityId: item.entityId || (item as unknown as { ingredientId?: string }).ingredientId || '',
    }));
  }

  if (reqs && typeof reqs === 'object') {
    return Object.entries(reqs).map(([key, item]) => ({
      id: `${recipe.id}-${key}`,
      entityId: item.entityId || item.ingredientId || key,
      amount: item.amount,
      unit: item.unit,
      name: item.name,
    }));
  }

  return [];
}

/** Legacy alias helper for backward compatibility during transition */
export const getRecipeIngredientsArray = getRecipeRequirementsArray;
</file>

<file path="src/types/RecipeStep.ts">
/**
 * FILE: RecipeStep.ts
 *
 * PURPOSE:
 * Defines declarative steps for recipes.
 *
 * RESPONSIBILITY:
 * - Replaces hardcoded recipe logic with pure data declarations.
 * - Supports cooking actions (prepare, cook, mix, flip, serve, move, grab, drop, wait, speak, celebrate).
 */

export type PreparationStyle = 'whole' | 'peeled' | 'sliced' | 'diced' | 'minced' | 'beaten' | string;
export type CookingMethod = 'raw' | 'fried' | 'boiled' | 'burned' | 'heat' | string;

export type RecipeStep =
  | {
      action: 'prepare' | 'cut' | 'peel' | 'wash';
      target?: string;
      ingredient?: string;
      preparation?: PreparationStyle;
      style?: PreparationStyle;
      containerId?: string;
    }
  | {
      action: 'cook';
      target?: string;
      ingredient?: string;
      method?: CookingMethod;
      containerId?: string;
      duration?: number;
      unit?: string;
      instruction?: string;
      mascotId?: string;
    }
  | {
      action: 'wash' | 'rinse' | 'drain';
      target?: string;
      ingredient?: string;
      containerId?: string;
    }
  | {
      action: 'mix' | 'beat' | 'combine';
      inputs?: string[];
      ingredients?: string[];
      output?: string;
      targetContainerId?: string;
    }
  | {
      action: 'instruction';
      text?: string;
      instruction?: string;
      mascotId?: string;
    }
  | {
      action: 'flip';
      target?: string;
      instruction?: string;
      mascotId?: string;
    }
  | {
      action: 'serve';
      target?: string;
      containerId?: string;
    }
  | {
      action: 'move';
      ingredient?: string;
      target?: string;
      source?: string;
    }
  | {
      action: 'grab';
      ingredient: string;
      source?: string;
    }
  | {
      action: 'drop';
      target?: string;
      positionIndex?: number;
    }
  | {
      action: 'wait';
      durationMs?: number;
    }
  | {
      action: 'speak';
      message: string;
      mascotId?: string;
    }
  | {
      action: 'celebrate';
      mascotId?: string;
    };
</file>

<file path="src/components/Recipe/RecipePanel.scss">
/**
 * FILE: src/components/Recipe/RecipePanel.scss
 *
 * PURPOSE:
 * SCSS styles for the Recipe selection and execution panel.
 */

@use 'sass:color';
@use '../../styles/variables' as *;
@use '../../styles/mixins' as *;

.recipe-panel {
  @include ceramic-card($warm-surface, $warm-border);
  padding: 12px 16px;
  margin-bottom: 16px;

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }
}

.recipe-selector {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
}

.recipe-tab {
  background: #ffffff;
  border: 1px solid $warm-border;
  font-size: 13px;
  font-weight: 700;
  color: $dark-brown;
  cursor: pointer;
  padding: 6px 14px;
  border-radius: $radius-sm;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);

  &:hover {
    border-color: $tortilla-yellow;
    color: $dark-brown;
    background: $tortilla-yellow-light;
  }

  &.active {
    background: $tortilla-yellow;
    color: #ffffff;
    border-color: $tortilla-yellow-hover;
    box-shadow: 0 2px 6px rgba(232, 168, 56, 0.3);
  }
}

.recipe-header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.recipe-status {
  font-size: 13px;
  color: $wood-muted;
  font-weight: 600;
}

.highlight-count {
  color: $terracotta;
  font-weight: 800;
}

.recipe-reset-btn {
  background: #ffffff;
  border: 2px solid $terracotta;
  border-radius: $radius-sm;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 800;
  color: $terracotta;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:hover {
    background: $terracotta;
    color: #ffffff;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  }

  &:active {
    transform: translateY(0);
  }
}

.recipe-toggle-btn {
  background: #ffffff;
  border: 1px solid $warm-border;
  border-radius: $radius-sm;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 700;
  color: $dark-brown;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: $olive-green;
    color: $olive-green;
    background: $olive-green-light;
  }
}

.recipe-content.compact {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px dashed $warm-border;
}

.recipe-requirements {
  display: flex;
  flex-direction: column;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.requirement-view {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  &__amount {
    font-size: 0.8rem;
    color: $wood-muted;
    font-weight: 600;
  }
}

.recipe-title {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: $dark-brown;
  font-weight: 700;
}
</file>

<file path="src/data/catalog/recipes/recipes.test.ts">
import { describe, expect, it } from 'vitest';
import { recipes, concebollaRecipe, clasicaRecipe } from './index';
import { ingredients as ingredientCatalog } from '../ingredients';
import type { RecipeList } from '../../../types/Recipe';
import { getRecipeRequirementsArray } from '../../../types/Recipe';

describe('Recipe Catalog', () => {
  it('exports a valid RecipeList array', () => {
    const list: RecipeList = recipes;
    expect(Array.isArray(list)).toBe(true);
    expect(list.length).toBeGreaterThanOrEqual(2);
  });

  it('contains concebolla and clasica recipes', () => {
    const ids = recipes.map((r) => r.id);
    expect(ids).toContain('concebolla');
    expect(ids).toContain('clasica');
  });

  it('validates that every recipe has required properties', () => {
    recipes.forEach((recipe) => {
      expect(recipe.id).toBeTruthy();
      expect(recipe.name).toBeTruthy();
      const requirements = getRecipeRequirementsArray(recipe);
      expect(Array.isArray(requirements)).toBe(true);
      expect(requirements.length).toBeGreaterThan(0);
    });
  });

  it('ensures all recipe requirements refer to valid catalog entities', () => {
    const catalogIds = ingredientCatalog.map((i) => i.id);

    recipes.forEach((recipe) => {
      const requirements = getRecipeRequirementsArray(recipe);
      requirements.forEach((req) => {
        expect(req.id).toBeTruthy();
        expect(req.entityId).toBeTruthy();
        expect(catalogIds).toContain(req.entityId);
        expect(req.amount).toBeGreaterThan(0);
        expect(req.unit).toBeTruthy();
      });
    });
  });

  it('distinguishes concebolla (with onion) and clasica (without onion)', () => {
    const concebollaOnion = getRecipeRequirementsArray(concebollaRecipe).find((i) => i.entityId === 'onion');
    const clasicaOnion = getRecipeRequirementsArray(clasicaRecipe).find((i) => i.entityId === 'onion');

    expect(concebollaOnion).toBeDefined();
    expect(clasicaOnion).toBeUndefined();
  });
});
</file>

<file path="src/engine/containerRules.ts">
/**
 * FILE: containerRules.ts
 *
 * PURPOSE:
 * Generic container behavior rules.
 *
 * RESPONSIBILITY:
 * - Defines reusable rules for lists/containers.
 * - Determines allowed contents and constraints.
 *
 * DOMAIN:
 * Game engine logic independent from React.
 */

import type { Container, Entity } from '../types/world';

export interface ValidationResult {
  allowed: boolean;
  reason?: string;
}

export function getIngredientCatalogId(entity: Entity): string {
  if (entity.ingredientId) return entity.ingredientId;
  return entity.id.split('_')[0];
}

export function validateContainerRules(
  container: Container,
  entity: Entity,
  currentEntitiesInContainer: Entity[]
): ValidationResult {
  const rules = container.rules;

  // 1. Ingredient Uniqueness Check (Rule 6: A container cannot contain two identical ingredients)
  if (entity.type === 'ingredient') {
    const targetIngredientId = getIngredientCatalogId(entity);
    const hasDuplicateIngredient = currentEntitiesInContainer.some(
      (e) => e.type === 'ingredient' && getIngredientCatalogId(e) === targetIngredientId
    );
    if (hasDuplicateIngredient) {
      return {
        allowed: false,
        reason: `Container '${container.name}' already contains ingredient '${targetIngredientId}'.`,
      };
    }
  }

  if (!rules) {
    return { allowed: true };
  }

  // 2. Capacity Check
  if (
    rules.maxCapacity !== undefined &&
    container.entityIds.length >= rules.maxCapacity
  ) {
    return {
      allowed: false,
      reason: `Container '${container.name}' capacity reached (${rules.maxCapacity} items max).`,
    };
  }

  // 3. Allowed Types Check
  if (rules.allowedTypes && !rules.allowedTypes.includes(entity.type)) {
    return {
      allowed: false,
      reason: `Container '${container.name}' does not accept entity type '${entity.type}'.`,
    };
  }

  // 4. Unique Types Check
  if (rules.uniqueTypesOnly) {
    const hasTypeAlready = currentEntitiesInContainer.some(
      (e) => e.type === entity.type
    );
    if (hasTypeAlready) {
      return {
        allowed: false,
        reason: `Container '${container.name}' already contains an entity of type '${entity.type}'.`,
      };
    }
  }

  // 5. Custom Validator Check
  if (rules.customValidator) {
    const passesCustom = rules.customValidator(
      container,
      entity,
      currentEntitiesInContainer
    );
    if (!passesCustom) {
      return {
        allowed: false,
        reason: `Entity '${entity.name}' failed custom container rules for '${container.name}'.`,
      };
    }
  }

  return { allowed: true };
}
</file>

<file path="src/store/slices/entitySlice.ts">
/**
 * FILE: entitySlice.ts
 *
 * PURPOSE:
 * Zustand slice for entity management (ingredients, tools, mascot entities).
 *
 * RESPONSIBILITY:
 * - Mutates entity records in world state.
 * - Handles adding, removing, updating, preparing, and cooking entities.
 */

import type { StateCreator } from 'zustand/vanilla';
import type { Entity } from '../../types/world';
import type { PreparationStyle, CookingMethod } from '../../types/RecipeStep';
import type { WorldStateStore } from '../types';
import { validateContainerRules } from '../../engine/containerRules';
import {
  derivePreparationStatus,
  deriveCookingStatus,
  formatPreparedName,
  formatCookedName,
} from '../../engine/ingredientState';

export interface EntitySlice {
  entities: Record<string, Entity>;
  addEntity: (
    entity: { id: string; name: string; type: Entity['type']; state?: Record<string, unknown> },
    containerId: string
  ) => void;
  removeEntity: (entityId: string) => void;
  updateEntityState: (entityId: string, changes: Record<string, unknown>) => void;
  prepareIngredient: (entityId: string, preparation: PreparationStyle) => void;
  cookIngredient: (entityId: string, cooking: CookingMethod) => void;
  useIngredient: (entityId: string, usedIn?: string) => void;
  revertIngredientUsage: (entityId: string, previousContainerId?: string) => void;
  consumeIngredient: (entityId: string, consumedBy?: string) => void;
}

export const createEntitySlice: StateCreator<
  WorldStateStore,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  EntitySlice
> = (set, get) => ({
  entities: {},

  addEntity: (entity, containerId) => {
    const targetContainer = get().containers[containerId];
    if (!targetContainer) return;

    const currentEntities = targetContainer.entityIds
      .map((id) => get().entities[id])
      .filter((e): e is Entity => Boolean(e));

    const result = validateContainerRules(
      targetContainer,
      entity as Entity,
      currentEntities
    );
    if (!result.allowed) return;

    set(
      (state) => {
        state.entities[entity.id] = entity as Entity;
        state.containers[containerId].entityIds.push(entity.id);
      },
      false,
      'ADD_ENTITY'
    );
  },

  removeEntity: (entityId) => {
    set(
      (state) => {
        delete state.entities[entityId];
        for (const cId in state.containers) {
          state.containers[cId].entityIds = state.containers[cId].entityIds.filter(
            (id) => id !== entityId
          );
        }
      },
      false,
      'REMOVE_ENTITY'
    );
  },

  updateEntityState: (entityId, changes) => {
    set(
      (state) => {
        const targetEntity = state.entities[entityId];
        if (!targetEntity) return;

        targetEntity.state = {
          ...targetEntity.state,
          ...changes,
        };
      },
      false,
      'UPDATE_ENTITY_STATE'
    );
  },

  prepareIngredient: (entityId, preparation) => {
    const targetEntity = get().entities[entityId];
    if (!targetEntity) return;

    const status = derivePreparationStatus(targetEntity, preparation);
    const updatedName = formatPreparedName(targetEntity, preparation);

    set(
      (state) => {
        const entity = state.entities[entityId];
        if (!entity) return;

        entity.name = updatedName;
        entity.state = {
          ...entity.state,
          preparation,
          status,
        };
      },
      false,
      'PREPARE_INGREDIENT'
    );
  },

  cookIngredient: (entityId, cooking) => {
    const targetEntity = get().entities[entityId];
    if (!targetEntity) return;

    const status = deriveCookingStatus(targetEntity, cooking);
    const updatedName = formatCookedName(targetEntity, cooking);

    set(
      (state) => {
        const entity = state.entities[entityId];
        if (!entity) return;

        entity.name = updatedName;
        entity.state = {
          ...entity.state,
          cooking,
          status,
        };
      },
      false,
      'COOK_INGREDIENT'
    );
  },

  useIngredient: (entityId, usedIn) => {
    const state = get();
    const entity = state.entities[entityId];
    if (!entity) return;

    let previousContainerId: string | undefined;
    for (const cId in state.containers) {
      if (state.containers[cId].entityIds.includes(entityId)) {
        previousContainerId = cId;
        break;
      }
    }

    set(
      (draft) => {
        const targetEntity = draft.entities[entityId];
        if (!targetEntity) return;

        // Remove from current container(s)
        for (const cId in draft.containers) {
          draft.containers[cId].entityIds = draft.containers[cId].entityIds.filter(
            (id) => id !== entityId
          );
        }

        // If usedIn matches an existing container ID, add to that container
        if (usedIn && draft.containers[usedIn]) {
          draft.containers[usedIn].entityIds.push(entityId);
        }

        // Mark consumed and update entity state
        targetEntity.state = {
          ...targetEntity.state,
          consumed: true,
          consumedBy: usedIn,
          previousContainerId: previousContainerId || (targetEntity.state?.previousContainerId as string | undefined),
          status: 'consumed',
        };
      },
      false,
      'USE_INGREDIENT'
    );

    // Emit domain event
    get().emitEvent({
      type: 'INGREDIENT_CONSUMED',
      payload: {
        entityId,
        consumedBy: usedIn,
      },
    });
  },

  revertIngredientUsage: (entityId, previousContainerId) => {
    set(
      (draft) => {
        const targetEntity = draft.entities[entityId];
        if (!targetEntity) return;

        const targetContainerId =
          previousContainerId || (targetEntity.state?.previousContainerId as string | undefined);

        // Remove from current containers
        for (const cId in draft.containers) {
          draft.containers[cId].entityIds = draft.containers[cId].entityIds.filter(
            (id) => id !== entityId
          );
        }

        // Restore to previous container if valid
        if (targetContainerId && draft.containers[targetContainerId]) {
          draft.containers[targetContainerId].entityIds.push(entityId);
        }

        // Revert consumed state
        if (targetEntity.state) {
          delete targetEntity.state.consumed;
          delete targetEntity.state.consumedBy;
          delete targetEntity.state.previousContainerId;
          if (targetEntity.state.status === 'consumed') {
            delete targetEntity.state.status;
          }
        }
      },
      false,
      'REVERT_INGREDIENT_USAGE'
    );
  },

  consumeIngredient: (entityId, consumedBy) => {
    get().useIngredient(entityId, consumedBy);
  },
});
</file>

<file path="src/systems/recipeRunner/handlers/mixHandlers.ts">
/**
 * FILE: src/systems/recipeRunner/handlers/mixHandlers.ts
 *
 * PURPOSE:
 * Step handlers for combination steps ('mix', 'beat', 'combine').
 */

import { worldStore } from '../../../store/worldStore';
import { moveTortillaTo, flipTortilla } from '../../mascotActions';
import type { RecipeStep } from '../../../types/RecipeStep';
import type { RecipeRunnerContext } from '../types';

type MixStep = Extract<RecipeStep, { action: 'mix' | 'beat' | 'combine' }>;

export async function handleMixStep(
  ctx: RecipeRunnerContext,
  step: MixStep,
  workstationDefaultContainerId?: string
): Promise<void> {
  const targetContainerId = step.targetContainerId || workstationDefaultContainerId || 'bowl';
  const inputKeys = step.inputs || step.ingredients || [];
  const inputEntityIds: string[] = [];

  // 1. Resolve each input entity ID from RecipeContext and ensure it is moved to target container
  for (const rawInput of inputKeys) {
    const inputEntityId = ctx.getBoundEntityId(rawInput);
    if (!inputEntityId) {
      throw new Error(`[RecipeRunner] Cannot mix: No bound entity found for input "${rawInput}"`);
    }

    const realEntityId = await ctx.ensureEntityInWorkspace(inputEntityId, targetContainerId);
    inputEntityIds.push(realEntityId);
  }

  // Format descriptive speech message for mascot speech bubble and Zustand store state
  const formattedInputs = inputKeys.map((key) => {
    const boundId = ctx.getBoundEntityId(key);
    const entity = boundId ? worldStore.getState().entities[boundId] : undefined;

    const parts: string[] = [];
    if (entity?.state) {
      const cooking = entity.state.cooking as string | undefined;
      if (cooking && cooking !== 'raw') {
        if (cooking === 'fry' || cooking === 'fried' || cooking === 'cooked') {
          parts.push('cooked');
        } else {
          parts.push(cooking);
        }
      }
      const prep = entity.state.preparation as string | undefined;
      if (prep && prep !== 'whole' && prep !== 'raw') {
        parts.push(prep);
      }
    }

    if (parts.length === 0) {
      if (key === 'potatoes') {
        parts.push('cooked', 'sliced');
      } else if (key === 'eggs') {
        parts.push('beaten');
      } else if (key === 'onions') {
        parts.push('cooked', 'diced');
      }
    }

    parts.push(key);
    return parts.join(' ');
  });

  const containerName =
    targetContainerId === 'bowl' || targetContainerId === 'preparation_bowl'
      ? 'preparation bowl'
      : targetContainerId.replace('_', ' ');
  const mixMessage = `Mix ${formattedInputs.join(', ')} in the ${containerName} -> ${step.output || 'mixture'}`;

  worldStore.getState().dispatch({
    type: 'UPDATE_ENTITY_STATE',
    payload: {
      entityId: ctx.mascotId,
      changes: { speechMessage: mixMessage },
    },
  });

  moveTortillaTo(targetContainerId, ctx.mascotId);
  await ctx.wait();
  flipTortilla(ctx.mascotId);
  await ctx.wait();

  // Wait for a moment while mixing before creating the mixture
  await ctx.wait();

  // 2. Create real mixture entity in target container
  const recipeId = ctx.recipeContext.recipeId || 'recipe';
  const mixtureId = `mixture_${recipeId}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  const outputName = step.output || 'Mixture';

  worldStore.getState().dispatch({
    type: 'ADD_ENTITY',
    payload: {
      entity: {
        id: mixtureId,
        name: outputName,
        type: 'ingredient',
        state: {
          preparation: 'mixed',
          cooking: 'raw',
          status: 'mixed',
          components: inputEntityIds,
        },
      },
      containerId: targetContainerId,
    },
  });

  // 3. Use inputs
  for (const inputId of inputEntityIds) {
    worldStore.getState().dispatch({
      type: 'USE_INGREDIENT',
      payload: {
        entityId: inputId,
        usedIn: mixtureId,
      },
    });
  }

  // 4. Bind mixture entity in RecipeContext
  ctx.recipeContext.bindings['mixture'] = mixtureId;
  if (step.output) {
    ctx.recipeContext.bindings[step.output] = mixtureId;
  }
}
</file>

<file path="src/systems/recipeRunner/handlers/moveHandlers.ts">
/**
 * FILE: src/systems/recipeRunner/handlers/moveHandlers.ts
 *
 * PURPOSE:
 * Step handlers for item relocation steps ('move', 'grab', 'drop').
 */

import { worldStore } from '../../../store/worldStore';
import { moveTortillaTo, grabIngredient, dropIngredient } from '../../mascotActions';
import type { RecipeStep } from '../../../types/RecipeStep';
import type { RecipeRunnerContext } from '../types';

type MoveStep = Extract<RecipeStep, { action: 'move' }>;
type GrabStep = Extract<RecipeStep, { action: 'grab' }>;
type DropStep = Extract<RecipeStep, { action: 'drop' }>;

export async function handleMoveStep(
  ctx: RecipeRunnerContext,
  step: MoveStep,
  workstationDefaultContainerId?: string
): Promise<void> {
  const source = step.source || ctx.defaultSourceId;
  const target = step.target || workstationDefaultContainerId || ctx.defaultTargetId;
  const rawKey = step.ingredient || step.target;


  const entityId = ctx.getBoundEntityId(rawKey);

  if (!entityId) {
    return;
  }

  ctx.validateEntity(entityId, 'move');

  const state = worldStore.getState();
  const targetContainer = state.containers[target];


  if (targetContainer && targetContainer.entityIds.includes(entityId)) {
    return; // Skip move if entity is already in target container
  }

  // 1. Move mascot gaze to source container
  moveTortillaTo(source, ctx.mascotId);
  await ctx.wait();

  // 2. Grab ingredient from source container
  grabIngredient(entityId, source, ctx.mascotId);
  await ctx.wait();

  // 3. Move mascot gaze to target container
  moveTortillaTo(target, ctx.mascotId);
  await ctx.wait();

  // 4. Drop ingredient into target container
  dropIngredient(target, undefined, ctx.mascotId);
  await ctx.wait();

  // Check if drop created a copy entity (from immutable storage)
  const newState = worldStore.getState();
  const newTargetContainer = newState.containers[target];
  if (newTargetContainer && !newTargetContainer.entityIds.includes(entityId)) {
    const copiedId = newTargetContainer.entityIds[newTargetContainer.entityIds.length - 1];
    if (copiedId) {
      ctx.updateBindingIfCopied(entityId, copiedId, rawKey);
    }
  }
}

export async function handleGrabStep(
  ctx: RecipeRunnerContext,
  step: GrabStep
): Promise<void> {
  const source = step.source || ctx.defaultSourceId;
  const entityId = ctx.getBoundEntityId(step.ingredient) || step.ingredient;

  if (entityId) {
    ctx.validateEntity(entityId, 'grab');
  }

  moveTortillaTo(source, ctx.mascotId);
  await ctx.wait();

  if (entityId) {
    grabIngredient(entityId, source, ctx.mascotId);
    await ctx.wait();
  }
}

export async function handleDropStep(
  ctx: RecipeRunnerContext,
  step: DropStep,
  workstationDefaultContainerId?: string
): Promise<void> {
  const target = step.target || workstationDefaultContainerId || ctx.defaultTargetId;
  moveTortillaTo(target, ctx.mascotId);
  await ctx.wait();

  dropIngredient(target, step.positionIndex, ctx.mascotId);
  await ctx.wait();
}
</file>

<file path="src/systems/recipeRunner/RecipeRunner.ts">
/**
 * FILE: src/systems/recipeRunner/RecipeRunner.ts
 *
 * PURPOSE:
 * Workstation and tool-driven recipe execution engine (RecipeRunner).
 *
 * RESPONSIBILITY:
 * - Iterates over declarative RecipeSteps sequentially.
 * - Dynamically determines required workstation and tools for each step.
 * - Dispatches appropriate world and mascot actions via step handlers.
 * - Modifies existing entity state for preparation/cooking without destroying/recreating entities.
 * - Preserves data-driven architecture and keeps recipes decoupled from kitchen locations.
 */

import { worldStore } from '../../store/worldStore';
import { getIngredientCatalogId } from '../../engine/containerRules';
import { findWorkstationForStep } from '../../engine/workstations';
import type { Recipe, RecipeRequirementDictItem } from '../../types/Recipe';
import type { RecipeStep } from '../../types/RecipeStep';
import type { Entity } from '../../types/world';
import type { RecipeRunnerOptions, RecipeRunnerContext, RecipeContextData } from './types';
import { handleMoveStep, handleGrabStep, handleDropStep } from './handlers/moveHandlers';
import { handlePrepStep } from './handlers/prepHandlers';
import { handleCookStep, handleFlipStep } from './handlers/cookHandlers';
import { handleMixStep } from './handlers/mixHandlers';
import {
  handleServeStep,
  handleWaitStep,
  handleInstructionStep,
  handleSpeakStep,
  handleCelebrateStep,
} from './handlers/utilityHandlers';

export class RecipeRunner implements RecipeRunnerContext {
  public mascotId: string;
  public defaultSourceId: string;
  public defaultTargetId: string;
  public delayMs: number;
  public currentRecipe?: Recipe;
  public recipeContext: RecipeContextData;

  constructor(options: RecipeRunnerOptions = {}) {
    this.mascotId = options.mascotId || 'chef';
    this.defaultSourceId = options.defaultSourceId || 'despensa';
    this.defaultTargetId = options.defaultTargetId || 'board';
    this.delayMs = options.delayMs ?? 600;
    this.recipeContext = {
      recipeId: '',
      bindings: {},
    };
  }

  public async wait(ms?: number): Promise<void> {
    const duration = ms ?? this.delayMs;
    if (duration <= 0) return;
    await new Promise((resolve) => setTimeout(resolve, duration));
  }

  public bindRecipeContext(recipe: Recipe): void {
    this.currentRecipe = recipe;
    this.recipeContext = {
      recipeId: recipe.id,
      bindings: {},
    };

    const boundIds = new Set<string>();

    const findOrCreateAvailableEntity = (
      ingredientCatalogId: string,
      aliasKey?: string
    ): string => {
      const state = worldStore.getState();
      const allEntities = Object.values(state.entities);

      // 1. Check for unconsumed, unbound entity in active workspace containers
      const activeWorkspaceContainerIds = Object.values(state.containers)
        .filter((c) => c.type !== 'storage' && c.id !== 'despensa')
        .map((c) => c.id);

      for (const cId of activeWorkspaceContainerIds) {
        const container = state.containers[cId];
        if (container) {
          const workspaceCandidate = container.entityIds
            .map((id) => state.entities[id])
            .find((e) => {
              if (!e || e.type !== 'ingredient' || e.state?.consumed || boundIds.has(e.id)) {
                return false;
              }
              const catId = getIngredientCatalogId(e);
              return (
                catId === ingredientCatalogId ||
                e.ingredientId === ingredientCatalogId ||
                e.id === ingredientCatalogId ||
                (aliasKey && e.id === aliasKey)
              );
            });
          if (workspaceCandidate) {
            boundIds.add(workspaceCandidate.id);
            return workspaceCandidate.id;
          }
        }
      }

      // 2. Check for unconsumed, unbound entity anywhere in world
      const unboundCandidate = allEntities.find((e) => {
        if (!e || e.type !== 'ingredient' || e.state?.consumed || boundIds.has(e.id)) {
          return false;
        }
        const catId = getIngredientCatalogId(e);
        return (
          catId === ingredientCatalogId ||
          e.ingredientId === ingredientCatalogId ||
          e.id === ingredientCatalogId ||
          (aliasKey && e.id === aliasKey)
        );
      });

      if (unboundCandidate) {
        boundIds.add(unboundCandidate.id);
        return unboundCandidate.id;
      }

      // 3. If no unbound entity exists, check for template entity in immutable storage (e.g. despensa)
      const immutableCandidate = allEntities.find((e) => {
        if (!e || e.type !== 'ingredient' || e.state?.consumed) return false;
        const catId = getIngredientCatalogId(e);
        return (
          catId === ingredientCatalogId ||
          e.ingredientId === ingredientCatalogId ||
          e.id === ingredientCatalogId ||
          (aliasKey && e.id === aliasKey)
        );
      });

      if (immutableCandidate) {
        return immutableCandidate.id;
      }

      // 4. Fallback: spawn new ingredient entity in despensa or board
      const newEntityId = `${ingredientCatalogId}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      const newEntity: Entity = {
        id: newEntityId,
        name: ingredientCatalogId.charAt(0).toUpperCase() + ingredientCatalogId.slice(1),
        type: 'ingredient',
        ingredientId: ingredientCatalogId,
        state: { preparation: 'whole', cooking: 'raw' },
      };

      const targetContainerId = state.containers[this.defaultSourceId] ? this.defaultSourceId : 'board';
      worldStore.getState().dispatch({
        type: 'ADD_ENTITY',
        payload: {
          entity: newEntity,
          containerId: targetContainerId,
        },
      });

      boundIds.add(newEntityId);
      return newEntityId;
    };

    const reqs = recipe.requirements || (recipe as unknown as { ingredients?: unknown }).ingredients;

    if (Array.isArray(reqs)) {
      for (const item of reqs) {
        const rawItem = item as { entityId?: string; ingredientId?: string; id?: string };
        const entityIdKey = rawItem.entityId || rawItem.ingredientId || '';
        const entityId = findOrCreateAvailableEntity(entityIdKey, rawItem.id);
        this.recipeContext.bindings[entityIdKey] = entityId;
        if (rawItem.id) {
          this.recipeContext.bindings[rawItem.id] = entityId;
        }
      }
    } else if (reqs && typeof reqs === 'object') {
      for (const [key, item] of Object.entries(
        reqs as Record<string, RecipeRequirementDictItem>
      )) {
        const rawItem = item as { entityId?: string; ingredientId?: string };
        const entityIdKey = rawItem.entityId || rawItem.ingredientId || key;
        const entityId = findOrCreateAvailableEntity(entityIdKey, key);
        this.recipeContext.bindings[key] = entityId;
        this.recipeContext.bindings[entityIdKey] = entityId;
      }
    }

    this.bindStepsContext(recipe.steps, boundIds);
  }

  private bindStepsContext(steps: RecipeStep[], boundIds: Set<string>): void {
    const state = worldStore.getState();

    for (const step of steps) {
      if (step.action === 'mix' || step.action === 'beat' || step.action === 'combine') {
        const inputs = step.inputs || step.ingredients || [];
        for (const inputKey of inputs) {
          if (!this.recipeContext.bindings[inputKey]) {
            const catId = this.resolveIngredientId(inputKey) || inputKey;
            const candidate = Object.values(state.entities).find(
              (e) =>
                e &&
                e.type === 'ingredient' &&
                !e.state?.consumed &&
                !boundIds.has(e.id) &&
                (getIngredientCatalogId(e) === catId || e.ingredientId === catId || e.id === inputKey)
            );
            if (candidate) {
              this.recipeContext.bindings[inputKey] = candidate.id;
              this.recipeContext.bindings[catId] = candidate.id;
              boundIds.add(candidate.id);
            }
          }
        }
      } else if ('ingredient' in step || 'target' in step) {
        const rawKey =
          ('ingredient' in step ? step.ingredient : undefined) ||
          ('target' in step ? step.target : undefined);
        if (rawKey && rawKey !== 'mixture' && !this.recipeContext.bindings[rawKey]) {
          const catId = this.resolveIngredientId(rawKey) || rawKey;
          const candidate = Object.values(state.entities).find(
            (e) =>
              e &&
              e.type === 'ingredient' &&
              !e.state?.consumed &&
              !boundIds.has(e.id) &&
              (getIngredientCatalogId(e) === catId || e.ingredientId === catId || e.id === rawKey)
          );
          if (candidate) {
            this.recipeContext.bindings[rawKey] = candidate.id;
            this.recipeContext.bindings[catId] = candidate.id;
            boundIds.add(candidate.id);
          }
        }
      }
    }
  }

  public getBoundEntityId(targetOrKey?: string): string | undefined {
    if (!targetOrKey) return undefined;
    if (this.recipeContext.bindings[targetOrKey]) {
      return this.recipeContext.bindings[targetOrKey];
    }
    const resolvedCatId = this.resolveIngredientId(targetOrKey);
    if (resolvedCatId && this.recipeContext.bindings[resolvedCatId]) {
      return this.recipeContext.bindings[resolvedCatId];
    }
    const state = worldStore.getState();
    if (state.entities[targetOrKey]) {
      return targetOrKey;
    }
    return undefined;
  }

  public validateEntity(entityId: string, stepAction: string = 'step'): Entity {
    const state = worldStore.getState();
    const entity = state.entities[entityId];
    if (!entity) {
      throw new Error(
        `[RecipeRunner] Validation failed for ${stepAction}: Entity "${entityId}" does not exist in world state.`
      );
    }
    if (entity.state?.consumed) {
      throw new Error(
        `[RecipeRunner] Validation failed for ${stepAction}: Entity "${entityId}" (${entity.name}) has already been consumed.`
      );
    }
    return entity;
  }

  public updateBindingIfCopied(
    oldEntityId: string,
    newEntityId: string,
    specificKey?: string
  ): void {
    if (oldEntityId === newEntityId) return;
    if (specificKey && this.recipeContext.bindings[specificKey] === oldEntityId) {
      this.recipeContext.bindings[specificKey] = newEntityId;
    } else {
      for (const key in this.recipeContext.bindings) {
        if (this.recipeContext.bindings[key] === oldEntityId) {
          this.recipeContext.bindings[key] = newEntityId;
        }
      }
    }
  }

  public async ensureEntityInWorkspace(
    entityId: string,
    targetContainerId: string = this.defaultTargetId
  ): Promise<string> {
    const state = worldStore.getState();
    this.validateEntity(entityId, 'ensureEntityInWorkspace');

    const targetContainer = state.containers[targetContainerId];
    if (targetContainer && targetContainer.entityIds.includes(entityId)) {
      return entityId;
    }

    const mascot = state.entities[this.mascotId];
    if (mascot?.state?.holdingEntityId === entityId) {
      return entityId;
    }

    let currentContainerId = this.defaultSourceId;
    for (const container of Object.values(state.containers)) {
      if (container.entityIds.includes(entityId)) {
        currentContainerId = container.id;
        break;
      }
    }

    await handleMoveStep(
      this,
      {
        action: 'move',
        ingredient: entityId,
        source: currentContainerId,
        target: targetContainerId,
      },
      targetContainerId
    );

    const updatedState = worldStore.getState();
    const updatedTargetContainer = updatedState.containers[targetContainerId];
    if (updatedTargetContainer) {
      if (updatedTargetContainer.entityIds.includes(entityId)) {
        return entityId;
      }
      const copyId = updatedTargetContainer.entityIds[updatedTargetContainer.entityIds.length - 1];
      if (copyId) {
        this.updateBindingIfCopied(entityId, copyId);
        return copyId;
      }
    }
    return entityId;
  }

  public resolveIngredientId(targetOrKey?: string): string | undefined {
    if (!targetOrKey) return undefined;
    const reqs = this.currentRecipe?.requirements || (this.currentRecipe as unknown as { ingredients?: unknown })?.ingredients;
    if (reqs && !Array.isArray(reqs)) {
      const dict = reqs as Record<string, { entityId?: string; ingredientId?: string }>;
      if (dict[targetOrKey]) {
        return dict[targetOrKey].entityId || dict[targetOrKey].ingredientId;
      }
      const match = Object.values(dict).find(
        (item) => (item.entityId || item.ingredientId) === targetOrKey
      );
      if (match) {
        return match.entityId || match.ingredientId;
      }
    }
    return targetOrKey;
  }

  public async ensureIngredientInWorkspace(
    ingredientCatalogId: string,
    targetContainerId: string = this.defaultTargetId
  ): Promise<string | undefined> {
    const boundId = this.getBoundEntityId(ingredientCatalogId);
    if (boundId) {
      return this.ensureEntityInWorkspace(boundId, targetContainerId);
    }
    return undefined;
  }

  public async runRecipe(recipe: Recipe): Promise<void> {
    this.bindRecipeContext(recipe);
    await this.runSteps(recipe.steps);
  }

  public async runSteps(steps: RecipeStep[]): Promise<void> {
    if (!this.recipeContext.recipeId) {
      this.recipeContext.recipeId = 'steps_run';
      this.bindStepsContext(steps, new Set<string>());
    }
    for (const step of steps) {
      await this.executeStep(step);
    }
  }

  public async executeStep(step: RecipeStep): Promise<void> {
    const workstation = findWorkstationForStep(step);

    switch (step.action) {
      case 'move':
        return handleMoveStep(this, step, workstation.defaultContainerId);
      case 'grab':
        return handleGrabStep(this, step);
      case 'drop':
        return handleDropStep(this, step, workstation.defaultContainerId);

      case 'cut':
      case 'prepare':
      case 'peel':
      case 'wash':
      case 'rinse':
      case 'drain':
        return handlePrepStep(this, step, workstation.defaultContainerId);

      case 'cook':
        return handleCookStep(this, step, workstation.defaultContainerId);
      case 'flip':
        return handleFlipStep(this, step);

      case 'mix':
      case 'beat':
      case 'combine':
        return handleMixStep(this, step, workstation.defaultContainerId);

      case 'serve':
        return handleServeStep(this, step, workstation.defaultContainerId);

      case 'wait':
        return handleWaitStep(this, step);
      case 'instruction':
        return handleInstructionStep(this, step);
      case 'speak':
        return handleSpeakStep(this, step);
      case 'celebrate':
        return handleCelebrateStep(this, step);
    }
  }
}
</file>

<file path="src/systems/movement.ts">
/**
 * FILE: movement.ts
 *
 * PURPOSE:
 * Handles entity movement calculations.
 *
 * RESPONSIBILITY:
 * - Calculates position changes.
 * - Provides movement behavior.
 */

import { worldStore } from '../store/worldStore';

/**
 * Requests that an entity be moved to another container.
 * The reducer determines the source container automatically.
 */
export function moveEntity(
  entityId: string,
  targetContainerId: string,
  positionIndex?: number
): void {
  worldStore.getState().dispatch({
    type: 'MOVE_ENTITY',
    payload: {
      entityId,
      targetContainerId,
      positionIndex,
    },
  });
}
</file>

<file path="src/systems/recipeRunner.ts">
/**
 * FILE: src/systems/recipeRunner.ts
 *
 * PURPOSE:
 * Public entry point for RecipeRunner module.
 * Re-exports RecipeRunner class and related options/types.
 */

export { RecipeRunner } from './recipeRunner/RecipeRunner';
export type { RecipeRunnerOptions, RecipeRunnerContext } from './recipeRunner/types';
</file>

<file path="src/index.scss">
/**
 * FILE: src/index.scss
 *
 * PURPOSE:
 * Global stylesheet for Tortilla World.
 * Establishes warm Spanish kitchen simulation theme, global CSS variables, typography, and workstation layouts.
 */

@use 'sass:color';
@use './styles/variables' as *;
@use './styles/mixins' as *;

:root {
  --text: #{$dark-brown};
  --text-h: #{$dark-brown};
  --text-muted: #{$wood-muted};
  --bg: #{$warm-cream};
  --card-bg: #{$warm-surface};
  --border: #{$warm-border};
  --code-bg: #{$warm-beige};

  // Primary palette tokens
  --primary: #{$tortilla-yellow};
  --primary-hover: #{$tortilla-yellow-hover};
  --secondary: #{$olive-green};
  --secondary-hover: #{$olive-green-hover};
  --accent: #{$terracotta};
  --accent-hover: #{$terracotta-hover};

  --shadow: #{$shadow-ceramic};
  --shadow-hover: #{$shadow-ceramic-hover};

  --font-sans: #{$font-family};
  --font-mono: #{$font-mono};

  font-family: var(--font-sans);
  color-scheme: light;
  color: var(--text);
  background-color: var(--bg);
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--bg);
  color: var(--text);
  background-image: radial-gradient(#{$warm-border} 0.75px, transparent 0.75px);
  background-size: 20px 20px;
  min-height: 100vh;
}

#root {
  max-width: 1240px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  min-height: 100vh;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-sans);
  color: var(--text-h);
  font-weight: 700;
  line-height: 1.25;
}

h1 {
  font-size: 1.85rem;
  letter-spacing: -0.02em;
}

p {
  line-height: 1.5;
}

// === SCENE GRID LAYOUT & WORKSTATIONS ===
.scene-container {
  margin-top: 20px;
  width: 100%;
}

.scene-workspace {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  width: 100%;
  margin-top: 16px;

  @media (max-width: 860px) {
    flex-direction: column;
  }
}

.scene {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
  width: 100%;
  flex: 1;
  box-sizing: border-box;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

// === WORKSTATION CONTAINER SPECIFIC THEMES ===
.ingredient-list {
  @include ceramic-card($warm-surface, $warm-border);
  padding: 16px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  position: relative;

  &.drag-over {
    border-color: $tortilla-yellow-border !important;
    background-color: $tortilla-yellow-light !important;
    box-shadow: 0 0 0 3px rgba(232, 168, 56, 0.25) !important;
  }

  // Workstation header
  .workstation-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 2px dashed color.mix($dark-brown, white, 15%);

    h3 {
      font-size: 1rem;
      margin: 0;
      color: $dark-brown;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .workstation-type-badge {
      font-size: 0.72rem;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: $radius-sm;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
  }

  // Pantry Storage Theme
  &.workstation-pantry, &.workstation-despensa {
    background: $pantry-bg;
    border-color: $pantry-border;
    .workstation-type-badge {
      background: color.mix($pantry-accent, white, 15%);
      color: $pantry-accent;
      border: 1px solid color.mix($pantry-accent, white, 30%);
    }
  }

  // Washing Station Theme (Sink)
  &.workstation-sink, &.workstation-washing_station {
    background: $washing-bg;
    border-color: $washing-border;
    .workstation-type-badge {
      background: color.mix($washing-accent, white, 15%);
      color: $washing-accent;
      border: 1px solid color.mix($washing-accent, white, 30%);
    }
  }

  // Cutting Station Theme (Board)
  &.workstation-board, &.workstation-cutting_station {
    background: $cutting-bg;
    border-color: $cutting-border;
    .workstation-type-badge {
      background: color.mix($cutting-accent, white, 15%);
      color: $cutting-accent;
      border: 1px solid color.mix($cutting-accent, white, 30%);
    }
  }

  // Preparation Station Theme (Bowl)
  &.workstation-bowl, &.workstation-preparation_station {
    background: $mixing-bg;
    border-color: $mixing-border;
    .workstation-type-badge {
      background: color.mix($mixing-accent, white, 15%);
      color: $mixing-accent;
      border: 1px solid color.mix($mixing-accent, white, 30%);
    }
  }

  // Cooking Station Theme (Pan)
  &.workstation-pan, &.workstation-cooking_station {
    background: $cooking-bg;
    border-color: $cooking-border;
    .workstation-type-badge {
      background: color.mix($cooking-accent, white, 15%);
      color: $cooking-accent;
      border: 1px solid color.mix($cooking-accent, white, 30%);
    }
  }

  // Serving Station Theme (Plate)
  &.workstation-plate, &.workstation-serving_station {
    background: $serving-bg;
    border-color: $serving-border;
    .workstation-type-badge {
      background: color.mix($serving-accent, white, 15%);
      color: $serving-accent;
      border: 1px solid color.mix($serving-accent, white, 30%);
    }
  }

  .items-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex-grow: 1;
  }

  .empty-hint {
    font-size: 0.82rem;
    color: $wood-muted;
    font-style: italic;
    margin: auto;
    text-align: center;
    padding: 12px 0;
    opacity: 0.7;
  }
}

// === INGREDIENT LIST ITEM & STATE STYLES ===
.ingredient-list-item {
  background: #ffffff;
  border: 1px solid $warm-border;
  border-radius: $radius-md;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  font-size: 0.92rem;
  color: $dark-brown;
  box-shadow: 0 2px 6px rgba(44, 26, 20, 0.04);
  user-select: none;
  touch-action: none;
  transition: all 0.18s ease;

  &:hover {
    border-color: color.mix($tortilla-yellow, $warm-border, 50%);
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(44, 26, 20, 0.08);
  }

  &.dragging {
    box-shadow: $shadow-floating;
    opacity: 0.85;
    transform: scale(1.02);
  }

  // === INGREDIENT STATE COLOR BADGES ===
  .ingredient-state-badge {
    font-size: 0.72rem;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: $radius-sm;
    margin-left: 8px;
    white-space: nowrap;

    &.state-raw {
      background: $state-raw-bg;
      border: 1px solid $state-raw-border;
      color: $state-raw-text;
    }

    &.state-prepared {
      background: $state-prep-bg;
      border: 1px solid $state-prep-border;
      color: $state-prep-text;
    }

    &.state-cooking {
      background: $state-cook-bg;
      border: 1px solid $state-cook-border;
      color: $state-cook-text;
    }

    &.state-finished {
      background: $state-finished-bg;
      border: 1px solid $state-finished-border;
      color: $state-finished-text;
    }
  }
}
</file>

<file path="docs/systems.md">
# Systems

## Overview

Systems contain the behaviour of Tortilla World.

Components display the world.
Systems modify the world.

A system receives actions, validates them, and updates the world state.

The general flow is:

```text
Input
  |
  v
Action
  |
  v
System
  |
  v
Validation
  |
  v
World State Update
  |
  v
UI Update
```

---

# System Architecture

Tortilla World is based on independent systems.

Current and planned systems:

```text
Systems

├── Interaction System
├── Movement System
├── Container System
├── Mascot System
├── Animation System
├── Cooking System
└── AI System
```

Each system has a clear responsibility.

---

# Interaction System

## Responsibility

The Interaction System converts external events into world actions.

External events:

* mouse clicks
* drag and drop
* AI requests
* future keyboard/gamepad input

The Interaction System does not modify the world directly.

---

## Example

User drags potato into pan.

The Interaction System creates:

```ts
{
  type:"MOVE_ENTITY",
  entityId:"potato",
  targetContainer:"pan"
}
```

The action is passed to the Movement System.

---

# Movement System

## Responsibility

The Movement System controls ownership changes.

It handles:

* moving entities
* validating source ownership
* validating destination rules
* applying transfer behaviour

---

## Move Flow

```text
Move Request

      |
      v

Find Entity

      |
      v

Find Current Container

      |
      v

Find Target Container

      |
      v

Validate Move

      |
      v

Apply Transfer Rule

      |
      v

Update Ownership

```

---

# Move Validation

Before moving an entity, the system checks:

## Entity existence

Does the entity exist?

Example:

```text
potato
```

must exist in the world.

---

## Source ownership

Does the source container own the entity?

Example:

Valid:

```text
Kitchen owns potato
```

Invalid:

```text
Pan owns potato
```

when moving from Kitchen.

---

## Destination capability

Can the target container accept this entity?

Example:

A pan may accept:

```text
ingredient
```

but reject:

```text
container
```

---

## Duplicate rules

The container checks uniqueness.

Example:

Valid:

```text
Recipe

potato
egg
```

Invalid:

```text
Recipe

potato
potato
```

---

# Transfer Rules

A move is not always the same operation.

Containers define transfer behaviour.

---

# Static Container To Dynamic Container

Example:

```text
Kitchen
 |
 potato


Recipe
```

Move potato:

Result:

```text
Kitchen
 |
 potato


Recipe
 |
 potato
```

The destination receives the ingredient.

The source remains unchanged.

This represents a world resource.

---

# Dynamic Container To Dynamic Container

Example:

```text
Recipe
 |
 potato


Pan
```

Move potato:

Result:

```text
Recipe


Pan
 |
 potato
```

Ownership transfers.

---

# Dynamic Container To Static Container

Example:

```text
Recipe
 |
 potato


Kitchen
```

Move potato back.

Result:

```text
Recipe


Kitchen
 |
 potato
```

The dynamic container loses ownership.

The static container provides the original world resource.

---

# Container System

## Responsibility

The Container System manages container rules.

It answers questions:

* Can this entity be added?
* Can this entity be removed?
* Are duplicates allowed?
* Is the container full?
* Does ordering matter?

---

## Example API

```ts
canAccept(
  container,
  entity
)
```

returns:

```ts
true
```

or:

```ts
false
```

---

# Action Queue

## Responsibility

All world changes should pass through an action queue.

Example:

```text
AI
 |
User
 |
System
 |
Action Queue
 |
World Update
```

---

## Example Action

```ts
{
 type:"MOVE_ENTITY",

 entityId:"egg",

 source:"kitchen",

 target:"recipe"
}
```

---

## Benefits

Action queues provide:

* debugging
* replay
* logging
* AI control
* animations
* delayed actions

---

# Animation System

## Responsibility

The Animation System reacts to world changes.

It does not decide what happens.

Example:

Movement System:

```text
Potato moved to Pan
```

Animation System:

```text
Play potato movement animation
```

---

## Separation

Bad:

```text
Drag component:
move object
animate object
change state
```

Good:

```text
Drag component:
create action


Movement System:
change state


Animation System:
animate change
```

---

# Cooking System

## Responsibility

Future system for transforming entities.

Examples:

```text
Potato
+
Oil
+
Heat

    |
    v

Fried Potato
```

---

The cooking system changes entity state.

Example:

Before:

```ts
{
 type:"ingredient",
 state:"raw"
}
```

After:

```ts
{
 type:"ingredient",
 state:"cooked"
}
```

---

# AI System

## Responsibility

The AI System creates actions.

The AI does not directly manipulate Zustand state.

---

Example:

AI decides:

```text
Prepare tortilla
```

Creates:

```ts
[
 {
  type:"MOVE_ENTITY",
  entityId:"potato",
  target:"pan"
 },

 {
  type:"ADD_HEAT",
  target:"pan"
 }
]
```

The normal systems execute them.

---

# System Communication

Systems communicate through actions and world state.

Example:

```text
Interaction System

        |
        v

Move Action

        |
        v

Movement System

        |
        v

World Store

        |
        v

Animation System

```

---

# Zustand Responsibility

Zustand is the storage layer.

It stores:

* entities
* containers
* relationships
* world state

It should not contain UI logic.

---

Example:

Good:

```ts
moveEntity(
 entityId,
 from,
 to
)
```

Bad:

```ts
onDropIngredient(
 mouseEvent
)
```

---

# Testing Strategy

Systems should be testable without React.

Example:

```ts
moveEntity(
 "potato",
 "kitchen",
 "pan"
)
```

Expected:

```text
Kitchen:
empty

Pan:
potato
```

---

# Future Systems

Possible additions:

## Time System

Controls:

* cooking duration
* day/night
* events

---

## Physics System

Controls:

* collisions
* falling objects
* movement

---

## Economy System

Controls:

* ingredients cost
* customers
* money

---

## Character System

Controls:

* NPCs
* player actions
* behaviours

---

## Mascot System & Recipe System

### Mascot System
Controls:

* `MASCOT_FLIP`: Flips Tortilla mascot in place.
* `MASCOT_MOVE`: Moves gaze/focus of Tortilla to target container.
* `MASCOT_GRAB`: Commands Tortilla to grab ingredient entity from a container.
* `MASCOT_DROP`: Commands Tortilla to drop held ingredient into target container obeying rules.

Dispatch helpers and automated action sequences (e.g. `runFollowRecipeScript`) are located in `src/systems/mascotActions.ts` for AI agent, console, or UI integration.

React components (`Mascot.tsx`) translate pure target container state into physical Framer Motion spring translations across the DOM viewport without touching store logic.

---

### Recipe System & RecipeRunner

The Recipe System executes declarative, step-based recipe state machines via `RecipeRunner` (`src/systems/recipeRunner.ts` / `src/systems/recipeRunner/`).

#### Architecture:
* **Declarative Data**: Recipes (`RecipeStep[]`) define *what* needs to happen (e.g. `move`, `grab`, `drop`, `cut`, `cook`, `mix`, `wait`, `flip`, `speak`, `celebrate`) without referencing specific kitchen containers or locations.
* **Modular Handler Architecture**: `RecipeRunner` delegates step execution to focused step handlers (`src/systems/recipeRunner/handlers/`):
  - `moveHandlers.ts`: Relocation steps (`move`, `grab`, `drop`).
  - `prepHandlers.ts`: Preparation steps (`cut`, `prepare`, `peel`, `wash`, `rinse`, `drain`).
  - `cookHandlers.ts`: Thermal & flip steps (`cook`, `flip`).
  - `mixHandlers.ts`: Combination steps (`mix`, `beat`, `combine`).
  - `utilityHandlers.ts`: Narrative & completion steps (`serve`, `wait`, `instruction`, `speak`, `celebrate`).
* **Workstation & Tool Resolution**: `RecipeRunner` dynamically queries the Workstation engine (`src/engine/workstations.ts`) to determine the required workstation (`pantry`, `washing_station`, `cutting_station`, `preparation_station`, `cooking_station`, `serving_station`) and tools (`knife`, `peeler`, `whisk`, `fork`, `spatula`, etc.) for each step.
* **Generic Execution**: `RecipeRunner` iterates over recipe steps and dispatches appropriate world/mascot actions.
* **Entity Identity Preservation**: Ingredient state mutations (such as preparation: `whole` ➔ `diced` or cooking: `raw` ➔ `fried`) modify the target entity's `state` via `PREPARE_INGREDIENT` or `COOK_INGREDIENT` without creating or destroying entities.

---

# Final Principle

The rule of Tortilla World:

```text
Components show the world.

Systems change the world.

Containers define the rules.

Actions describe intentions.

The Store remembers the result.
```
</file>

<file path="src/store/defaults.ts">
/**
 * FILE: defaults.ts
 *
 * PURPOSE:
 * Initial seed data for world state.
 *
 * RESPONSIBILITY:
 * - Provides default entity definitions (mascot, ingredients, tools).
 * - Provides default container definitions (despensa, sink, board, bowl, burner, plate).
 */

import type { Container, Entity } from '../types/world';
import type { GazeTarget } from '../systems/gaze';
import { ingredients as catalogIngredients } from '../data/catalog/ingredients';
import { catalogTools } from '../data/catalog/tools';

export const defaultEntities: Record<string, Entity> = {
  chef: {
    id: 'chef',
    name: 'Chef Tortilla 🍳',
    type: 'mascot',
    state: { gazingAt: { type: 'entity', entityId: 'despensa' } satisfies GazeTarget },
  },
  ...catalogIngredients.reduce((acc, item) => {
    acc[item.id] = {
      id: item.id,
      ingredientId: item.id,
      name: `${item.icon} ${item.name}`,
      type: 'ingredient',
      state: {},
    };
    return acc;
  }, {} as Record<string, Entity>),
  ...catalogTools.reduce((acc, item) => {
    acc[item.id] = {
      id: item.id,
      name: `${item.icon} ${item.name}`,
      type: 'tool',
      state: {},
    };
    return acc;
  }, {} as Record<string, Entity>),
};

export const defaultContainers: Record<string, Container> = {
  despensa: {
    id: 'despensa',
    name: 'Despensa (All Ingredients - Immutable Catalog)',
    type: 'storage',
    entityIds: [...catalogIngredients.map((i) => i.id), ...catalogTools.map((t) => t.id)],
    rules: {
      maxCapacity: 30,
      allowedTypes: ['ingredient', 'tool'],
      consumesOnDrag: false,
      isImmutable: true,
    },
  },
  sink: {
    id: 'sink',
    name: 'Fregadero (Sink)',
    type: 'sink',
    entityIds: [],
    rules: { maxCapacity: 10, allowedTypes: ['ingredient', 'tool'] },
  },
  board: {
    id: 'board',
    name: 'Tabla (Cutting Board)',
    type: 'board',
    entityIds: [],
    rules: { maxCapacity: 10, allowedTypes: ['ingredient', 'tool'] },
  },
  bowl: {
    id: 'bowl',
    name: 'Bol (Preparation Bowl)',
    type: 'bowl',
    entityIds: [],
    rules: { maxCapacity: 10, allowedTypes: ['ingredient', 'tool'] },
  },
  burner1: {
    id: 'burner1',
    name: 'Fuego 1',
    type: 'burner',
    entityIds: [],
    rules: { maxCapacity: 5, allowedTypes: ['ingredient', 'tool'] },
    isOn: false,
  },
  burner2: {
    id: 'burner2',
    name: 'Fuego 2',
    type: 'burner',
    entityIds: [],
    isOn: true,
    rules: { maxCapacity: 5, allowedTypes: ['ingredient', 'tool'] },
  },
  plate: {
    id: 'plate',
    name: 'Plato (Plate)',
    type: 'plate',
    entityIds: [],
    rules: { maxCapacity: 5, allowedTypes: ['ingredient', 'tool'] },
  },
};
</file>

<file path="src/store/worldStore.test.ts">
/**
 * FILE: worldStore.test.ts
 *
 * PURPOSE:
 * Unit tests for central world store and container rule enforcement.
 *
 * RESPONSIBILITY:
 * - Validates state transitions, move/add entity actions, and rule checks.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { worldStore } from './worldStore';
import { clearActionLog, getActionLog } from './middleware/actionLog';

function seed() {
  worldStore.setState({
    entities: {
      potato: { id: 'potato', name: 'Potato', type: 'ingredient' },
      onion: { id: 'onion', name: 'Onion', type: 'ingredient' },
      knife: { id: 'knife', name: 'Knife', type: 'tool' },
      chef: { id: 'chef', name: 'Chef', type: 'mascot' },
    },
    containers: {
      kitchen: {
        id: 'kitchen',
        name: 'Kitchen',
        type: 'storage',
        entityIds: ['potato', 'onion', 'knife'],
      },
      burner1: {
        id: 'burner1',
        name: 'burner1',
        type: 'burner',
        entityIds: [],
        rules: { maxCapacity: 1 },
      },
      board: {
        id: 'board',
        name: 'Cutting Board',
        type: 'board',
        entityIds: [],
        rules: { allowedTypes: ['ingredient'] },
      },
      recipe: {
        id: 'recipe',
        name: 'Recipe',
        type: 'plate',
        entityIds: [],
        rules: { allowedTypes: ['ingredient'], uniqueTypesOnly: true },
      },
    },
  });
}

describe('worldStore container rule enforcement', () => {
  beforeEach(() => {
    seed();
    clearActionLog();
  });

  it('allows a move that satisfies the target container rules', () => {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato', targetContainerId: 'burner1' },
    });

    const state = worldStore.getState();
    expect(state.containers.burner1.entityIds).toEqual(['potato']);
    expect(state.containers.kitchen.entityIds).not.toContain('potato');
  });

  it('blocks a move once the target container is at capacity', () => {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato', targetContainerId: 'burner1' },
    });
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'onion', targetContainerId: 'burner1' },
    });

    const state = worldStore.getState();
    expect(state.containers.burner1.entityIds).toEqual(['potato']);
    expect(state.containers.kitchen.entityIds).toContain('onion');
  });

  it('blocks a move that violates allowedTypes', () => {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'knife', targetContainerId: 'board' },
    });

    // knife is a tool; board only allows ingredients
    const state = worldStore.getState();
    expect(state.containers.board.entityIds).toEqual([]);
    expect(state.containers.kitchen.entityIds).toContain('knife');
  });

  it('blocks a move that would duplicate a type in a uniqueTypesOnly container', () => {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato', targetContainerId: 'recipe' },
    });
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'onion', targetContainerId: 'recipe' },
    });

    // both are 'ingredient' type; uniqueTypesOnly blocks the second
    const state = worldStore.getState();
    expect(state.containers.recipe.entityIds).toEqual(['potato']);
    expect(state.containers.kitchen.entityIds).toContain('onion');
  });

  it('never re-validates a same-container reorder', () => {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato', targetContainerId: 'kitchen', positionIndex: 0 },
    });

    // would fail uniqueTypesOnly-style self-comparison if the entity
    // weren't excluded from its own container's current entities
    const state = worldStore.getState();
    expect(state.containers.kitchen.entityIds[0]).toBe('potato');
  });

  it('is a no-op when the entity does not exist', () => {
    const before = worldStore.getState().containers.burner1.entityIds;
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'ghost', targetContainerId: 'burner1' },
    });
    expect(worldStore.getState().containers.burner1.entityIds).toEqual(before);
  });

  it('enforces the same rules on ADD_ENTITY', () => {
    worldStore.getState().dispatch({
      type: 'ADD_ENTITY',
      payload: {
        entity: { id: 'spoon', name: 'Spoon', type: 'tool' },
        containerId: 'board',
      },
    });

    const state = worldStore.getState();
    expect(state.containers.board.entityIds).toEqual([]);
    expect(state.entities.spoon).toBeUndefined();
  });

  it('logs a labelled entry into the action log for each dispatch', () => {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato', targetContainerId: 'burner1' },
    });

    const log = getActionLog();
    expect(log).toHaveLength(1);
    expect(log[0].action).toBe('MOVE_ENTITY');
    expect(typeof log[0].timestamp).toBe('number');
  });

  it('keeps source entity and creates copy in target when moving from an immutable container', () => {
    worldStore.setState({
      entities: {
        potato: { id: 'potato', name: 'Potato', type: 'ingredient' },
      },
      containers: {
        pantry: {
          id: 'pantry',
          name: 'Immutable Pantry',
          type: 'storage',
          entityIds: ['potato'],
          rules: { isImmutable: true },
        },
        burner1: {
          id: 'burner1',
          name: 'burner1',
          type: 'burner',
          entityIds: [],
        },
      },
    });

    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato', targetContainerId: 'burner1' },
    });

    const state = worldStore.getState();
    // Source container retains original entity
    expect(state.containers.pantry.entityIds).toEqual(['potato']);
    // Target container gets a copy instance
    expect(state.containers.burner1.entityIds.length).toBe(1);
    const copyId = state.containers.burner1.entityIds[0];
    expect(copyId).not.toBe('potato');
    expect(state.entities[copyId].name).toBe('Potato');
  });

  it('rejects adding a duplicate ingredient to a container according to Rule 6', () => {
    worldStore.setState({
      entities: {
        potato: { id: 'potato', ingredientId: 'potato', name: 'Potato', type: 'ingredient' },
        potato_copy: { id: 'potato_copy', ingredientId: 'potato', name: 'Potato Copy', type: 'ingredient' },
      },
      containers: {
        pantry: {
          id: 'pantry',
          name: 'Pantry',
          type: 'storage',
          entityIds: ['potato_copy'],
          rules: { isImmutable: true },
        },
        burner1: {
          id: 'burner1',
          name: 'burner1',
          type: 'burner',
          entityIds: ['potato'],
        },
      },
    });

    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: { entityId: 'potato_copy', targetContainerId: 'burner1' },
    });

    const state = worldStore.getState();
    // burner1 should still only have 1 potato because duplicate ingredient is blocked
    expect(state.containers.burner1.entityIds).toEqual(['potato']);
  });

  it('updates ingredient status to peeled when preparation is peeled', () => {
    worldStore.setState({
      entities: {
        potato: { id: 'potato', ingredientId: 'potato', name: '🥔 Potatoes', type: 'ingredient' },
      },
      containers: {
        board: { id: 'board', name: 'Board', type: 'board', entityIds: ['potato'] },
      },
    });

    worldStore.getState().dispatch({
      type: 'PREPARE_INGREDIENT',
      payload: { entityId: 'potato', preparation: 'peeled' },
    });

    const state = worldStore.getState();
    const entity = state.entities.potato;
    expect(entity.state?.preparation).toBe('peeled');
    expect(entity.state?.status).toBe('peeled');
    expect(entity.name).toBe('🥔 Peeled Potatoes');
  });

  it('updates ingredient status to sliced-potatoe and diced-potatoe generically', () => {
    worldStore.setState({
      entities: {
        potato: { id: 'potato', ingredientId: 'potato', name: '🥔 Potatoes', type: 'ingredient' },
        onion: { id: 'onion', ingredientId: 'onion', name: '🧅 Onion', type: 'ingredient' },
      },
      containers: {
        board: { id: 'board', name: 'Board', type: 'board', entityIds: ['potato', 'onion'] },
      },
    });

    worldStore.getState().dispatch({
      type: 'PREPARE_INGREDIENT',
      payload: { entityId: 'potato', preparation: 'sliced' },
    });

    worldStore.getState().dispatch({
      type: 'PREPARE_INGREDIENT',
      payload: { entityId: 'onion', preparation: 'diced' },
    });

    const state = worldStore.getState();
    expect(state.entities.potato.state?.status).toBe('sliced-potatoe');
    expect(state.entities.onion.state?.status).toBe('diced-onion');
  });
});
</file>

<file path="src/systems/recipeRunner/handlers/utilityHandlers.ts">
/**
 * FILE: src/systems/recipeRunner/handlers/utilityHandlers.ts
 *
 * PURPOSE:
 * Step handlers for utility, narrative, and completion steps ('serve', 'wait', 'instruction', 'speak', 'celebrate').
 */

import { worldStore } from '../../../store/worldStore';
import { moveTortillaTo, flipTortilla, clearTortillaGaze } from '../../mascotActions';
import type { RecipeStep } from '../../../types/RecipeStep';
import type { RecipeRunnerContext } from '../types';

type ServeStep = Extract<RecipeStep, { action: 'serve' }>;
type WaitStep = Extract<RecipeStep, { action: 'wait' }>;
type InstructionStep = Extract<RecipeStep, { action: 'instruction' }>;
type SpeakStep = Extract<RecipeStep, { action: 'speak' }>;
type CelebrateStep = Extract<RecipeStep, { action: 'celebrate' }>;

export async function handleServeStep(
  ctx: RecipeRunnerContext,
  step: ServeStep,
  workstationDefaultContainerId?: string
): Promise<void> {
  const targetContainerId = step.containerId || workstationDefaultContainerId || 'plate';
  moveTortillaTo(targetContainerId, ctx.mascotId);
  await ctx.wait();

  const state = worldStore.getState();

  if (step.target) {
    const targetEntityId = ctx.getBoundEntityId(step.target);
    if (targetEntityId) {
      const currentContainer = Object.values(state.containers).find((c) =>
        c.entityIds.includes(targetEntityId)
      );
      if (currentContainer && currentContainer.id !== targetContainerId) {
        worldStore.getState().dispatch({
          type: 'MOVE_ENTITY',
          payload: {
            entityId: targetEntityId,
            targetContainerId,
          },
        });
      }
    }
  } else {
    // Move all active (unconsumed) bound recipe entities to target container (plate)
    const boundEntityIds = new Set(Object.values(ctx.recipeContext.bindings));

    for (const entityId of boundEntityIds) {
      const entity = state.entities[entityId];
      if (entity && !entity.state?.consumed) {
        const currentContainer = Object.values(state.containers).find((c) =>
          c.entityIds.includes(entityId)
        );
        if (currentContainer && currentContainer.id !== targetContainerId) {
          worldStore.getState().dispatch({
            type: 'MOVE_ENTITY',
            payload: {
              entityId,
              targetContainerId,
            },
          });
        }
      }
    }
  }
  await ctx.wait();
}

export async function handleWaitStep(
  ctx: RecipeRunnerContext,
  step: WaitStep
): Promise<void> {
  await ctx.wait(step.durationMs);
}

export async function handleInstructionStep(
  ctx: RecipeRunnerContext,
  step: InstructionStep
): Promise<void> {
  const text = step.text || step.instruction;
  if (text) {
    worldStore.getState().dispatch({
      type: 'UPDATE_ENTITY_STATE',
      payload: {
        entityId: step.mascotId || ctx.mascotId,
        changes: { speechMessage: text },
      },
    });
  }
  await ctx.wait();
}

export async function handleSpeakStep(
  ctx: RecipeRunnerContext,
  step: SpeakStep
): Promise<void> {
  worldStore.getState().dispatch({
    type: 'UPDATE_ENTITY_STATE',
    payload: {
      entityId: step.mascotId || ctx.mascotId,
      changes: { speechMessage: step.message },
    },
  });
  await ctx.wait();
}

export async function handleCelebrateStep(
  ctx: RecipeRunnerContext,
  step: CelebrateStep
): Promise<void> {
  flipTortilla(step.mascotId || ctx.mascotId);
  await ctx.wait(900);
  clearTortillaGaze(step.mascotId || ctx.mascotId);
}
</file>

<file path="src/systems/clasicaCompletion.test.ts">
/**
 * FILE: src/systems/clasicaCompletion.test.ts
 *
 * PURPOSE:
 * Integration tests verifying entity states and container cleanups at the completion of clasicaRecipe.
 *
 * VERIFIES:
 * - Preparation bowl (bowl) is empty at the end.
 * - Plato (plate) contains ONLY mixture at the end.
 * - Mixed input ingredients disappear from all world containers.
 */

import { beforeEach, describe, expect, it } from 'vitest';
import { worldStore } from '../store/worldStore';
import { RecipeRunner } from './recipeRunner';
import { clasicaRecipe } from '../data/catalog/recipes/clasica';
import { clearActionLog } from '../store/middleware/actionLog';

function seedTestWorld() {
  worldStore.setState({
    entities: {
      chef: { id: 'chef', name: 'Chef Tortilla 🍳', type: 'mascot', state: { gazingAt: null } },
      potato: { id: 'potato', ingredientId: 'potato', name: 'Potato', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
      egg: { id: 'egg', ingredientId: 'egg', name: 'Egg', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
      oil: { id: 'oil', ingredientId: 'oil', name: 'Oil', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
      salt: { id: 'salt', ingredientId: 'salt', name: 'Salt', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
      black_pepper: { id: 'black_pepper', ingredientId: 'black_pepper', name: 'Pepper', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
    },
    containers: {
      despensa: {
        id: 'despensa',
        name: 'Despensa',
        type: 'storage',
        entityIds: ['potato', 'egg', 'oil', 'salt', 'black_pepper'],
        rules: { isImmutable: true },
      },
      sink: {
        id: 'sink',
        name: 'Sink',
        type: 'sink',
        entityIds: [],
        rules: { maxCapacity: 10 },
      },
      board: {
        id: 'board',
        name: 'Board',
        type: 'board',
        entityIds: [],
        rules: { maxCapacity: 10 },
      },
      bowl: {
        id: 'bowl',
        name: 'Bowl',
        type: 'bowl',
        entityIds: [],
        rules: { maxCapacity: 10 },
      },
      burner1: {
        id: 'burner1',
        name: 'burner1',
        type: 'burner',
        entityIds: [],
        rules: { maxCapacity: 5 },
      },
      plate: {
        id: 'plate',
        name: 'Plate',
        type: 'plate',
        entityIds: [],
        rules: { maxCapacity: 5 },
      },
    },
    dispatch: worldStore.getState().dispatch,
  });
}

describe('Clásica Recipe Completion State', () => {
  beforeEach(() => {
    seedTestWorld();
    clearActionLog();
  });

  it('ensures preparation bowl is empty, and plato contains ONLY mixture', async () => {
    const runner = new RecipeRunner({ mascotId: 'chef', delayMs: 1 });
    await runner.runRecipe(clasicaRecipe);

    const state = worldStore.getState();

    // 1. Preparation bowl is empty
    expect(state.containers.bowl.entityIds).toEqual([]);

    // 2. fireplace is empty
    //expect(state.containers.pan.entityIds).toEqual([]);

    // 3. Plato (plate) contains ONLY mixture
    expect(state.containers.plate.entityIds).toHaveLength(1);
    const servedEntityId = state.containers.plate.entityIds[0];
    const servedEntity = state.entities[servedEntityId];
    expect(servedEntity).toBeDefined();
    expect(servedEntity.name).toBe('mixture');

    // 4. Input ingredients and cooking oil are marked as consumed
    const mixtureId = runner.recipeContext.bindings['mixture'];
    expect(mixtureId).toBe(servedEntityId);

    const potatoesId = runner.recipeContext.bindings['potatoes'];
    const eggsId = runner.recipeContext.bindings['eggs'];
    const saltId = runner.recipeContext.bindings['salt'];
    const pepperId = runner.recipeContext.bindings['black_pepper'];

    expect(state.entities[potatoesId]?.state?.consumed).toBe(true);
    expect(state.entities[eggsId]?.state?.consumed).toBe(true);
    expect(state.entities[saltId]?.state?.consumed).toBe(true);
    expect(state.entities[pepperId]?.state?.consumed).toBe(true);

    // Verify none of the consumed ingredients remain in any workstation container
    const workstationContainerIds = ['sink', 'board', 'bowl', 'burner1', 'plate'];
    for (const cId of workstationContainerIds) {
      expect(state.containers[cId].entityIds).not.toContain(potatoesId);
      expect(state.containers[cId].entityIds).not.toContain(eggsId);
      expect(state.containers[cId].entityIds).not.toContain(saltId);
      expect(state.containers[cId].entityIds).not.toContain(pepperId);
    }
  });
});
</file>

<file path="src/types/IngredientList.ts">
/**
 * FILE: IngredientList.ts
 *
 * PURPOSE:
 * Defines container/list data structures.
 *
 * RESPONSIBILITY:
 * - Represents collections of entities.
 */

import type { Ingredient } from './Ingredient'

export interface IngredientList {
  id: string
  name: string
  ingredients: Ingredient[]
}

export interface List {
  id: string
  title: string
  seedFromCatalog?: boolean
  seedIngredients?: string[]
  consumesOnDrag?: boolean   // true = item is removed from this list when dragged out
}
</file>

<file path="src/systems/gaze.test.ts">
/**
 * FILE: gaze.test.ts
 *
 * PURPOSE:
 * Unit tests for gaze system.
 *
 * RESPONSIBILITY:
 * - Validates mascot gaze target updates, structural equality, and idempotency.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { worldStore } from '../store/worldStore';
import { updateMascotGaze, getMascotGazeTarget } from './gaze';
import type { GazeTarget } from './gaze';

const  FIRE_GAZE: GazeTarget = { type: 'entity', entityId: ' burner1' };

describe('Gaze System', () => {
  beforeEach(() => {
    worldStore.setState({
      entities: {
        chef: {
          id: 'chef',
          name: 'Chef',
          type: 'mascot',
          state: {
            gazingAt: undefined,
          },
        },
      },
      containers: {
        bench: {
          id: 'bench',
          name: 'Workbench',
          type: 'board',
          rules: { maxCapacity: 1 },
          entityIds: [],
        },
        burner1: {
          id: 'burner1',
          name: 'burner1',
          type: 'burner',
          rules: { maxCapacity: Infinity },
          entityIds: [],
        },
        plate: {
          id: 'plate',
          name: 'Plate',
          type: 'storage',
          rules: { maxCapacity: Infinity },
          entityIds: [],
        },
      },
    });
  });

  it('updates mascot gaze target correctly', () => {
    updateMascotGaze('chef',  FIRE_GAZE);
    expect(getMascotGazeTarget('chef')).toEqual( FIRE_GAZE);
  });

  it('is idempotent when gazing at the same target', () => {
    updateMascotGaze('chef',  FIRE_GAZE);
    const firstState = worldStore.getState();

    updateMascotGaze('chef', { type: 'entity', entityId: ' burner1' }); // structurally identical
    const secondState = worldStore.getState();

    expect(firstState).toBe(secondState);
  });

  it('updates when gazing at a different entity', () => {
    updateMascotGaze('chef',  FIRE_GAZE);
    updateMascotGaze('chef', { type: 'entity', entityId: 'plate' });
    expect(getMascotGazeTarget('chef')).toEqual({ type: 'entity', entityId: 'plate' });
  });

  it('can gaze at mouse', () => {
    updateMascotGaze('chef', { type: 'mouse' });
    expect(getMascotGazeTarget('chef')).toEqual({ type: 'mouse' });
  });

  it('can gaze at a point', () => {
    const pointGaze: GazeTarget = { type: 'point', point: { x: 100, y: 200 } };
    updateMascotGaze('chef', pointGaze);
    expect(getMascotGazeTarget('chef')).toEqual(pointGaze);
  });

  it('can clear gaze to null', () => {
    updateMascotGaze('chef',  FIRE_GAZE);
    updateMascotGaze('chef', null);
    expect(getMascotGazeTarget('chef')).toBeNull();
  });
});
</file>

<file path="src/systems/gaze.ts">
/**
 * FILE: gaze.ts
 *
 * PURPOSE:
 * Calculates gaze behavior.
 *
 * RESPONSIBILITY:
 * - Determines what objects attract attention.
 * - Updates gaze-related state.
 */

import { worldStore } from '../store/worldStore';

export interface GazePoint {
  x: number;
  y: number;
}

/**
 * Discriminated union describing what the mascot is looking at.
 *
 * - entity  → a specific world entity (container or ingredient) by id
 * - mouse   → the user's cursor position (resolved by the UI layer)
 * - point   → an explicit SVG/screen coordinate
 * - null    → not gazing at anything; fall back to idle eye position
 */
export type GazeTarget =
  | { type: 'entity'; entityId: string }
  | { type: 'mouse' }
  | { type: 'point'; point: GazePoint }
  | null;

/** Narrow helper — returns the entityId when gazing at an entity, else null. */
export function gazeEntityId(target: GazeTarget): string | null {
  return target?.type === 'entity' ? target.entityId : null;
}

interface GazeState {
  gazingAt?: GazeTarget;
}

/**
 * Updates what target a mascot is looking at.
 * No-ops if the target is structurally identical to the current one.
 */
export function updateMascotGaze(mascotId: string, targetId: GazeTarget): void {
  const current = getMascotGazeTarget(mascotId);

  // Structural equality check — avoids redundant dispatches for the same target.
  if (JSON.stringify(current) === JSON.stringify(targetId)) return;

  worldStore.getState().dispatch({
    type: 'UPDATE_ENTITY_STATE',
    payload: {
      entityId: mascotId,
      changes: { gazingAt: targetId },
    },
  });
}

/** Returns the current gaze target for a mascot entity. */
export function getMascotGazeTarget(mascotId: string): GazeTarget {
  const entity = worldStore.getState().entities[mascotId];
  if (!entity) return null;
  const state = entity.state as GazeState | undefined;
  return state?.gazingAt ?? null;
}

/**
 * Subscribes to gaze changes for a given mascot.
 * Uses Zustand's vanilla subscribe so callers outside React can react to gaze updates
 * without polling or re-rendering unrelated components.
 *
 * Returns an unsubscribe function.
 *
 * @example
 *   const unsub = subscribeToGaze('chef', (target) => console.log(target));
 *   // later:
 *   unsub();
 */
export function subscribeToGaze(
  mascotId: string,
  callback: (target: GazeTarget) => void
): () => void {
  let prev = getMascotGazeTarget(mascotId);

  return worldStore.subscribe((state) => {
    const next = (state.entities[mascotId]?.state as GazeState | undefined)?.gazingAt ?? null;
    // Only fire when the gaze actually changes (structural check).
    if (JSON.stringify(next) !== JSON.stringify(prev)) {
      prev = next;
      callback(next);
    }
  });
}
</file>

<file path="src/systems/mascotActions.ts">
/**
 * FILE: mascotActions.ts
 *
 * PURPOSE:
 * Action dispatcher helpers for mascot (Tortilla) commands.
 *
 * RESPONSIBILITY:
 * - Provides reusable, generic action dispatchers for AI agents or UI triggers.
 * - Handles tortilla movement, grabbing ingredients from containers, dropping ingredients into containers, and flipping.
 */

import { worldStore } from '../store/worldStore';
import { recipes } from '../data/catalog/recipes';
import { RecipeRunner } from './recipeRunner';

/**
 * Triggers Tortilla flip animation and records action in store.
 */
export function flipTortilla(mascotId: string = 'chef'): void {
  worldStore.getState().dispatch({
    type: 'MASCOT_FLIP',
    payload: { mascotId },
  });
}

/**
 * Moves Tortilla gaze/focus to a specific container in the world.
 */
export function moveTortillaTo(targetContainerId: string, mascotId: string = 'chef'): void {
  worldStore.getState().dispatch({
    type: 'MASCOT_MOVE',
    payload: { mascotId, targetContainerId },
  });
}

/**
 * Clears Tortilla's gaze — mascot returns to idle eye position (gazingAt: null).
 * Use instead of moveTortillaTo('') when there is no meaningful target.
 */
export function clearTortillaGaze(mascotId: string = 'chef'): void {
  worldStore.getState().dispatch({
    type: 'MASCOT_CLEAR_GAZE',
    payload: { mascotId },
  });
}

/**
 * Commands Tortilla to grab/pick up an ingredient from a container.
 */
export function grabIngredient(
  entityId: string,
  sourceContainerId?: string,
  mascotId: string = 'chef'
): void {
  worldStore.getState().dispatch({
    type: 'MASCOT_GRAB',
    payload: { mascotId, entityId, sourceContainerId },
  });
}

/**
 * Commands Tortilla to drop the currently held ingredient into a target container.
 */
export function dropIngredient(
  targetContainerId: string,
  positionIndex?: number,
  mascotId: string = 'chef'
): void {
  worldStore.getState().dispatch({
    type: 'MASCOT_DROP',
    payload: { mascotId, targetContainerId, positionIndex },
  });
}

/**
 * Commands Tortilla to execute a sequence:
 * 1. Move focus to despensa
 * 2. Grab potato from despensa
 * 3. Move focus to board (tabla)
 * 4. Drop potato into board
 * 5. Flip Tortilla mascot
 */
export async function runTortillaPotatoScript(
  mascotId: string = 'chef',
  delayMs: number = 600
): Promise<void> {
  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // 1. Look at despensa
  moveTortillaTo('despensa', mascotId);
  await wait(delayMs);

  // 2. Grab potato from despensa
  grabIngredient('potato', 'despensa', mascotId);
  await wait(delayMs);

  // 3. Look at board (tabla)
  moveTortillaTo('board', mascotId);
  await wait(delayMs);

  // 4. Drop potato in board
  dropIngredient('board', undefined, mascotId);
  await wait(delayMs);

  // 5. Flip Tortilla
  flipTortilla(mascotId);
  await wait(900);

  // 6. Return home gracefully — clear gaze instead of setting an empty string target
  clearTortillaGaze(mascotId);
}

/**
 * Commands Tortilla to follow a recipe by running its step-based state machine.
 */
export async function runFollowRecipeScript(
  recipeId: string,
  mascotId: string = 'chef',
  targetContainerId: string = 'board',
  delayMs: number = 600
): Promise<void> {
  const activeRecipe = recipes.find((r) => r.id === recipeId);
  if (!activeRecipe) return;

  const runner = new RecipeRunner({
    mascotId,
    defaultTargetId: targetContainerId,
    delayMs,
  });

  await runner.runRecipe(activeRecipe);
}
</file>

<file path="src/systems/queries.test.ts">
/**
 * FILE: queries.test.ts
 *
 * PURPOSE:
 * Unit tests for query system functions.
 *
 * RESPONSIBILITY:
 * - Tests entity and container query helpers.
 */

import { describe, expect, it } from 'vitest';
import { getContainerByEntityId, getEntitiesInContainer, getEntityById } from './queries';
import type { WorldState } from '../types/world';

describe('Query System', () => {
  const mockState: WorldState = {
    entities: {
      tomato: { id: 'tomato', name: 'Tomato', type: 'ingredient', state: { sliced: false } },
      onion: { id: 'onion', name: 'Onion', type: 'ingredient', state: { sliced: true } },
    },
    containers: {
      pantry: {
        id: 'pantry',
        name: 'Pantry',
        type: 'storage',
        rules: { maxCapacity: 10 },
        entityIds: ['tomato'],
      },
      board: {
        id: 'board',
        name: 'Cutting Board',
        type: 'board',
        rules: { maxCapacity: 2 },
        entityIds: ['onion'],
      },
    },
    dispatch: () => {},
  };

  it('retrieves an entity by ID', () => {
    const entity = getEntityById(mockState, 'tomato');
    expect(entity).toBeDefined();
    expect(entity?.name).toBe('Tomato');
  });

  it('finds the parent container for a given entity ID', () => {
    const container = getContainerByEntityId(mockState, 'onion');
    expect(container).toBeDefined();
    expect(container?.id).toBe('board');
  });

  it('returns all entities inside a specified container', () => {
    const boardEntities = getEntitiesInContainer(mockState, 'board');
    expect(boardEntities).toHaveLength(1);
    expect(boardEntities[0].id).toBe('onion');
  });
});
</file>

<file path="package.json">
{
  "name": "tortilla-world",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "test": "vitest run"
  },
  "dependencies": {
    "@dnd-kit/core": "^6.3.1",
    "@dnd-kit/sortable": "^10.0.0",
    "@dnd-kit/utilities": "^3.2.2",
    "framer-motion": "^12.42.2",
    "immer": "^11.1.15",
    "react": "^19.2.7",
    "react-dom": "^19.2.7",
    "zustand": "^5.0.14"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/node": "^24.13.2",
    "@types/react": "^19.2.17",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.3",
    "eslint": "^10.6.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.3",
    "globals": "^17.7.0",
    "repomix": "^1.16.1",
    "sass-embedded": "^1.100.0",
    "typescript": "~6.0.2",
    "typescript-eslint": "^8.62.0",
    "vite": "^8.1.1",
    "vitest": "^4.1.10"
  }
}
</file>

<file path="src/systems/mascot.ts">
/**
 * FILE: mascot.ts
 *
 * PURPOSE:
 * Mascot state definitions and behavior functions.
 *
 * RESPONSIBILITY:
 * - Defines mascot visual states ('idle', 'cooking', 'celebrating', etc.).
 */

export type MascotState = 'idle' | 'cooking' | 'celebrating' | 'thinking' | 'flipping' | string;
</file>

<file path="src/systems/queries.ts">
/**
 * FILE: queries.ts
 *
 * PURPOSE:
 * Read-only world queries and selectors.
 *
 * RESPONSIBILITY:
 * - Finds entities by ID or container.
 * - Filters world state data for systems and components.
 *
 * SHOULD NOT:
 * - Modify world state.
 */

import type { Container, Entity, WorldState } from '../types/world';

/**
 * Retrieves an entity by its unique ID from the world state.
 */
export const getEntityById = (state: WorldState, entityId: string): Entity | undefined => {
  return state.entities[entityId];
};

/**
 * Retrieves the container that currently holds the given entity ID.
 */
export const getContainerByEntityId = (
  state: WorldState,
  entityId: string
): Container | undefined => {
  return Object.values(state.containers).find((container) =>
    container.entityIds.includes(entityId)
  );
};

/**
 * Retrieves all entities contained within a specific container.
 */
export const getEntitiesInContainer = (state: WorldState, containerId: string): Entity[] => {
  const container = state.containers[containerId];
  if (!container) return [];

  return container.entityIds
    .map((id) => state.entities[id])
    .filter((entity): entity is Entity => entity !== undefined);
};
</file>

<file path="docs/decisions.md">
# Systems

## Overview

Systems contain the behaviour of Tortilla World.

Components display the world.
Systems modify the world.

A system receives actions, validates them, and updates the world state.

The general flow is:

```text
Input
  |
  v
Action
  |
  v
System
  |
  v
Validation
  |
  v
World State Update
  |
  v
UI Update
```

---

# System Architecture

Tortilla World is based on independent systems.

Current and planned systems:

```text
Systems

├── Interaction System
├── Movement System
├── Container System
├── Mascot System
├── Animation System
├── Cooking System
└── AI System
```

Each system has a clear responsibility.

---

# Interaction System

## Responsibility

The Interaction System converts external events into world actions.

External events:

* mouse clicks
* drag and drop
* AI requests
* future keyboard/gamepad input

The Interaction System does not modify the world directly.

---

## Example

User drags potato into pan.

The Interaction System creates:

```ts
{
  type:"MOVE_ENTITY",
  entityId:"potato",
  targetContainer:"pan"
}
```

The action is passed to the Movement System.

---

# Movement System

## Responsibility

The Movement System controls ownership changes.

It handles:

* moving entities
* validating source ownership
* validating destination rules
* applying transfer behaviour

---

## Move Flow

```text
Move Request

      |
      v

Find Entity

      |
      v

Find Current Container

      |
      v

Find Target Container

      |
      v

Validate Move

      |
      v

Apply Transfer Rule

      |
      v

Update Ownership

```

---

# Move Validation

Before moving an entity, the system checks:

## Entity existence

Does the entity exist?

Example:

```text
potato
```

must exist in the world.

---

## Source ownership

Does the source container own the entity?

Example:

Valid:

```text
Kitchen owns potato
```

Invalid:

```text
Pan owns potato
```

when moving from Kitchen.

---

## Destination capability

Can the target container accept this entity?

Example:

A pan may accept:

```text
ingredient
```

but reject:

```text
container
```

---

## Duplicate rules

The container checks uniqueness.

Example:

Valid:

```text
Recipe

potato
egg
```

Invalid:

```text
Recipe

potato
potato
```

---

# Transfer Rules

A move is not always the same operation.

Containers define transfer behaviour.

---

# Static Container To Dynamic Container

Example:

```text
Kitchen
 |
 potato


Recipe
```

Move potato:

Result:

```text
Kitchen
 |
 potato


Recipe
 |
 potato
```

The destination receives the ingredient.

The source remains unchanged.

This represents a world resource.

---

# Dynamic Container To Dynamic Container

Example:

```text
Recipe
 |
 potato


Pan
```

Move potato:

Result:

```text
Recipe


Pan
 |
 potato
```

Ownership transfers.

---

# Dynamic Container To Static Container

Example:

```text
Recipe
 |
 potato


Kitchen
```

Move potato back.

Result:

```text
Recipe


Kitchen
 |
 potato
```

The dynamic container loses ownership.

The static container provides the original world resource.

---

# Container System

## Responsibility

The Container System manages container rules.

It answers questions:

* Can this entity be added?
* Can this entity be removed?
* Are duplicates allowed?
* Is the container full?
* Does ordering matter?

---

## Example API

```ts
canAccept(
  container,
  entity
)
```

returns:

```ts
true
```

or:

```ts
false
```

---

# Action Queue

## Responsibility

All world changes should pass through an action queue.

Example:

```text
AI
 |
User
 |
System
 |
Action Queue
 |
World Update
```

---

## Example Action

```ts
{
 type:"MOVE_ENTITY",

 entityId:"egg",

 source:"kitchen",

 target:"recipe"
}
```

---

## Benefits

Action queues provide:

* debugging
* replay
* logging
* AI control
* animations
* delayed actions

---

# Animation System

## Responsibility

The Animation System reacts to world changes.

It does not decide what happens.

Example:

Movement System:

```text
Potato moved to Pan
```

Animation System:

```text
Play potato movement animation
```

---

## Separation

Bad:

```text
Drag component:
move object
animate object
change state
```

Good:

```text
Drag component:
create action


Movement System:
change state


Animation System:
animate change
```

---

# Cooking System

## Responsibility

Future system for transforming entities.

Examples:

```text
Potato
+
Oil
+
Heat

    |
    v

Fried Potato
```

---

The cooking system changes entity state.

Example:

Before:

```ts
{
 type:"ingredient",
 state:"raw"
}
```

After:

```ts
{
 type:"ingredient",
 state:"cooked"
}
```

---

# AI System

## Responsibility

The AI System creates actions.

The AI does not directly manipulate Zustand state.

---

Example:

AI decides:

```text
Prepare tortilla
```

Creates:

```ts
[
 {
  type:"MOVE_ENTITY",
  entityId:"potato",
  target:"pan"
 },

 {
  type:"ADD_HEAT",
  target:"pan"
 }
]
```

The normal systems execute them.

---

# System Communication

Systems communicate through actions and world state.

Example:

```text
Interaction System

        |
        v

Move Action

        |
        v

Movement System

        |
        v

World Store

        |
        v

Animation System

```

---

# Zustand Responsibility

Zustand is the storage layer.

It stores:

* entities
* containers
* relationships
* world state

It should not contain UI logic.

---

Example:

Good:

```ts
moveEntity(
 entityId,
 from,
 to
)
```

Bad:

```ts
onDropIngredient(
 mouseEvent
)
```

---

# Testing Strategy

Systems should be testable without React.

Example:

```ts
moveEntity(
 "potato",
 "kitchen",
 "pan"
)
```

Expected:

```text
Kitchen:
empty

Pan:
potato
```

---

# Future Systems

Possible additions:

## Time System

Controls:

* cooking duration
* day/night
* events

---

## Physics System

Controls:

* collisions
* falling objects
* movement

---

## Economy System

Controls:

* ingredients cost
* customers
* money

---

## Character System

Controls:

* NPCs
* player actions
* behaviours

---

## Mascot System & Recipe System

### Mascot System
Controls:

* `MASCOT_FLIP`: Flips Tortilla mascot in place.
* `MASCOT_MOVE`: Moves gaze/focus of Tortilla to target container.
* `MASCOT_GRAB`: Commands Tortilla to grab ingredient entity from a container.
* `MASCOT_DROP`: Commands Tortilla to drop held ingredient into target container obeying rules.

Dispatch helpers and automated action sequences (e.g. `runFollowRecipeScript`) are located in `src/systems/mascotActions.ts` for AI agent, console, or UI integration.

React components (`Mascot.tsx`) translate pure target container state into physical Framer Motion spring translations across the DOM viewport without touching store logic.

---

### Recipe System & RecipeRunner

The Recipe System executes declarative, step-based recipe state machines via `RecipeRunner` (`src/systems/recipeRunner.ts`).

#### Architecture:
* **Declarative Data**: Recipes (`RecipeStep[]`) define *what* needs to happen (e.g. `move`, `grab`, `drop`, `cut`, `cook`, `mix`, `wait`, `flip`, `speak`, `celebrate`) without referencing specific kitchen containers or locations.
* **Workstation & Tool Resolution**: `RecipeRunner` dynamically queries the Workstation engine (`src/engine/workstations.ts`) to determine the required workstation (`pantry`, `washing_station`, `cutting_station`, `preparation_station`, `cooking_station`, `serving_station`) and tools (`knife`, `peeler`, `whisk`, `fork`, `spatula`, etc.) for each step.
* **Generic Execution**: `RecipeRunner` iterates over recipe steps and dispatches appropriate world/mascot actions.
* **Entity Identity Preservation**: Ingredient state mutations (such as preparation: `whole` ➔ `diced` or cooking: `raw` ➔ `fried`) modify the target entity's `state` via `PREPARE_INGREDIENT` or `COOK_INGREDIENT` without creating or destroying entities.

---

# Decision: Refactor Ingredient Usage Actions into Domain Events

## Context
Previously, `CONSUME_INGREDIENT` was dispatched directly as a user action. This mixed user intent, recipe execution logic, and entity lifecycle mutation.

## Decision
Separated player intentions from world state consequences:
1. **User Intent Action (`USE_INGREDIENT`)**: High-level action dispatched when an ingredient is used (`{ entityId, usedIn }`).
2. **Domain Event (`INGREDIENT_CONSUMED`)**: Reactive domain event emitted when an ingredient is consumed (`{ entityId, consumedBy }`).

## Flow
```text
User Interaction / RecipeRunner
           |
           v
    USE_INGREDIENT (Action)
           |
           v
    Ingredient System / World Store
    +--> Transfer entity to container / recipe
    +--> Set consumed state (consumed: true, consumedBy)
    +--> Emit INGREDIENT_CONSUMED (Domain Event)
```

## Consequences
- Clean separation between user intent and domain event consequences.
- Allows ingredient undo/reversion (`revertIngredientUsage`).
- Decouples UI / RecipeRunner from direct lifecycle state mutation.

---

# Final Principle

The rule of Tortilla World:

```text
Components show the world.

Systems change the world.

Containers define the rules.

Actions describe intentions.

The Store remembers the result.
```
</file>

<file path="src/data/catalog/recipes/clasica.ts">
/**
 * FILE: clasica.ts
 *
 * PURPOSE:
 * Recipe definition for Tortilla Clásica (without onion).
 *
 * RESPONSIBILITY:
 * - Defines the ingredients, quantities, and cooking process.
 * - Describes recipe actions in a declarative format.
 * - Provides a Cooklang representation for humans.
 *
 * NOTE:
 * Recipes describe WHAT happens.
 * The RecipeRunner decides HOW it happens:
 * - finding ingredients
 * - moving the chef
 * - animations
 * - changing entity state
 * - creating intermediate results
 */

import type { Recipe } from '../../../types/Recipe';

export const clasicaRecipe: Recipe = {
  id: 'clasica',

  name: 'Clásica',

  requirements: {
    potatoes: {
      entityId: 'potato',
      amount: 4,
      unit: 'pcs',
    },

    eggs: {
      entityId: 'egg',
      amount: 6,
      unit: 'pcs',
    },

    garlic: {
      entityId: 'garlic',
      amount: 1,
      unit: 'head',
    },

    oil: {
      entityId: 'oil',
      amount: 100,
      unit: 'ml',
    },

    salt: {
      entityId: 'salt',
      amount: 1,
      unit: 'tsp',
    },

    black_pepper: {
      entityId: 'black_pepper',
      amount: 1,
      unit: 'pinch',
    },
  },

  steps: [
  {
    action: 'prepare',
    target: 'garlic',
    preparation: 'peeled',
  },

  // Heat oil first
  {
    action: 'cook',
    target: 'oil',
    method: 'heat',
  },

  // Fry garlic (consumes oil)
  {
    action: 'cook',
    target: 'garlic',
    method: 'fry',
    instruction: 'Que no se quemen.', // Cook but don't burn
  },

  // IMPORTANT: Move garlic out IMMEDIATELY after cooking
  {
    action: 'move',
    ingredient: 'garlic',
    target: 'plate',  // Move to pantry
    source: 'pan',     // From pan
  },

  // Now cook potatoes in the same oil (oil already used from garlic step)
  {
    action: 'cook',
    target: 'potatoes',
    method: 'fry',
  },

  // Beat eggs
  {
    action: 'prepare',
    target: 'eggs',
    preparation: 'beaten',
  },

  // Mix all together including garlic from pantry
  {
    action: 'mix',
    inputs: [
      'potatoes',      // From pan
      'eggs',          // Fresh
      'salt',          // Fresh
      'black_pepper',  // Fresh
      'garlic'         // From pantry (cooked earlier)
    ],
    output: 'mixture',
  },

    {
      action: 'cook',
      target: 'mixture',
      method: 'fry',
      duration: 5,
      unit: 'min',
    },

    {
      action: 'instruction',
      text: 'Con una espátula blanda, asegúrate de que la tortilla no se pega a la sartén.',
    },

    {
      action: 'flip',
      target: 'mixture',
      instruction: 'Dale la vuelta a la tortilla.',
    },

    {
      action: 'cook',
      target: 'mixture',
      method: 'fry',
      duration: 5,
      unit: 'min',
      instruction: 'Deja cocinar por otros 5 min.',
    },

    {
      action: 'serve',
      target: 'mixture',
    },

    {
      action: 'celebrate',
    },
  ],
};

export const clasicaCooklang = `
Peel the @potatoes{4%pcs}.

Slice the @potatoes.

Heat the @oil{100%ml}.

Fry the @potatoes until tender.

Beat the @eggs{6%pcs}.

Add @salt{1%tsp}.

Add @black_pepper{1%pinch}.

Mix the potatoes with the beaten eggs, salt and black_pepper.

Pour the mixture into the pan.

Cook for 5 minutes.

With a soft spatula, make sure the tortilla does not stick to the pan.

Flip the tortilla.

Cook for another 5 minutes.

Serve the tortilla.

Celebrate.
`;

export const recipe = clasicaRecipe;
</file>

<file path="src/systems/recipeRunner/handlers/cookHandlers.ts">
/**
 * FILE: src/systems/recipeRunner/handlers/cookHandlers.ts
 *
 * PURPOSE:
 * Step handlers for cooking and thermal steps ('cook', 'flip').
 */

import { worldStore } from '../../../store/worldStore';
import { moveTortillaTo, flipTortilla } from '../../mascotActions';
import type { RecipeStep } from '../../../types/RecipeStep';
import type { RecipeRunnerContext } from '../types';

type CookStep = Extract<RecipeStep, { action: 'cook' }>;
type FlipStep = Extract<RecipeStep, { action: 'flip' }>;

export async function handleCookStep(
  ctx: RecipeRunnerContext,
  step: CookStep,
  workstationDefaultContainerId?: string
): Promise<void> {
  const rawKey = step.target || step.ingredient;
  const entityId = ctx.getBoundEntityId(rawKey);

  if (!entityId) {
    throw new Error(`[RecipeRunner] No entity bound for cook step target: "${rawKey}"`);
  }

  ctx.validateEntity(entityId, 'cook');

  const cookingMethod = step.method || 'cooked';
  const containerId = step.containerId || workstationDefaultContainerId || 'burner1';

  if (step.instruction) {
    worldStore.getState().dispatch({
      type: 'UPDATE_ENTITY_STATE',
      payload: {
        entityId: step.mascotId || ctx.mascotId,
        changes: { speechMessage: step.instruction },
      },
    });
  }

  // Ensure bound entity is moved to cooking container if not already there
  const state = worldStore.getState();
  const currentContainer = Object.values(state.containers).find((c) =>
    c.entityIds.includes(entityId!)
  );

  if (!currentContainer || currentContainer.id !== containerId) {
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: {
        entityId,
        targetContainerId: containerId,
      },
    });
  }

  moveTortillaTo(containerId, ctx.mascotId);
  await ctx.wait();

  // Turn ON fire if currently off
  const containerBefore = worldStore.getState().containers[containerId];
  if (containerBefore && !containerBefore.isOn) {
    worldStore.getState().dispatch({
      type: 'TOGGLE_BURNER',
      payload: { containerId },
    });
  }

  worldStore.getState().dispatch({
    type: 'COOK_INGREDIENT',
    payload: {
      entityId,
      cooking: cookingMethod,
    },
  });

  // Consume cooking medium helper ingredients currently in the cooking container (e.g. oil)
    /**
   * IMPORTANT: Distinguish between oil as the primary cooking target vs oil as a cooking medium.
   *
   * Scenario 1: Oil is the target (method='heat')
   *   Step: { action: 'cook', target: 'oil', method: 'heat' }
   *   Expected: Oil is heated, NOT consumed
   *   Reason: Oil is the subject being cooked, not a helper ingredient
   *
   * Scenario 2: Oil is a cooking medium
   *   Step: { action: 'cook', target: 'potatoes', method: 'fry' }
   *   Expected: Oil in the container IS consumed (used for frying)
   *   Reason: Oil is helping to cook the potatoes
   * 
   *   Scenario 3: Oil as dressing
   *   Step: { action: 'serve', target: 'mixture', method: 'dress' }
   *   Expected: fresh Oil in the container where the finished tortilla is
   *   Reason: Oil is dressiing for the tortilla
   *
   * Without this check, oil gets consumed even when it's the cooking target,
   * preventing oil reuse and causing "Heat Olive Oil" name change in Required Materials.
   */
  const cookingContainer = worldStore.getState().containers[containerId];

  // Only consume helper ingredients (like oil) if they are NOT the target of THIS cooking step
  const isOilTheTarget =
    rawKey === 'oil' ||
    rawKey?.toLowerCase().includes('oil') ||
    rawKey?.toLowerCase().includes('aceite');

  if (!isOilTheTarget && cookingContainer) {
    // Consume cooking medium helper ingredients currently in the cooking container (e.g. oil)
    const otherEntityIds = cookingContainer.entityIds.filter((id) => id !== entityId);
    for (const otherId of otherEntityIds) {
      const otherEntity = worldStore.getState().entities[otherId];
      const isOil =
        otherEntity?.ingredientId === 'oil' ||
        otherEntity?.id?.includes('oil') ||
        otherEntity?.name?.toLowerCase().includes('oil') ||
        otherEntity?.name?.toLowerCase().includes('aceite');

      if (otherEntity && otherEntity.type === 'ingredient' && !otherEntity.state?.consumed && isOil) {
        worldStore.getState().dispatch({
          type: 'USE_INGREDIENT',
          payload: {
            entityId: otherId,
            usedIn: entityId,
          },
        });
      }
    }
  }

  await ctx.wait();

  // Turn OFF fire when cooking step finishes
  const containerAfter = worldStore.getState().containers[containerId];
  if (containerAfter && containerAfter.isOn) {
    worldStore.getState().dispatch({
      type: 'TOGGLE_BURNER',
      payload: { containerId },
    });
  }
}

export async function handleFlipStep(
  ctx: RecipeRunnerContext,
  step: FlipStep
): Promise<void> {
  const rawKey = step.target;
  const targetContainer = rawKey === 'mixture' ? 'burner1' : rawKey || 'burner1';
  const instructionText = step.instruction;

  if (instructionText) {
    worldStore.getState().dispatch({
      type: 'UPDATE_ENTITY_STATE',
      payload: {
        entityId: step.mascotId || ctx.mascotId,
        changes: { speechMessage: instructionText },
      },
    });
  }

  moveTortillaTo(targetContainer, ctx.mascotId);
  await ctx.wait();

  flipTortilla(step.mascotId || ctx.mascotId);

  if (rawKey) {
    const entityId = ctx.getBoundEntityId(rawKey);
    if (entityId) {
      ctx.validateEntity(entityId, 'flip');
      worldStore.getState().dispatch({
        type: 'UPDATE_ENTITY_STATE',
        payload: {
          entityId,
          changes: { isFlipped: true, status: 'flipped-tortilla' },
        },
      });
    }
  } else {
    // If no target specified, flip all active bound entities in target container
    const state = worldStore.getState();
    const container = state.containers[targetContainer];
    if (container) {
      container.entityIds.forEach((entityId) => {
        worldStore.getState().dispatch({
          type: 'UPDATE_ENTITY_STATE',
          payload: {
            entityId,
            changes: { isFlipped: true, status: 'flipped-tortilla' },
          },
        });
      });
    }
  }

  await ctx.wait();
}
</file>

<file path="src/components/Ingredients/IngredientList.tsx">
/**
 * FILE: IngredientList.tsx
 *
 * PURPOSE:
 * Displays a collection/container of ingredients.
 *
 * RESPONSIBILITY:
 * - Renders container title and its inner entities.
 * - Acts as a droppable target for drag-and-drop.
 */

import { useStore } from 'zustand';
import { useDroppable } from '@dnd-kit/core';
import { worldStore } from '../../store/worldStore';
import type { Container, Entity } from '../../types/world';
import { IngredientListItem } from './IngredientListItem';

interface IngredientListProps {
  key?: string | number;
  container: Container;
}

export function IngredientList({ container }: IngredientListProps) {
  const entities = useStore(worldStore, (state) => state.entities);

  // Set up dnd-kit droppable binding for this container
  const { setNodeRef, isOver } = useDroppable({
    id: container.id,
  });

  const containerEntities = container.entityIds
    .map((id: string) => entities[id])
    .filter((e: Entity | undefined): e is Entity => Boolean(e));

  const getWorkstationBadge = (id: string) => {
    switch (id) {
      case 'sink': return 'Washing Area 💧';
      case 'board': return 'Cutting Workspace 🔪';
      case 'bowl': return 'Preparation 🥣';
      case 'pan': return 'Cooking Heat 🍳';
      case 'plate': return 'Serving Stage 🍽️';
      case 'despensa': return 'Pantry 🧺';
      default: return 'Workstation 🍳';
    }
  };

  return (
    <div 
      ref={setNodeRef} 
      data-container-id={container.id}
      className={`ingredient-list workstation-${container.id} ${isOver ? 'drag-over' : ''}`}
    >
      <div className="workstation-header">
        <h3>{container.name}</h3>
        <span className="workstation-type-badge">{getWorkstationBadge(container.id)}</span>
      </div>
      <div className="items-container">
        {containerEntities.map((entity: Entity) => (
          <IngredientListItem key={entity.id} entity={entity} containerId={container.id} />
        ))}
        {containerEntities.length === 0 && (
          <span className="empty-hint">Drop ingredients here</span>
        )}
      </div>
    </div>
  );
}
</file>

<file path="src/components/Recipe/RecipePanel.tsx">
/**
 * FILE: RecipePanel.tsx
 *
 * PURPOSE:
 * Compact, unintrusive recipe selector and catalog viewer.
 *
 * RESPONSIBILITY:
 * - Wires catalog recipes (Con Cebolla, Sin Cebolla) with RecipeRequirements.
 * - Displays active recipe requirements and matches with current world state.
 */

import { useStore } from 'zustand';
import { worldStore } from '../../store/worldStore';
import './RecipePanel.scss';

export function RecipePanel() {
  const dispatch = useStore(worldStore, (state) => state.dispatch);

  return (
    <div className="recipe-panel compact-recipe-panel">
      <div className="recipe-panel-header">
        <button
          type="button"
          className="recipe-reset-btn"
          onClick={() => dispatch({ type: 'RESET_WORLD' })}
          title="Clean the kitchen and start over"
        >
          🔄 Reset Kitchen
        </button>
      </div>
    </div>
  );
}
</file>

<file path="src/data/catalog/recipes/concebolla.ts">
/**
 * FILE: concebolla.ts
 *
 * PURPOSE:
 * Recipe definition for Tortilla con cebolla.
 *
 * RESPONSIBILITY:
 * - Defines the ingredients, quantities, and cooking process.
 * - Describes recipe actions in a declarative format.
 * - Provides a Cooklang representation for humans.
 */

import type { Recipe } from '../../../types/Recipe';

export const concebollaRecipe: Recipe = {
  id: 'concebolla',
  
  name: 'Tortilla con Cebolla',

  requirements: {
    potatoes: {
      entityId: 'potato',
      amount: 4,
      unit: 'pcs',
    },
    eggs: {
      entityId: 'egg',
      amount: 6,
      unit: 'pcs',
    },
    oil: {
      entityId: 'oil',
      amount: 100,
      unit: 'ml',
    },
    onions: {
      entityId: 'onion',
      amount: 1,
      unit: 'pcs',
    },
    salt: {
      entityId: 'salt',
      amount: 1,
      unit: 'tsp',
    },
    pepper: {
      entityId: 'pepper',
      amount: 1,
      unit: 'pinch',
    },
  },

  steps: [
    {
      action: 'prepare',
      target: 'potatoes',
      preparation: 'peeled',
    },
    {
      action: 'wash',
      target: 'potatoes',
    },
    {
      action: 'prepare',
      target: 'potatoes',
      preparation: 'sliced',
    },
    {
      action: 'prepare',
      target: 'onions',
      preparation: 'peeled',
    },
    {
      action: 'wash',
      target: 'onions',
    },
    {
      action: 'prepare',
      target: 'onions',
      preparation: 'diced',
    },
    {
      action: 'cook',
      target: 'oil',
      method: 'heat',
    },
    {
      action: 'cook',
      target: 'potatoes',
      method: 'fry',
    },
    {
      action: 'cook',
      target: 'onions',
      method: 'fry',
    },
    {
      action: 'prepare',
      target: 'eggs',
      preparation: 'beaten',
    },
    {
      action: 'mix',
      inputs: [
        'potatoes',
        'onions',
        'eggs',
        'salt',
        'pepper',
      ],
      output: 'mixture',
    },
    {
      action: 'cook',
      target: 'mixture',
      method: 'fry',
      duration: 5,
      unit: 'min',
    },
    {
      action: 'instruction',
      text: 'Con una espátula blanda, asegúrate de que la tortilla no se pega a la sartén.',
    },
    {
      action: 'flip',
      target: 'mixture',
      instruction: 'Dale la vuelta a la tortilla.',
    },
    {
      action: 'cook',
      target: 'mixture',
      method: 'fry',
      duration: 5,
      unit: 'min',
      instruction: 'Deja cocinar por otros 5 min.',
    },
    {
      action: 'serve',
      target: 'mixture',
    },
    {
      action: 'celebrate',
    },
  ],
};

export const concebollaCooklang = `
Peel the @potatoes{4%pcs}.

Wash the @potatoes.

Slice the @potatoes.

Peel the @onions{1%pcs}.

Wash the @onions.

Dice the @onions.

Heat the @oil{100%ml}.

Fry the @potatoes until tender.

Fry the @onions until golden.

Beat the @eggs{6%pcs}.

Add @salt{1%tsp} and @pepper{1%pinch}.

Mix the fried potatoes and onions with the beaten eggs, salt and pepper.

Pour the mixture into the pan.

Cook for 5 minutes.

With a soft spatula, make sure the tortilla does not stick to the pan.

Flip the tortilla.

Cook for another 5 minutes.

Serve the tortilla.

Celebrate.
`;

export const recipe = concebollaRecipe;
</file>

<file path="src/systems/mascotActions.test.ts">
import { describe, it, expect, beforeEach } from 'vitest';
import { worldStore } from '../store/worldStore';
import { clearActionLog, getActionLog } from '../store/middleware/actionLog';
import {
  flipTortilla,
  moveTortillaTo,
  grabIngredient,
  dropIngredient,
  runTortillaPotatoScript,
  runFollowRecipeScript,
} from './mascotActions';

function seedWorld() {
  worldStore.setState({
    entities: {
      potato: { id: 'potato', ingredientId: 'potato', name: 'Potato', type: 'ingredient' },
      chef: { id: 'chef', name: 'Chef Tortilla 🍳', type: 'mascot', state: {} },
    },
    containers: {
      despensa: {
        id: 'despensa',
        name: 'Despensa',
        type: 'storage',
        entityIds: ['potato'],
        rules: { isImmutable: true },
      },
      burner1: {
        id: 'burner1',
        name: 'burner1',
        type: 'burner',
        entityIds: [],
        rules: { maxCapacity: 5 },
      },
      board: {
        id: 'board',
        name: 'Board',
        type: 'board',
        entityIds: [],
        rules: { maxCapacity: 3 },
      },
    },
  });
}

describe('mascotActions system', () => {
  beforeEach(() => {
    seedWorld();
    clearActionLog();
  });

  it('triggers flip action and logs in store action log', () => {
    flipTortilla('chef');

    const state = worldStore.getState();
    expect(state.entities.chef.state?.state).toBe('flipping');
    expect(state.entities.chef.state?.isFlipping).toBe(true);

    const log = getActionLog();
    expect(log.map((l) => l.action)).toContain('MASCOT_FLIP');
  });

  it('moves Tortilla gaze to a specified container', () => {
    moveTortillaTo('burner1', 'chef');

    const state = worldStore.getState();
    expect(state.entities.chef.state?.gazingAt).toEqual({ type: 'entity', entityId: 'burner1' });

    const log = getActionLog();
    expect(log.map((l) => l.action)).toContain('MASCOT_MOVE');
  });

  it('allows Tortilla to grab an ingredient from a container', () => {
    grabIngredient('potato', 'despensa', 'chef');

    const state = worldStore.getState();
    expect(state.entities.chef.state?.holdingEntityId).toBe('potato');
    expect(state.entities.chef.state?.sourceContainerId).toBe('despensa');

    const log = getActionLog();
    expect(log.map((l) => l.action)).toContain('MASCOT_GRAB');
  });

  it('allows Tortilla to drop held ingredient into a target container obeying container rules', () => {
    // First grab potato from immutable despensa
    grabIngredient('potato', 'despensa', 'chef');

    // Then drop intoburner1
    dropIngredient('burner1', undefined, 'chef');

    const state = worldStore.getState();
    // Held item cleared
    expect(state.entities.chef.state?.holdingEntityId).toBeUndefined();
    //burner1 now has a potato copy (because source was immutable despensa)
    expect(state.containers.burner1.entityIds.length).toBe(1);

    const log = getActionLog();
    const actions = log.map((l) => l.action);
    expect(actions).toContain('MASCOT_GRAB');
    expect(actions).toContain('MASCOT_DROP');
  });

  it('clears holdingEntityId when drop is possible and retains it when drop is blocked', () => {
    // 1. Fill board to capacity (maxCapacity = 3)
    worldStore.setState({
      ...worldStore.getState(),
      entities: {
        ...worldStore.getState().entities,
        i1: { id: 'i1', ingredientId: 'i1', name: 'I1', type: 'ingredient' },
        i2: { id: 'i2', ingredientId: 'i2', name: 'I2', type: 'ingredient' },
        i3: { id: 'i3', ingredientId: 'i3', name: 'I3', type: 'ingredient' },
      },
      containers: {
        ...worldStore.getState().containers,
        board: {
          id: 'board',
          name: 'Board',
          type: 'board',
          entityIds: ['i1', 'i2', 'i3'],
          rules: { maxCapacity: 3 },
        },
      },
    });

    // 2. Grab potato from despensa
    grabIngredient('potato', 'despensa', 'chef');
    expect(worldStore.getState().entities.chef.state?.holdingEntityId).toBe('potato');

    // 3. Attempt to drop into full board -> should be blocked and Tortilla continues grabbing/holding it
    dropIngredient('board', undefined, 'chef');
    expect(worldStore.getState().entities.chef.state?.holdingEntityId).toBe('potato');
    expect(worldStore.getState().containers.board.entityIds).toEqual(['i1', 'i2', 'i3']);

    // 4. Drop into non-fullburner1 -> allowed, Tortilla stops grabbing it (holdingEntityId cleared)
    dropIngredient('burner1', undefined, 'chef');
    expect(worldStore.getState().entities.chef.state?.holdingEntityId).toBeUndefined();
    expect(worldStore.getState().containers.burner1.entityIds.length).toBe(1);
  });

  it('runs full async script sequence: move ➔ grab ➔ move ➔ drop ➔ flip ➔ return home', async () => {
    await runTortillaPotatoScript('chef', 10);

    const state = worldStore.getState();
    expect(state.containers.board.entityIds.length).toBe(1);

    const log = getActionLog().map((l) => l.action).filter((a) => a !== 'RESET_MASCOT_FLIP');
    expect(log).toEqual([
      'MASCOT_MOVE',
      'MASCOT_GRAB',
      'MASCOT_MOVE',
      'MASCOT_DROP',
      'MASCOT_FLIP',
      'MASCOT_CLEAR_GAZE', // "return home" now dispatches MASCOT_CLEAR_GAZE, not MASCOT_MOVE('')
    ]);
  });

  it('runs follow recipe script: processes all recipe ingredients through workstations', async () => {
    // Seed default entities for all recipe ingredients
    worldStore.setState({
      ...worldStore.getState(),
      entities: {
        ...worldStore.getState().entities,
        potato: { id: 'potato', ingredientId: 'potato', name: 'Potato', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
        egg: { id: 'egg', ingredientId: 'egg', name: 'Egg', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
        oil: { id: 'oil', ingredientId: 'oil', name: 'Oil', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
        onion: { id: 'onion', ingredientId: 'onion', name: 'Onion', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
        salt: { id: 'salt', ingredientId: 'salt', name: 'Salt', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
        pepper: { id: 'pepper', ingredientId: 'pepper', name: 'Pepper', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
      },
      containers: {
        ...worldStore.getState().containers,
        board: { id: 'board', name: 'Board', type: 'board', entityIds: [], rules: { maxCapacity: 10 } },
        sink: { id: 'sink', name: 'Sink', type: 'sink', entityIds: [], rules: { maxCapacity: 10 } },
        bowl: { id: 'bowl', name: 'Bowl', type: 'bowl', entityIds: [], rules: { maxCapacity: 10 } },
        burner1: { id: 'burner1', name: 'burner1', type: 'burner', entityIds: [], rules: { maxCapacity: 10 } },
        plate: { id: 'plate', name: 'Plate', type: 'plate', entityIds: [], rules: { maxCapacity: 10 } },
      },
    });

    await runFollowRecipeScript('concebolla', 'chef', 'board', 5);

    const state = worldStore.getState();
    // New concebolla routes ingredients through workstations and serves them on the plate
    expect(state.containers.plate.entityIds.length).toBeGreaterThanOrEqual(1);

    // All 6 ingredient catalog IDs should be accounted for in the world state (either directly or consumed into a mixture)
    const ingredientIds = ['potato', 'onion', 'egg', 'oil', 'salt', 'pepper'];
    const allWorldEntities = Object.values(state.entities);
    const allIngredientCatalogIds = allWorldEntities.map((e) => e?.ingredientId || e?.id);
    ingredientIds.forEach((id) => {
      expect(allIngredientCatalogIds.some((cid) => cid === id)).toBe(true);
    });
  });
});
</file>

<file path="src/systems/recipeRunner.test.ts">
/**
 * FILE: recipeRunner.test.ts
 *
 * PURPOSE:
 * Unit tests for the generic RecipeRunner step-based state machine.
 */

import { beforeEach, describe, expect, it } from 'vitest';
import { worldStore } from '../store/worldStore';
import { RecipeRunner } from './recipeRunner';
import { concebollaRecipe, clasicaRecipe } from '../data/catalog/recipes';
import type { Recipe } from '../types/Recipe';
import { clearActionLog, getActionLog } from '../store/middleware/actionLog';

function seedTestWorld() {
  worldStore.setState({
    entities: {
      chef: { id: 'chef', name: 'Chef Tortilla 🍳', type: 'mascot', state: { gazingAt: null } },
      onion: { id: 'onion', ingredientId: 'onion', name: 'Onion', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
      potato: { id: 'potato', ingredientId: 'potato', name: 'Potato', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
      egg: { id: 'egg', ingredientId: 'egg', name: 'Egg', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
      oil: { id: 'oil', ingredientId: 'oil', name: 'Oil', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
      salt: { id: 'salt', ingredientId: 'salt', name: 'Salt', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
      pepper: { id: 'pepper', ingredientId: 'pepper', name: 'Pepper', type: 'ingredient', state: { preparation: 'whole', cooking: 'raw' } },
    },
    containers: {
      despensa: {
        id: 'despensa',
        name: 'Despensa',
        type: 'storage',
        entityIds: ['onion', 'potato', 'egg', 'oil', 'salt', 'pepper'],
        rules: { isImmutable: true },
      },
      sink: {
        id: 'sink',
        name: 'Sink',
        type: 'sink',
        entityIds: [],
        rules: { maxCapacity: 10 },
      },
      board: {
        id: 'board',
        name: 'Board',
        type: 'board',
        entityIds: [],
        rules: { maxCapacity: 10 },
      },
      bowl: {
        id: 'bowl',
        name: 'Bowl',
        type: 'bowl',
        entityIds: [],
        rules: { maxCapacity: 10 },
      },
      burner1: {
        id: 'burner1',
        name: 'burner1',
        type: 'burner',
        entityIds: [],
        rules: { maxCapacity: 5 },
      },
      plate: {
        id: 'plate',
        name: 'Plate',
        type: 'plate',
        entityIds: [],
        rules: { maxCapacity: 5 },
      },
    },
    dispatch: worldStore.getState().dispatch,
  });
}

describe('RecipeRunner System', () => {
  beforeEach(() => {
    seedTestWorld();
    clearActionLog();
  });

  it('runs a declarative recipe and populates target container', async () => {
    const runner = new RecipeRunner({ mascotId: 'chef', defaultTargetId: 'board', delayMs: 5 });
    await runner.runRecipe(concebollaRecipe);

    const state = worldStore.getState();
    // New concebolla format uses a serve step that collects everything onto the plate
    expect(state.containers.plate.entityIds.length).toBeGreaterThanOrEqual(1);

    const actionNames = getActionLog().map((a) => a.action);
    expect(actionNames).toContain('MASCOT_MOVE');
    expect(actionNames).toContain('MASCOT_GRAB');
    expect(actionNames).toContain('MASCOT_DROP');
    expect(actionNames).toContain('MASCOT_FLIP');
  });

  it('mutates existing entity state for cut/prepare without creating new entity', async () => {
    // Move onion to board first
    const runner = new RecipeRunner({ mascotId: 'chef', defaultTargetId: 'board', delayMs: 5 });
    await runner.runSteps([
      { action: 'move', ingredient: 'onion', source: 'despensa', target: 'board' },
      { action: 'cut', ingredient: 'onion', style: 'diced', containerId: 'board' },
    ]);

    const state = worldStore.getState();
    const boardEntities = state.containers.board.entityIds.map((id) => state.entities[id]);
    const dicedOnion = boardEntities.find((e) => e?.ingredientId === 'onion');

    expect(dicedOnion).toBeDefined();
    // Verify entity ID was retained (no recreation!)
    expect(dicedOnion?.state?.preparation).toBe('diced');

    const actionNames = getActionLog().map((a) => a.action);
    expect(actionNames).toContain('PREPARE_INGREDIENT');
  });

  it('mutates existing entity state for cook step', async () => {
    const runner = new RecipeRunner({ mascotId: 'chef', defaultTargetId: 'burner1', delayMs: 5 });
    await runner.runSteps([
      { action: 'move', ingredient: 'potato', source: 'despensa', target: 'burner1' },
      { action: 'cook', ingredient: 'potato', method: 'fried', containerId: 'burner1' },
    ]);

    const state = worldStore.getState();
    const burner1Entities = state.containers.burner1.entityIds.map((id) => state.entities[id]);
    const friedPotato = burner1Entities.find((e) => e?.ingredientId === 'potato');

    expect(friedPotato).toBeDefined();
    expect(friedPotato?.state?.cooking).toBe('fried');

    const actionNames = getActionLog().map((a) => a.action);
    expect(actionNames).toContain('COOK_INGREDIENT');
  });

  it('handles speak, wait, and celebrate steps', async () => {
    const customRecipe: Recipe = {
      id: 'custom-test',
      name: 'Custom Test Recipe',
      requirements: [],
      steps: [
        { action: 'speak', message: 'Cooking initialized!' },
        { action: 'wait', durationMs: 10 },
        { action: 'celebrate' },
      ],
    };

    const runner = new RecipeRunner({ mascotId: 'chef', delayMs: 5 });
    await runner.runRecipe(customRecipe);

    const state = worldStore.getState();
    expect(state.entities.chef.state?.speechMessage).toBe('Cooking initialized!');
    // After celebrate step, clearTortillaGaze is called → gazingAt is null.
    expect(state.entities.chef.state?.gazingAt).toBeNull();
  });

  it('executes clasicaRecipe dictionary steps and state transformations', async () => {
    const runner = new RecipeRunner({ mascotId: 'chef', delayMs: 5 });
    await runner.runRecipe(clasicaRecipe);

    const state = worldStore.getState();
    const plateEntities = state.containers.plate.entityIds.map((id) => state.entities[id]);
    expect(plateEntities.length).toBeGreaterThan(0);

    const actionNames = getActionLog().map((a) => a.action);
    expect(actionNames).toContain('PREPARE_INGREDIENT');
    expect(actionNames).toContain('COOK_INGREDIENT');
    expect(actionNames).toContain('MASCOT_FLIP');
  });

  it('binds distinct entity IDs when dropping copies from immutable despensa container', async () => {
    const multiIngredientRecipe: Recipe = {
      id: 'multi-potato',
      name: 'Two Potatoes Recipe',
      requirements: [
        { id: 'p1', entityId: 'potato', amount: 1, unit: 'unit' },
        { id: 'p2', entityId: 'potato', amount: 1, unit: 'unit' },
      ],
      steps: [
        { action: 'move', ingredient: 'p1', source: 'despensa', target: 'board' },
        { action: 'cut', target: 'p1', style: 'diced', containerId: 'board' },
        { action: 'move', ingredient: 'p2', source: 'despensa', target: 'sink' },
        { action: 'wash', target: 'p2', containerId: 'sink' },
      ],
    };

    const runner = new RecipeRunner({ mascotId: 'chef', delayMs: 5 });
    await runner.runRecipe(multiIngredientRecipe);

    const p1Id = runner.recipeContext.bindings['p1'];
    const p2Id = runner.recipeContext.bindings['p2'];

    expect(p1Id).toBeDefined();
    expect(p2Id).toBeDefined();
    expect(p1Id).not.toBe(p2Id);

    const state = worldStore.getState();
    const p1Entity = state.entities[p1Id];
    const p2Entity = state.entities[p2Id];

    expect(p1Entity?.state?.preparation).toBe('diced');
    expect(p2Entity?.state?.preparation).toBe('washed');
  });

  it('creates a real mixture entity and consumes input ingredients on mix', async () => {
    const mixRecipe: Recipe = {
      id: 'mix-test',
      name: 'Mix Test',
      requirements: [
        { id: 'egg1', entityId: 'egg', amount: 1, unit: 'unit' },
        { id: 'salt1', entityId: 'salt', amount: 1, unit: 'unit' },
      ],
      steps: [
        { action: 'mix', inputs: ['egg1', 'salt1'], targetContainerId: 'bowl', output: 'batter' },
      ],
    };

    const runner = new RecipeRunner({ mascotId: 'chef', delayMs: 5 });
    await runner.runRecipe(mixRecipe);

    const state = worldStore.getState();
    const mixtureEntityId = runner.recipeContext.bindings['batter'];
    expect(mixtureEntityId).toBeDefined();

    const mixtureEntity = state.entities[mixtureEntityId];
    expect(mixtureEntity).toBeDefined();
    expect(mixtureEntity.name).toBe('batter');
    expect(state.containers.bowl.entityIds).toContain(mixtureEntityId);

    // Verify input ingredients were marked as consumed and removed from containers
    const eggEntity = state.entities[runner.recipeContext.bindings['egg1']];
    const saltEntity = state.entities[runner.recipeContext.bindings['salt1']];

    expect(eggEntity?.state?.consumed).toBe(true);
    expect(saltEntity?.state?.consumed).toBe(true);

    expect(state.containers.bowl.entityIds).not.toContain(eggEntity.id);
    expect(state.containers.bowl.entityIds).not.toContain(saltEntity.id);
  });

  it('ensures cooked sliced potatoes appear in the bowl before creating mixture entity during mix step', async () => {
    worldStore.getState().dispatch({
      type: 'ADD_ENTITY',
      payload: {
        entity: {
          id: 'cooked_potato_test',
          ingredientId: 'potato',
          name: 'Potato',
          type: 'ingredient',
          state: { preparation: 'sliced', cooking: 'fried' },
        },
        containerId: 'burner1',
      },
    });

    const runner = new RecipeRunner({ mascotId: 'chef', delayMs: 1 });
    runner.bindRecipeContext(clasicaRecipe);

    let cookedSlicedPotatoInBowlBeforeMixture = false;
    let potatoStateInBowl: Record<string, unknown> | undefined;

    const unsubscribe = worldStore.subscribe((currState) => {
      const bowlEntityIds = currState.containers.bowl?.entityIds || [];
      const mixtureExists = bowlEntityIds.some((id) => id.startsWith('mixture'));
      const potatoIdInBowl = bowlEntityIds.find((id) => {
        const e = currState.entities[id];
        return e && (e.ingredientId === 'potato' || e.id.includes('potato'));
      });

      if (potatoIdInBowl && !mixtureExists) {
        cookedSlicedPotatoInBowlBeforeMixture = true;
        potatoStateInBowl = currState.entities[potatoIdInBowl]?.state;
      }
    });

    await runner.runSteps([
      {
        action: 'mix',
        inputs: ['potatoes', 'eggs', 'salt', 'black_pepper'],
        targetContainerId: 'bowl',
        output: 'mixture',
      },
    ]);

    unsubscribe();

    expect(cookedSlicedPotatoInBowlBeforeMixture).toBe(true);
    expect(potatoStateInBowl).toBeDefined();
    expect(potatoStateInBowl?.preparation).toBe('sliced');
    expect(potatoStateInBowl?.cooking).toBe('fried');

    const finalBowlEntityIds = worldStore.getState().containers.bowl.entityIds;
    const mixtureId = runner.recipeContext.bindings['mixture'];
    expect(finalBowlEntityIds).toContain(mixtureId);
  });
});
</file>

<file path="src/components/Ingredients/IngredientListItem.tsx">
/**
 * FILE: IngredientListItem.tsx
 *
 * PURPOSE:
 * UI wrapper for an ingredient inside a list.
 *
 * RESPONSIBILITY:
 * - Connects ingredient rendering with list interactions.
 * - Provides drag/drop related UI behavior.
 */

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import type { Entity } from '../../types/world';

interface IngredientListItemProps {
  entity: Entity;
  containerId?: string;
}

export const IngredientListItem: React.FC<IngredientListItemProps> = ({ entity, containerId }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: entity.id,
  });

  const style: React.CSSProperties | undefined = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.6 : 1,
        zIndex: isDragging ? 1000 : 1,
        cursor: 'grab',
      }
    : {
        cursor: 'grab',
      };

  // Determine ingredient state badge (Raw, Prepared, Cooking, Finished)
  const renderStateBadge = () => {
    if (entity.type !== 'ingredient') return null;

    const prep = entity.state?.preparation as string | undefined;
    const cooking = entity.state?.cooking as string | undefined;
    const status = entity.state?.status as string | undefined;

    if (containerId === 'plate' || status?.includes('cooked') || status?.includes('fried') || status?.includes('tortilla')) {
      return <span className="ingredient-state-badge state-finished">Finished ✨</span>;
    }
    if (cooking && cooking !== 'raw') {
      return <span className="ingredient-state-badge state-cooking">Cooking 🔥</span>;
    }
    if (prep) {
      return <span className="ingredient-state-badge state-prepared">Prepared 🔪</span>;
    }
    return <span className="ingredient-state-badge state-raw">Raw 🌾</span>;
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`ingredient-list-item ${isDragging ? 'dragging' : ''}`}
    >
      <span className="ingredient-name">{entity.name}</span>
      {renderStateBadge()}
    </div>
  );
};
</file>

<file path="src/App.tsx">
/**
 * FILE: App.tsx
 *
 * PURPOSE:
 * Main React application component.
 *
 * RESPONSIBILITY:
 * - Creates the application layout.
 * - Connects major UI areas together.
 * - Acts as the entry point for the game world.
 *
 * SHOULD NOT:
 * - Contain game rules.
 * - Modify world state directly.
 */

import { Scene } from './components/Scene/Scene';
import { Mascot } from './components/Mascot/Mascot';
import { RecipePanel } from './components/Recipe/RecipePanel';

function App() {
  return (
    <div className="app-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '28px', color: 'var(--text-h)' }}>Tortilla World</h1>
          <p style={{ margin: '4px 0 0 0', color: 'var(--text)', opacity: 0.8 }}>
            An interactive simulation world. Drag entities from the immutable catalog pantry into workspace containers.
          </p>
        </div>
        <Mascot />
      </header>

      <main>
        <RecipePanel />
        <Scene />
      </main>
    </div>
  );
}

export default App;
</file>

<file path="src/components/Mascot/TortillaSvg.tsx">
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import type { GazePoint, GazeTarget } from "../../systems/gaze";
import type { MascotState } from "../../systems/mascot";
import "./TortillaSvg.scss";

export interface Potato {
  x: number;
  y: number;
  rx: number;
  ry: number;
  rotate: number;
}

export interface ToastMark {
  x: number;
  y: number;
  rx: number;
  ry: number;
  rotate: number;
}

export interface TortillaSvgProps {
  state?: MascotState | "flipping"; // Added 'flipping' if not in your MascotState yet
  radius?: number;
  pupilOffset?: { left: GazePoint; right: GazePoint };
  mouth?: string;
  leftEyeRef?: React.RefObject<SVGEllipseElement | null>;
  rightEyeRef?: React.RefObject<SVGEllipseElement | null>;
  width?: number | string;
  height?: number | string;
  potatoes?: Potato[];
  toastMarks?: ToastMark[];
  gazingAt?: GazeTarget;
  onDoubleClick?: (e: React.MouseEvent<SVGSVGElement>) => void;
}

const DEFAULT_POTATOES: Potato[] = [
  { x: -12, y: -10, rx: 4, ry: 3, rotate: 15 },
  { x: 14, y: 8, rx: 5, ry: 3.5, rotate: -25 },
  { x: -6, y: 12, rx: 4.5, ry: 3, rotate: 40 },
  { x: 8, y: -14, rx: 3.5, ry: 2.5, rotate: -10 },
];

const DEFAULT_TOAST_MARKS: ToastMark[] = [
  { x: -18, y: -12, rx: 3, ry: 2, rotate: 20 },
  { x: 12, y: -16, rx: 4, ry: 2.5, rotate: -15 },
  { x: -14, y: 14, rx: 3.5, ry: 2, rotate: 30 },
  { x: 16, y: 10, rx: 2.5, ry: 1.8, rotate: -45 },
];

export function TortillaSvg({
  state = "idle",
  radius = 28,
  pupilOffset: externalPupilOffset,
  mouth = "M -10 6 Q 0 16 10 6",
  leftEyeRef,
  rightEyeRef,
  width = 100,
  height = 100,
  potatoes = DEFAULT_POTATOES,
  toastMarks = DEFAULT_TOAST_MARKS,
  gazingAt,
  onDoubleClick,
}: TortillaSvgProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [targetOffset, setTargetOffset] = useState<{ left: GazePoint; right: GazePoint }>({
    left: { x: 0, y: 0 },
    right: { x: 0, y: 0 },
  });

  const handleDoubleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setIsFlipping(false);
      }, 800);
    }
    onDoubleClick?.(e);
  };

  useEffect(() => {
    if (externalPupilOffset) return;

    const computeOffsetFromPoint = (targetX: number, targetY: number) => {
      if (!svgRef.current) return { x: 0, y: 0 };
      const rect = svgRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = targetX - centerX;
      const dy = targetY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 1) return { x: 0, y: 0 };

      const angle = Math.atan2(dy, dx);
      const maxOffset = 3.5;
      const offsetDist = Math.min(distance / 60, 1) * maxOffset;

      const ox = Math.cos(angle) * offsetDist;
      const oy = Math.sin(angle) * offsetDist;

      return { x: ox, y: oy };
    };

    if (gazingAt?.type === "mouse") {
      const handleMouseMove = (e: MouseEvent) => {
        const offset = computeOffsetFromPoint(e.clientX, e.clientY);
        setTargetOffset({ left: offset, right: offset });
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }

    let animFrameId: number;

    const updateGaze = () => {
      if (!gazingAt) {
        setTargetOffset({ left: { x: 0, y: 0 }, right: { x: 0, y: 0 } });
        return;
      }

      if (gazingAt.type === "entity") {
        const entityId = gazingAt.entityId;
        if (!entityId) {
          setTargetOffset({ left: { x: 0, y: 0 }, right: { x: 0, y: 0 } });
          return;
        }

        // Search for element or container in DOM
        const el =
          document.querySelector(`[data-entity-id="${entityId}"]`) ||
          document.querySelector(`[data-ingredient-id="${entityId}"]`) ||
          document.querySelector(`[data-container-id="${entityId}"]`) ||
          document.getElementById(entityId);

        if (el) {
          const rect = el.getBoundingClientRect();
          const offset = computeOffsetFromPoint(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2
          );
          setTargetOffset({ left: offset, right: offset });
        } else {
          setTargetOffset({ left: { x: 0, y: 0 }, right: { x: 0, y: 0 } });
        }
      } else if (gazingAt.type === "point") {
        const offset = computeOffsetFromPoint(gazingAt.point.x, gazingAt.point.y);
        setTargetOffset({ left: offset, right: offset });
      } else {
        setTargetOffset({ left: { x: 0, y: 0 }, right: { x: 0, y: 0 } });
      }
    };

    const loop = () => {
      updateGaze();
      animFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, [externalPupilOffset, gazingAt]);

  const pupilOffset = externalPupilOffset || targetOffset;
  const r = radius ?? 28;
  const effectiveState = isFlipping ? "flipping" : state;

  return (
    <motion.svg
      ref={svgRef}
      viewBox="-40 -40 80 80"
      width={width}
      height={height}
      className={`tortilla-svg is-${effectiveState}`}
      onDoubleClick={handleDoubleClick}
      style={{ cursor: "pointer" }}
    >
      <defs>
        {/* Hauptkörper: Ei + Kartoffeln */}
        <radialGradient id="tortillaBody" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#fff8e1" />
          <stop offset="30%" stopColor="#f5d98e" />
          <stop offset="70%" stopColor="#e8b84a" />
          <stop offset="100%" stopColor="#c98a2a" />
        </radialGradient>

        {/* Gebräunter Rand */}
        <linearGradient id="crustEdge" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4953a" />
          <stop offset="50%" stopColor="#b8731f" />
          <stop offset="100%" stopColor="#8b5a1a" />
        </linearGradient>

        {/* Schatten unter der Tortilla */}
        <radialGradient id="dropShadow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#5a3a0a" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#5a3a0a" stopOpacity="0" />
        </radialGradient>

        {/* Öl-Glanz */}
        <linearGradient id="oilShine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        {/* Kartoffel-Textur */}
        <radialGradient id="potatoChunk" cx="30%" cy="30%">
          <stop offset="0%" stopColor="#fff5d6" />
          <stop offset="100%" stopColor="#e8c97a" />
        </radialGradient>

        {/* Zwiebel-Textur */}
        <radialGradient id="onionChunk" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f0e6d2" />
        </radialGradient>

        {/* Dampf für Cooking-State */}
        <linearGradient id="steam" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        <filter id="softShadow">
          <feDropShadow dx="0" dy="3" stdDeviation="3" opacity="0.3" />
        </filter>

        <filter id="innerGlow">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* === SCHATTEN === */}
      <ellipse
        cx="2"
        cy="22"
        rx={r * 0.9}
        ry={r * 0.7}
        fill="url(#dropShadow)"
      />

      {/* === TORTILLA-DICKE (Seitenansicht) === */}
      <ellipse
        cx="0"
        cy="8"
        rx={r * 0.95}
        ry={r * 0.85}
        fill="#7a4a15"
      />

      {/* === HAUPTKÖRPER === */}
      <ellipse
        cx="0"
        cy="0"
        rx={r}
        ry={r * 0.88}
        fill="url(#tortillaBody)"
        stroke="url(#crustEdge)"
        strokeWidth="2.5"
        filter="url(#softShadow)"
      />

      {/* === GEKRÄUSELTER RAND === */}
      <path
        d="M -28 -8 
           Q -32 -2 -30 5 
           Q -28 15 -20 22 
           Q -10 28 0 27 
           Q 12 28 22 22 
           Q 30 15 31 5 
           Q 32 -5 25 -15 
           Q 15 -25 0 -26 
           Q -15 -25 -28 -8 Z"
        fill="none"
        stroke="#b8731f"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        opacity="0.6"
      />

      {/* === KARTOFFEL-STÜCKE (aus Props) === */}
      {potatoes.map((potato, i) => (
        <g key={`potato-${i}`} transform={`rotate(${potato.rotate} ${potato.x} ${potato.y})`}>
          {/* Schatten */}
          <ellipse
            cx={potato.x + 0.5}
            cy={potato.y + 0.5}
            rx={potato.rx}
            ry={potato.ry}
            fill="#b8892a"
            opacity="0.4"
          />
          {/* Kartoffel */}
          <ellipse
            cx={potato.x}
            cy={potato.y}
            rx={potato.rx}
            ry={potato.ry}
            fill="url(#potatoChunk)"
            stroke="#d4a84a"
            strokeWidth="0.8"
          />
          {/* Highlight */}
          <ellipse
            cx={potato.x - 1}
            cy={potato.y - 1}
            rx={potato.rx * 0.4}
            ry={potato.ry * 0.3}
            fill="#ffffff"
            opacity="0.5"
          />
        </g>
      ))}

      {/* === ZWIEBEL-RINGE === */}
      {[
        { x: -22, y: -2, r: 3.5 },
        { x: 20, y: -8, r: 2.5 },
        { x: 8, y: -22, r: 2 },
        { x: -5, y: 20, r: 3 },
      ].map((onion, i) => (
        <g key={`onion-${i}`}>
          <circle
            cx={onion.x}
            cy={onion.y}
            r={onion.r}
            fill="none"
            stroke="#f5e6c8"
            strokeWidth="1.8"
            opacity="0.7"
          />
          <circle
            cx={onion.x}
            cy={onion.y}
            r={onion.r * 0.5}
            fill="none"
            stroke="#e8d5a8"
            strokeWidth="1"
            opacity="0.5"
          />
        </g>
      ))}

      {/* === GEBRÄUNTE STELLEN (aus Props) === */}
      {toastMarks.map((mark, i) => (
        <ellipse
          key={`toast-${i}`}
          cx={mark.x}
          cy={mark.y}
          rx={mark.rx}
          ry={mark.ry}
          fill="#8b5a1a"
          opacity="0.35"
          transform={`rotate(${mark.rotate} ${mark.x} ${mark.y})`}
        />
      ))}

      {/* === ÖL-GLANZ (mehrere Highlights) === */}
      <path
        d="M -15 -18 Q -5 -25 8 -20"
        fill="none"
        stroke="url(#oilShine)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 10 15 Q 18 18 24 12"
        fill="none"
        stroke="url(#oilShine)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <ellipse cx="-8" cy="-16" rx="3" ry="1.5" fill="#ffffff" opacity="0.3" transform="rotate(-20 -8 -16)" />

      {/* === BASILIKUM-BLATT (als "Haarschmuck") === */}
      <g transform="translate(18, -22) rotate(25)">
        <path
          d="M 0 0 Q -4 -8 0 -14 Q 4 -8 0 0 Z"
          fill="#5a8f3a"
          stroke="#4a7a2e"
          strokeWidth="0.8"
        />
        <path
          d="M 0 0 L 0 -12"
          fill="none"
          stroke="#4a7a2e"
          strokeWidth="0.5"
        />
        <ellipse cx="-1.5" cy="-5" rx="1" ry="0.8" fill="#6ba84a" opacity="0.7" />
        <ellipse cx="1.5" cy="-9" rx="0.8" ry="0.6" fill="#6ba84a" opacity="0.7" />
      </g>

      {/* === DAMPF (nur im Cooking-State) === */}
      {state === "cooking" && (
        <>
          <motion.path
            d="M -10 -28 Q -15 -38 -8 -45"
            fill="none"
            stroke="url(#steam)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: [0, 0.7, 0], y: [-2, -8, -15], x: [0, 3, -2] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          />
          <motion.path
            d="M 5 -30 Q 10 -40 3 -48"
            fill="none"
            stroke="url(#steam)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: [0, 0.6, 0], y: [-2, -10, -18], x: [0, -3, 2] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: 0.7 }}
          />
          <motion.path
            d="M 0 -32 Q -5 -42 2 -50"
            fill="none"
            stroke="url(#steam)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: [0, 0.5, 0], y: [-2, -12, -20], x: [0, 4, -3] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: 1.4 }}
          />
        </>
      )}

      {/* === GESICHT === */}

      {/* Wangen (Blush) */}
      <ellipse cx="-22" cy="6" rx="5" ry="3" fill="#e85a5a" opacity="0.25" filter="url(#innerGlow)" />
      <ellipse cx="22" cy="6" rx="5" ry="3" fill="#e85a5a" opacity="0.25" filter="url(#innerGlow)" />

      {/* Augen (Weiß) */}
      <ellipse ref={leftEyeRef} cx="-11" cy="-6" rx="8" ry="9" fill="#fff" />
      <ellipse ref={rightEyeRef} cx="11" cy="-6" rx="8" ry="9" fill="#fff" />

      {/* Augenlider (Blinzeln via CSS) */}
      <ellipse
        cx="-11"
        cy="-6"
        rx="8"
        ry="9"
        fill="#e8b84a"
        className="tortilla-blink"
        style={{ transformOrigin: "-11px -6px" }}
      />
      <ellipse
        cx="11"
        cy="-6"
        rx="8"
        ry="9"
        fill="#e8b84a"
        className="tortilla-blink"
        style={{ transformOrigin: "11px -6px" }}
      />

      {/* Pupillen */}
      <motion.circle
        cx="-11"
        cy="-6"
        r="3.5"
        fill="#3b2418"
        animate={{ x: pupilOffset.left.x, y: pupilOffset.left.y }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      <motion.circle
        cx="11"
        cy="-6"
        r="3.5"
        fill="#3b2418"
        animate={{ x: pupilOffset.right.x, y: pupilOffset.right.y }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />

      {/* Pupillen-Highlights */}
      <circle cx="-12.5" cy="-8" r="1.2" fill="white" />
      <circle cx="9.5" cy="-8" r="1.2" fill="white" />

      {/* Mund */}
      <motion.path
        d={mouth}
        fill="none"
        stroke="#3b2418"
        strokeWidth="3"
        strokeLinecap="round"
        animate={
          state === "celebrating"
            ? { scale: [1, 1.1, 1] }
            : state === "cooking"
            ? { d: ["M -14 4 Q 0 18 14 4", "M -14 5 Q 0 16 14 5", "M -14 4 Q 0 18 14 4"] }
            : {}
        }
        transition={
          state === "celebrating"
            ? { duration: 0.5, repeat: Infinity }
            : state === "cooking"
            ? { duration: 1.5, repeat: Infinity }
            : { duration: 0.2 }
        }
      />

      {/* Zunge (nur bei celebrating) */}
      {state === "celebrating" && (
        <motion.path
          d="M -6 12 Q 0 18 6 12"
          fill="#e85a5a"
          opacity="0.8"
          animate={{ scaleY: [1, 1.2, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}

      {/* === EXTRA: Kleine Krümel (Details) === */}
      <circle cx="-30" cy="5" r="1" fill="#c98a2a" opacity="0.5" />
      <circle cx="32" cy="-5" r="0.8" fill="#c98a2a" opacity="0.4" />
      <circle cx="28" cy="18" r="1.2" fill="#c98a2a" opacity="0.3" />
    </motion.svg>
  );
}
</file>

<file path="src/types/actions.ts">
/**
 * FILE: actions.ts
 *
 * PURPOSE:
 * Defines world actions/events.
 *
 * RESPONSIBILITY:
 * - Creates the communication contract between systems and store.
 */

import type { EntityType } from './world';
import type { PreparationStyle, CookingMethod } from './RecipeStep';

export type WorldAction =
  | {
    type: 'MOVE_ENTITY';
    payload: {
      entityId: string;
      targetContainerId: string;
      positionIndex?: number;
    };
  }
  | {
    type: 'ADD_ENTITY';
    payload: {
      entity: {
        id: string;
        name: string;
        type: EntityType;
        icon?: string;
        ingredientId?: string;
        state?: Record<string, unknown>;
      };
      containerId: string;
    };
  }
  | {
    type: 'TOGGLE_BURNER';
    payload: {
      containerId: string;
    };
  }
  | {
    type: 'REMOVE_ENTITY';
    payload: {
      entityId: string;
    };
  }
  | {
    type: 'UPDATE_ENTITY_STATE';
    payload: {
      entityId: string;
      changes: Record<string, unknown>;
    };
  }
  | {
    type: 'PREPARE_INGREDIENT';
    payload: {
      entityId: string;
      preparation: PreparationStyle;
    };
  }
  | {
    type: 'COOK_INGREDIENT';
    payload: {
      entityId: string;
      cooking: CookingMethod;
    };
  }
  | {
    type: 'USE_INGREDIENT';
    payload: {
      entityId: string;
      usedIn?: string;
    };
  }
  | {
    type: 'MASCOT_FLIP';
    payload: {
      mascotId?: string;
    };
  }
  | {
    type: 'MASCOT_MOVE';
    payload: {
      mascotId?: string;
      targetContainerId: string;
    };
  }
  | {
    type: 'MASCOT_GRAB';
    payload: {
      mascotId?: string;
      entityId: string;
      sourceContainerId?: string;
    };
  }
  | {
    type: 'MASCOT_DROP';
    payload: {
      mascotId?: string;
      targetContainerId: string;
      positionIndex?: number;
    };
  }
  | {
    type: 'MASCOT_CLEAR_GAZE';
    payload: {
      mascotId?: string;
    };
  }
  | {
    type: 'RESET_WORLD';
    payload?: Record<string, never>;
  };


export type WorldEvent =
  | {
    type: 'INGREDIENT_CONSUMED';
    payload: {
      entityId: string;
      consumedBy?: string;
    };
  };
</file>

<file path="src/types/world.ts">
/**
 * FILE: world.ts
 *
 * PURPOSE:
 * Defines complete world state structures.
 *
 * RESPONSIBILITY:
 * - Describes the game world's data model.
 */

import type { WorldAction, WorldEvent } from './actions';
import type { PreparationStyle, CookingMethod } from './RecipeStep';

export type EntityType = 'ingredient' | 'tool' | 'product' | 'mascot' | 'container' | string;
export type ContainerType = 'storage' | 'board' | 'plate' | 'trash' | 'bowl' | 'sink' | 'workstation' | 'burner';

export interface IngredientState {
  preparation?: PreparationStyle;
  cooking?: CookingMethod;
  status?: string;
  [key: string]: unknown;
}

export interface Entity {
  id: string;
  name: string;
  type: EntityType;
  icon?: string;
  ingredientId?: string;
  state?: IngredientState;
}

export interface ContainerRules {
  maxCapacity?: number;
  allowedTypes?: EntityType[];
  uniqueTypesOnly?: boolean;
  consumesOnDrag?: boolean;
  isImmutable?: boolean;
  customValidator?: ( 
    container: Container,
    entity: Entity,
    currentEntities: Entity[]
  ) => boolean;
}

export interface Container {
  id: string;
  name: string;
  type: ContainerType;
  entityIds: string[];
  rules?: ContainerRules;
  isOn?: boolean;
}

export interface WorldState {
  entities: Record<string, Entity>;
  containers: Record<string, Container>;
  dispatch: (action: WorldAction) => void;
}

export type { WorldAction, WorldEvent };
</file>

<file path="src/components/Scene/useSceneDragAndDrop.ts">
/**
 * FILE: useSceneDragAndDrop.ts
 *
 * PURPOSE:
 * React hook connecting drag/drop events with the game world.
 *
 * RESPONSIBILITY:
 * - Handles DnD lifecycle using dnd-kit sensors.
 * - Translates UI drag actions into pure MOVE_ENTITY actions.
 *
 * SHOULD NOT:
 * - Decide game rules or directly mutate state.
 */

import { useSensors, useSensor, PointerSensor, KeyboardSensor } from '@dnd-kit/core';
import type { DragStartEvent, DragOverEvent, DragEndEvent } from '@dnd-kit/core';
import { worldStore } from '../../store/worldStore';
import { updateMascotGaze } from '../../systems/gaze';

export function useSceneDragAndDrop() {
  // 1. Initialize dnd-kit sensors for mouse/touch and keyboard inputs
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: DragStartEvent) => {
    const entityId = String(event.active.id);
    updateMascotGaze('chef', { type: 'entity', entityId });
  };

  const handleDragOver = (event: DragOverEvent) => {
    if (event.over) {
      const containerId = String(event.over.id);
      updateMascotGaze('chef', { type: 'entity', entityId: containerId });
    }
  };

  // 2. Intercept the drop and dispatch a pure WorldAction
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // If dropped outside any valid droppable area, clear gaze
    if (!over) {
      updateMascotGaze('chef', null);
      return;
    }

    const entityId = String(active.id);
    const targetContainerId = String(over.id);

    updateMascotGaze('chef', { type: 'entity', entityId: targetContainerId });

    // Dispatch the intent. The ContainerRules engine inside worldStore
    // will intercept this and silently reject it if the container is full
    // or doesn't accept this entity type.
    worldStore.getState().dispatch({
      type: 'MOVE_ENTITY',
      payload: {
        entityId,
        targetContainerId,
      },
    });
  };

  return {
    sensors,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
}
</file>

<file path="src/components/Mascot/Mascot.tsx">
/**
 * FILE: Mascot.tsx
 *
 * PURPOSE:
 * Main Tortilla mascot component with physical movement and grabbing animations.
 *
 * RESPONSIBILITY:
 * - Controls mascot visual representation.
 * - Animates physical movement to target containers across the scene.
 * - Displays held ingredient badge and grab/drop motion feedback.
 *
 * SHOULD NOT:
 * - Own world state.
 * - Contain gameplay rules.
 */

import React, { useState, useEffect, useRef } from 'react';
import { useStore } from 'zustand';
import { worldStore } from '../../store/worldStore';
import { TortillaSvg } from './TortillaSvg';
import { runTortillaPotatoScript } from '../../systems/mascotActions';
import { ingredients } from '../../data/catalog/ingredients';
import type { GazeTarget } from '../../systems/gaze';
import { gazeEntityId } from '../../systems/gaze';

interface MascotProps {
  mascotId?: string;
}

export const Mascot: React.FC<MascotProps> = ({ mascotId = 'chef' }) => {
  const mascotEntity = useStore(worldStore, (state) => state.entities[mascotId]);
  const entities = useStore(worldStore, (state) => state.entities);
  const dispatch = useStore(worldStore, (state) => state.dispatch);
  
  const [isRunningScript, setIsRunningScript] = useState(false);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const mascotAnchorRef = useRef<HTMLDivElement>(null);

  // Derived from mascotEntity.state — use optional chaining so these stay safe
  // when mascotEntity is undefined, keeping every hook below unconditional.
  const gazingAt = (mascotEntity?.state?.gazingAt ?? null) as GazeTarget;
  const gazingAtEntityId = gazeEntityId(gazingAt);
  const targetContainerId = (mascotEntity?.state?.targetContainerId as string | undefined) ?? gazingAtEntityId ?? undefined;
  const state = (mascotEntity?.state?.state as string | undefined) || 'idle';
  const holdingEntityId = mascotEntity?.state?.holdingEntityId as string | undefined;
  const speechMessage = mascotEntity?.state?.speechMessage as string | undefined;

  // Resolve held entity and ingredient metadata
  const heldEntity = holdingEntityId ? entities[holdingEntityId] : undefined;
  const heldIngredientInfo = heldEntity
    ? ingredients.find(
        (i) => i.id === heldEntity.ingredientId || i.id === heldEntity.id || heldEntity.id.startsWith(i.id)
      )
    : undefined;

  // Calculate physical DOM position offset to target container
  useEffect(() => {
    const updatePosition = () => {
      if (!targetContainerId || !mascotAnchorRef.current) {
        setOffset({ x: 0, y: 0 });
        return;
      }

      const containerEl = document.querySelector(`[data-container-id="${targetContainerId}"]`);
      if (!containerEl) {
        setOffset({ x: 0, y: 0 });
        return;
      }

      const containerRect = containerEl.getBoundingClientRect();
      const mascotRect = mascotAnchorRef.current.getBoundingClientRect();

      // Calculate translation offset so mascot hovers above the container center
      const x = containerRect.left + containerRect.width / 2 - (mascotRect.left + mascotRect.width / 2);
      const y = containerRect.top - mascotRect.top - 15;

      setOffset({ x, y });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [targetContainerId]);

  // Guarded until after all hooks so hook call order never changes between renders.
  if (!mascotEntity) return null;

  const handleDoubleClick = () => {
    dispatch({ type: 'MASCOT_FLIP', payload: { mascotId } });
  };

  const handleRunScript = async () => {
    if (isRunningScript) return;
    setIsRunningScript(true);
    try {
      await runTortillaPotatoScript(mascotId, 650);
    } finally {
      setIsRunningScript(false);
    }
  };

  const isFloating = offset.x !== 0 || offset.y !== 0;

  return (
    <div
      className="mascot-card"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '12px 16px',
        background: 'var(--code-bg)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        flexWrap: 'wrap',
      }}
    >
      {/* Anchor box holding mascot location in layout */}
      <div
        ref={mascotAnchorRef}
        style={{
          width: '100px',
          height: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div
          className={`mascot-wrapper ${isFloating ? 'is-floating' : ''} ${holdingEntityId ? 'is-holding' : ''}`}
          style={
            {
              '--offset-x': `${offset.x}px`,
              '--offset-y': `${offset.y}px`,
            } as React.CSSProperties
          }
        >
          <TortillaSvg
            state={state}
            gazingAt={gazingAt}
            onDoubleClick={handleDoubleClick}
          />

          {/* Held Ingredient Badge ("Really Grab") */}
          {holdingEntityId && (
            <div className="mascot-held-badge">
              <span style={{ fontSize: '16px' }}>{heldIngredientInfo?.icon || '🥔'}</span>
              <span>{heldEntity?.name || heldIngredientInfo?.name || holdingEntityId}</span>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 style={{ margin: 0, fontSize: '16px', color: 'var(--text-h)' }}>{mascotEntity.name}</h3>
        {speechMessage && (
          <div
            className="mascot-speech-bubble"
            style={{
              margin: '6px 0',
              padding: '8px 12px',
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--text-h)',
              background: 'var(--card-bg, #ffffff)',
              border: '1px solid var(--primary, #e8b84a)',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>💬</span>
            <span>{speechMessage}</span>
          </div>
        )}
        <p style={{ margin: '4px 0 8px 0', fontSize: '13px', color: 'var(--text)' }}>
          Focus / Target: <strong>{targetContainerId || gazingAtEntityId || 'Kitchen Home'}</strong>
          {holdingEntityId && (
            <span style={{ marginLeft: '8px', color: 'var(--primary, #e8b84a)', fontWeight: 600 }}>
              (Carrying: {heldIngredientInfo?.icon || '🥔'} {heldEntity?.name || holdingEntityId})
            </span>
          )}
        </p>
        <button
          onClick={handleRunScript}
          disabled={isRunningScript}
          style={{
            padding: '8px 14px',
            fontSize: '12px',
            fontWeight: 600,
            color: '#ffffff',
            background: isRunningScript
              ? 'var(--border)'
              : 'linear-gradient(135deg, #e8b84a 0%, #d4953a 100%)',
            border: 'none',
            borderRadius: '8px',
            cursor: isRunningScript ? 'not-allowed' : 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
            transition: 'all 0.2s ease',
          }}
        >
          {isRunningScript ? '⏳ Executing Action Script...' : '▶ Script: Grab Potato ➔ Drop in Tabla ➔ Flip'}
        </button>
      </div>
    </div>
  );
};
</file>

<file path="src/components/Scene/Scene.tsx">
/**
 * FILE: Scene.tsx
 *
 * PURPOSE:
 * Main game scene renderer.
 *
 * RESPONSIBILITY:
 * - Displays entities in the world.
 * - Connects world state with visual components.
 *
 * DOMAIN:
 * The bridge between game world and React UI.
 */

import React from 'react';
import { useStore } from 'zustand';
import { DndContext } from '@dnd-kit/core';
import { worldStore } from '../../store/worldStore';
import { ContainerView } from '../World/ContainerView';
import { useSceneDragAndDrop } from './useSceneDragAndDrop';
import { RecipePlayer } from './RecipePlayer';

export const Scene: React.FC = () => {
  // 1. Mount the drag-and-drop input listeners and dispatch handler
  const { sensors, handleDragStart, handleDragOver, handleDragEnd } = useSceneDragAndDrop();

  // 2. Query the pure simulation state for rendering (hiding despensa container from UI view)
  const containersMap = useStore(worldStore, (state) => state.containers);
  const containers = Object.values(containersMap).filter((c) => c.id !== 'despensa');

  return (
    // 3. The DndContext wrapper acts as the physical input boundary
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="scene-container">
        <RecipePlayer
          renderWorkspace={(requirementsNode) => (
            <div className="scene-workspace">
              {requirementsNode}
              <div className="scene">
                {containers.map((container) => (
                  <ContainerView
                    key={container.id}
                    container={container}
                  />
                ))}
              </div>
            </div>
          )}
        />
      </div>
    </DndContext>
  );
};
</file>

<file path="src/store/worldStore.ts">
/**
 * FILE: worldStore.ts
 *
 * PURPOSE:
 * Central Zustand store for the game world composed from modular slices with Immer middleware.
 *
 * RESPONSIBILITY:
 * - Owns world state (entities, containers).
 * - Integrates slices and middleware (devtools, actionLog, immer).
 * - Dispatches actions to slice methods.
 */

import { createStore } from 'zustand/vanilla';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { WorldAction, WorldEvent } from '../types/world';
import { actionLog } from './middleware/actionLog';
import { defaultEntities, defaultContainers } from './defaults';
import { createEntitySlice } from './slices/entitySlice';
import { createContainerSlice } from './slices/containerSlice';
import { createMascotSlice } from './slices/mascotSlice';
import type { WorldStateStore } from './types';

const eventListeners = new Set<(event: WorldEvent) => void>();

export const worldStore = createStore<WorldStateStore>()(
  devtools(
    actionLog(
      immer((set, get, api) => ({
        ...createEntitySlice(set, get, api),
        ...createContainerSlice(set, get, api),
        ...createMascotSlice(set, get, api),

        // Deep clone initial state to avoid reference mutations
        entities: JSON.parse(JSON.stringify(defaultEntities)),
        containers: JSON.parse(JSON.stringify(defaultContainers)),
        events: [],

        emitEvent: (event: WorldEvent) => {
          set(
            (draft) => {
              draft.events.push(event);
            },
            false,
            event.type
          );
          eventListeners.forEach((listener) => listener(event));
        },

        onEvent: (listener: (event: WorldEvent) => void) => {
          eventListeners.add(listener);
          return () => {
            eventListeners.delete(listener);
          };
        },

        resetWorld: () => {
          set((draft) => {
            draft.entities = JSON.parse(JSON.stringify(defaultEntities));
            draft.containers = JSON.parse(JSON.stringify(defaultContainers));
            draft.events = [];
          }, false, 'RESET_WORLD');
        },

        dispatch: (action: WorldAction) => {
          const store = get();
          switch (action.type) {
            case 'MOVE_ENTITY':
              store.moveEntity(
                action.payload.entityId,
                action.payload.targetContainerId,
                action.payload.positionIndex
              );
              break;
            case 'TOGGLE_BURNER': {
              set((draft) => {
                const burner = draft.containers[action.payload.containerId];
                burner.isOn = !burner.isOn;
              });

              break;
            }
            case 'COOK_INGREDIENT':
              // fire on
              store.cookIngredient(action.payload.entityId, action.payload.cooking);
              break;
            case 'ADD_ENTITY':
              store.addEntity(action.payload.entity, action.payload.containerId);
              break;

            case 'REMOVE_ENTITY':
              store.removeEntity(action.payload.entityId);
              break;

            case 'UPDATE_ENTITY_STATE':
              store.updateEntityState(action.payload.entityId, action.payload.changes);
              break;

            case 'PREPARE_INGREDIENT':
              store.prepareIngredient(action.payload.entityId, action.payload.preparation);
              break;

            case 'USE_INGREDIENT':
              store.useIngredient(action.payload.entityId, action.payload.usedIn);
              break;

            case 'MASCOT_FLIP':
              store.mascotFlip(action.payload.mascotId);
              break;

            case 'MASCOT_MOVE':
              store.mascotMove(action.payload.targetContainerId, action.payload.mascotId);
              break;

            case 'MASCOT_GRAB':
              store.mascotGrab(
                action.payload.entityId,
                action.payload.sourceContainerId,
                action.payload.mascotId
              );
              break;

            case 'MASCOT_DROP':
              store.mascotDrop(
                action.payload.targetContainerId,
                action.payload.positionIndex,
                action.payload.mascotId
              );
              break;

            case 'MASCOT_CLEAR_GAZE':
              store.mascotClearGaze(action.payload.mascotId);
              break;

            case 'RESET_WORLD':
              store.resetWorld();
              break;
          }
        },
      }))
    ),
    { name: 'tortilla-world' }
  )
);

// if (import.meta.env.DEV) {
//   (window as any).worldStore = worldStore;
// }
</file>

</files>
`````

## File: src/components/Mascot/Mascot.tsx
`````typescript
/**
 * FILE: Mascot.tsx
 *
 * PURPOSE:
 * Main Tortilla mascot component with physical movement and grabbing animations.
 *
 * RESPONSIBILITY:
 * - Controls mascot visual representation.
 * - Animates physical movement to target containers across the scene.
 * - Displays held ingredient badge and grab/drop motion feedback.
 *
 * SHOULD NOT:
 * - Own world state.
 * - Contain gameplay rules.
 */

import React, { useState, useEffect, useRef } from 'react';
import { useStore } from 'zustand';
import { worldStore } from '../../store/worldStore';
import { TortillaSvg } from './TortillaSvg';
import { runTortillaPotatoScript } from '../../systems/mascotActions';
import { ingredients } from '../../data/catalog/ingredients';
import type { GazeTarget } from '../../systems/gaze';
import { gazeEntityId } from '../../systems/gaze';

interface MascotProps {
  mascotId?: string;
}

export const Mascot: React.FC<MascotProps> = ({ mascotId = 'chef' }) => {
  const mascotEntity = useStore(worldStore, (state) => state.entities[mascotId]);
  const entities = useStore(worldStore, (state) => state.entities);
  const dispatch = useStore(worldStore, (state) => state.dispatch);
  
  const [isRunningScript, setIsRunningScript] = useState(false);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const mascotAnchorRef = useRef<HTMLDivElement>(null);

  // Derived from mascotEntity.state — use optional chaining so these stay safe
  // when mascotEntity is undefined, keeping every hook below unconditional.
  const gazingAt = (mascotEntity?.state?.gazingAt ?? null) as GazeTarget;
  const gazingAtEntityId = gazeEntityId(gazingAt);
  const targetContainerId = (mascotEntity?.state?.targetContainerId as string | undefined) ?? gazingAtEntityId ?? undefined;
  const state = (mascotEntity?.state?.state as string | undefined) || 'idle';
  const holdingEntityId = mascotEntity?.state?.holdingEntityId as string | undefined;
  const speechMessage = mascotEntity?.state?.speechMessage as string | undefined;

  // Resolve held entity and ingredient metadata
  const heldEntity = holdingEntityId ? entities[holdingEntityId] : undefined;
  const heldIngredientInfo = heldEntity
    ? ingredients.find(
        (i) => i.id === heldEntity.ingredientId || i.id === heldEntity.id || heldEntity.id.startsWith(i.id)
      )
    : undefined;

  // Calculate physical DOM position offset to target container
  useEffect(() => {
    const updatePosition = () => {
      if (!targetContainerId || !mascotAnchorRef.current) {
        setOffset({ x: 0, y: 0 });
        return;
      }

      const containerEl = document.querySelector(`[data-container-id="${targetContainerId}"]`);
      if (!containerEl) {
        setOffset({ x: 0, y: 0 });
        return;
      }

      const containerRect = containerEl.getBoundingClientRect();
      const mascotRect = mascotAnchorRef.current.getBoundingClientRect();

      // Calculate translation offset so mascot hovers above the container center
      const x = containerRect.left + containerRect.width / 2 - (mascotRect.left + mascotRect.width / 2);
      const y = containerRect.top - mascotRect.top - 15;

      setOffset({ x, y });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [targetContainerId]);

  // Guarded until after all hooks so hook call order never changes between renders.
  if (!mascotEntity) return null;

  const handleDoubleClick = () => {
    dispatch({ type: 'MASCOT_FLIP', payload: { mascotId } });
  };

  const handleRunScript = async () => {
    if (isRunningScript) return;
    setIsRunningScript(true);
    try {
      await runTortillaPotatoScript(mascotId, 650);
    } finally {
      setIsRunningScript(false);
    }
  };

  const isFloating = offset.x !== 0 || offset.y !== 0;

  return (
    <div
      className="mascot-card"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '12px 16px',
        background: 'var(--code-bg)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        flexWrap: 'wrap',
      }}
    >
      {/* Anchor box holding mascot location in layout */}
      <div
        ref={mascotAnchorRef}
        style={{
          width: '100px',
          height: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div
          className={`mascot-wrapper ${isFloating ? 'is-floating' : ''} ${holdingEntityId ? 'is-holding' : ''}`}
          style={
            {
              '--offset-x': `${offset.x}px`,
              '--offset-y': `${offset.y}px`,
            } as React.CSSProperties
          }
        >
          <TortillaSvg
            state={state}
            gazingAt={gazingAt}
            onDoubleClick={handleDoubleClick}
          />

          {/* Held Ingredient Badge ("Really Grab") */}
          {holdingEntityId && (
            <div className="mascot-held-badge">
              <span style={{ fontSize: '16px' }}>{heldIngredientInfo?.icon || '🥔'}</span>
              <span>{heldEntity?.name || heldIngredientInfo?.name || holdingEntityId}</span>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 style={{ margin: 0, fontSize: '16px', color: 'var(--text-h)' }}>{mascotEntity.name}</h3>
        {speechMessage && (
          <div
            className="mascot-speech-bubble"
            style={{
              margin: '6px 0',
              padding: '8px 12px',
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--text-h)',
              background: 'var(--card-bg, #ffffff)',
              border: '1px solid var(--primary, #e8b84a)',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>💬</span>
            <span>{speechMessage}</span>
          </div>
        )}
        <p style={{ margin: '4px 0 8px 0', fontSize: '13px', color: 'var(--text)' }}>
          Focus / Target: <strong>{targetContainerId || gazingAtEntityId || 'Kitchen Home'}</strong>
          {holdingEntityId && (
            <span style={{ marginLeft: '8px', color: 'var(--primary, #e8b84a)', fontWeight: 600 }}>
              (Carrying: {heldIngredientInfo?.icon || '🥔'} {heldEntity?.name || holdingEntityId})
            </span>
          )}
        </p>
        <button
          onClick={handleRunScript}
          disabled={isRunningScript}
          style={{
            padding: '8px 14px',
            fontSize: '12px',
            fontWeight: 600,
            color: '#ffffff',
            background: isRunningScript
              ? 'var(--border)'
              : 'linear-gradient(135deg, #e8b84a 0%, #d4953a 100%)',
            border: 'none',
            borderRadius: '8px',
            cursor: isRunningScript ? 'not-allowed' : 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
            transition: 'all 0.2s ease',
          }}
        >
          {isRunningScript ? '⏳ Executing Action Script...' : '▶ Script: Grab Potato ➔ Drop in Tabla ➔ Flip'}
        </button>
      </div>
    </div>
  );
};
`````

## File: src/store/worldStore.ts
`````typescript
/**
 * FILE: worldStore.ts
 *
 * PURPOSE:
 * Central Zustand store for the game world composed from modular slices with Immer middleware.
 *
 * RESPONSIBILITY:
 * - Owns world state (entities, containers).
 * - Integrates slices and middleware (devtools, actionLog, immer).
 * - Dispatches actions to slice methods.
 */

import { createStore } from 'zustand/vanilla';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { WorldAction, WorldEvent } from '../types/world';
import { actionLog } from './middleware/actionLog';
import { defaultEntities, defaultContainers } from './defaults';
import { createEntitySlice } from './slices/entitySlice';
import { createContainerSlice } from './slices/containerSlice';
import { createMascotSlice } from './slices/mascotSlice';
import { createRecordSlice } from './slices/recordSlice';
import type { WorldStateStore } from './types';

const eventListeners = new Set<(event: WorldEvent) => void>();

export const worldStore = createStore<WorldStateStore>()(
  devtools(
    actionLog(
      immer((set, get, api) => ({
        ...createEntitySlice(set, get, api),
        ...createContainerSlice(set, get, api),
        ...createMascotSlice(set, get, api),
        ...createRecordSlice(set, get, api),

        // Deep clone initial state to avoid reference mutations
        entities: JSON.parse(JSON.stringify(defaultEntities)),
        containers: JSON.parse(JSON.stringify(defaultContainers)),
        events: [],

        emitEvent: (event: WorldEvent) => {
          set(
            (draft) => {
              draft.events.push(event);
            },
            false,
            event.type
          );
          eventListeners.forEach((listener) => listener(event));
        },

        onEvent: (listener: (event: WorldEvent) => void) => {
          eventListeners.add(listener);
          return () => {
            eventListeners.delete(listener);
          };
        },

        resetWorld: () => {
          set((draft) => {
            draft.entities = JSON.parse(JSON.stringify(defaultEntities));
            draft.containers = JSON.parse(JSON.stringify(defaultContainers));
            draft.events = [];
          }, false, 'RESET_WORLD');
        },

        dispatch: (action: WorldAction) => {
          const store = get();

          // Record action if recording is currently active
          if (store.isRecording) {
            store.recordAction(action);
          }

          switch (action.type) {
            case 'MOVE_ENTITY':
              store.moveEntity(
                action.payload.entityId,
                action.payload.targetContainerId,
                action.payload.positionIndex
              );
              break;
            case 'TOGGLE_BURNER':
            case 'TOGGLE_HEAT': {
              let updatedIsOn = false;
              let containerExists = false;

              set(
                (draft) => {
                  const targetContainer = draft.containers[action.payload.containerId];
                  if (targetContainer) {
                    targetContainer.isOn = !targetContainer.isOn;
                    updatedIsOn = targetContainer.isOn;
                    containerExists = true;
                  }
                },
                false,
                action.type
              );

              if (containerExists) {
                get().emitEvent({
                  type: 'CONTAINER_HEAT_TOGGLED',
                  payload: {
                    containerId: action.payload.containerId,
                    isOn: updatedIsOn,
                  },
                });
              }
              break;
            }
            case 'COOK_INGREDIENT':
              // fire on
              store.cookIngredient(action.payload.entityId, action.payload.cooking);
              break;
            case 'ADD_ENTITY':
              store.addEntity(action.payload.entity, action.payload.containerId);
              break;

            case 'REMOVE_ENTITY':
              store.removeEntity(action.payload.entityId);
              break;

            case 'UPDATE_ENTITY_STATE':
              store.updateEntityState(action.payload.entityId, action.payload.changes);
              break;

            case 'PREPARE_INGREDIENT':
              store.prepareIngredient(action.payload.entityId, action.payload.preparation);
              break;

            case 'USE_INGREDIENT':
              store.useIngredient(action.payload.entityId, action.payload.usedIn);
              break;

            case 'MASCOT_FLIP':
              store.mascotFlip(action.payload.mascotId);
              break;

            case 'MASCOT_MOVE':
              store.mascotMove(action.payload.targetContainerId, action.payload.mascotId);
              break;

            case 'MASCOT_GRAB':
              store.mascotGrab(
                action.payload.entityId,
                action.payload.sourceContainerId,
                action.payload.mascotId
              );
              break;

            case 'MASCOT_DROP':
              store.mascotDrop(
                action.payload.targetContainerId,
                action.payload.positionIndex,
                action.payload.mascotId
              );
              break;

            case 'MASCOT_CLEAR_GAZE':
              store.mascotClearGaze(action.payload.mascotId);
              break;

            case 'WASH_CONTAINER_CONTENTS': {
              const targetContainer = get().containers[action.payload.containerId];
              if (targetContainer) {
                const entityIds = [...targetContainer.entityIds];
                get().emitEvent({
                  type: 'CONTAINER_WASHED',
                  payload: {
                    containerId: action.payload.containerId,
                    entityIds,
                  },
                });
              }
              break;
            }

            case 'CUT_CONTAINER_CONTENTS': {
              const targetContainer = get().containers[action.payload.containerId];
              if (targetContainer) {
                const entityIds = [...targetContainer.entityIds];
                get().emitEvent({
                  type: 'CONTAINER_CUT',
                  payload: {
                    containerId: action.payload.containerId,
                    entityIds,
                  },
                });
              }
              break;
            }

            case 'PEEL_CONTAINER_CONTENTS': {
              const targetContainer = get().containers[action.payload.containerId];
              if (targetContainer) {
                const entityIds = [...targetContainer.entityIds];
                get().emitEvent({
                  type: 'CONTAINER_PEELED',
                  payload: {
                    containerId: action.payload.containerId,
                    entityIds,
                  },
                });
              }
              break;
            }

            case 'MIX_CONTAINER_CONTENTS': {
              const targetContainer = get().containers[action.payload.containerId];
              if (targetContainer) {
                const entityIds = [...targetContainer.entityIds];
                get().emitEvent({
                  type: 'CONTAINER_MIXED',
                  payload: {
                    containerId: action.payload.containerId,
                    entityIds,
                  },
                });
              }
              break;
            }

            case 'RESET_WORLD':
              store.resetWorld();
              break;
          }
        },
      }))
    ),
    { name: 'tortilla-world' }
  )
);

// if (import.meta.env.DEV) {
//   (window as any).worldStore = worldStore;
// }
`````
