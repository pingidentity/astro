import fit from '../../img/fit.svg';

// This component is largely copied from GoJS. It needs a serious refactor and could
// probably be done a lot more smoothly with React.

export default class ZoomSlider {
    /**
         * Constructs a ZoomSlider and sets up properties based on the options provided.
         * Also sets up change listeners on the Diagram so the ZoomSlider stays up-to-date.
         * @param {Diagram} diagram a reference to a GoJS Diagram
         * @param {Object=} options an optional JS Object describing options for the slider
         */

        _sliderDiv = null;

        constructor(diagram) {
            this.diagram = diagram;
            this._initialScale = diagram.scale;
            this._diagramDiv = diagram.div;

            // Prepare change listeners
            this.updateOnViewportBoundsChanged = () => { this.scaleToValue(); };
            this.init();
        }

        /**
         * @ignore
         * Initialize the slider.
         */
        init = () => {
            // Sets up the slider div and inner div's basic attributes and ids
            this.sliderDivSetup();
            // Set up the runtime code
            this.sliderListenerSetup();
        };
        /**
         * @ignore
         * Create the necessary divs for the slider and add the slider as a sibling of the diagram.
         */
        sliderDivSetup = () => {
            this._sliderDiv = document.createElement('div');
            this._sliderDiv.className = 'zoom-slider';
            // Initialize buttons and range input
            const zoomText = document.createElement('div');
            zoomText.className = 'zoom-slider__percentage';
            this._sliderDiv.appendChild(zoomText);
            const zoomOutBtn = document.createElement('div');
            zoomOutBtn.id = 'zoomSliderOut';
            zoomOutBtn.innerHTML = '&minus;';
            zoomOutBtn.className = 'zoom-slider__zoom-button';
            this._sliderDiv.appendChild(zoomOutBtn);
            const zoomDivider = document.createElement('div');
            zoomDivider.className = 'zoom-slider__divider';
            zoomText.id = 'zoomText';
            this._sliderDiv.appendChild(zoomDivider);
            const zoomRangeContainer = document.createElement('div');
            zoomRangeContainer.id = 'zoomSliderRangeCtn';
            zoomRangeContainer.className = 'zoom-slider__range-container';
            this._sliderDiv.appendChild(zoomRangeContainer);
            const zoomRangeInput = document.createElement('input');
            zoomRangeInput.id = 'zoomSliderRange';
            zoomRangeInput.type = 'range';
            zoomRangeInput.min = '-14';
            zoomRangeInput.max = '23';
            const zoomInBtn = document.createElement('div');
            zoomInBtn.className = 'zoom-slider__zoom-button';
            zoomInBtn.id = 'zoomSliderIn';
            zoomInBtn.innerHTML = '+';
            this._sliderDiv.appendChild(zoomInBtn);
            zoomRangeContainer.appendChild(zoomRangeInput);
            const zoomToFit = document.createElement('img');
            zoomToFit.src = fit;
            zoomToFit.className = 'zoom-slider__fit';
            zoomToFit.id = 'zoomToFit';
            zoomToFit.innerHTML = 'zoom';
            this._sliderDiv.appendChild(zoomToFit);
            // Adds the slider as a sibling of the diagram
            // IMPORTANT: the diagram div's parent element should use position: relative
            if (this._diagramDiv !== null) {
                const diagramParent = this._diagramDiv.parentElement;
                if (diagramParent !== null) {
                    diagramParent.appendChild(this._sliderDiv);
                }
            }
        };
        /**
         * @ignore
         * Add listeners to the buttons and range input.
         * Add a diagram listener.
         */
        sliderListenerSetup = () => {
            const zoomOutBtn = document.getElementById('zoomSliderOut');
            const zoomInBtn = document.getElementById('zoomSliderIn');
            const zoomRangeInput = document.getElementById('zoomSliderRange');
            const zoomToFit = document.getElementById('zoomToFit');
            if (zoomOutBtn === null || zoomInBtn === null || zoomRangeInput === null) { return; }
            // Set up diagram listener so the slider can be kept in sync with the diagram's scale
            this.diagram.addDiagramListener('ViewportBoundsChanged', this.updateOnViewportBoundsChanged);
            // Set up event handlers for buttons and input range slider
            zoomOutBtn.onclick = () => {
                zoomRangeInput.stepDown();
                this.valueToScale();
            };
            zoomInBtn.onclick = () => {
                zoomRangeInput.stepUp();
                this.valueToScale();
            };
            zoomToFit.onclick = () => {
                this.diagram.commandHandler.zoomToFit();
            };
            const valChanged = () => {
                this.valueToScale();
            };
            zoomRangeInput.oninput = valChanged;
            zoomRangeInput.onchange = valChanged;
        };
        /**
         * @ignore
         * Update the value of the slider input to match the diagram's scale.
         */
        scaleToValue = () => {
            const slider = document.getElementById('zoomSliderRange');
            const sliderText = document.getElementById('zoomText');
            const diagram = this.diagram;
            const A = this._initialScale;
            const B = diagram.commandHandler.zoomFactor;
            const y1 = diagram.scale;
            sliderText.innerHTML = `${(y1 * 100).toFixed(0)}%`;
            slider.value = Math.round(Math.log(y1 / A) / Math.log(B)).toString();
        };
        /**
         * @ignore
         * Update the diagram's scale to match the value of the slider input.
         */
        valueToScale = () => {
            const slider = document.getElementById('zoomSliderRange');
            const diagram = this.diagram;
            const x = parseFloat(slider.value);
            const A = this._initialScale;
            const B = diagram.commandHandler.zoomFactor;
            diagram.scale = A * (B ** x);
        };
        /**
         * Remove the slider from the page.
         */
        remove = () => {
            // Remove the listener attached to diagram
            this.diagram.removeDiagramListener('ViewportBoundsChanged', this.updateOnViewportBoundsChanged);
            if (this._sliderDiv !== null) {
                this._sliderDiv.innerHTML = '';
                if (this._sliderDiv.parentElement) {
                    this._sliderDiv.parentElement.removeChild(this._sliderDiv);
                }
                this._sliderDiv = null;
            }
        };
}
