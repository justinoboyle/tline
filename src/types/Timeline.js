import Layer from './Layer';
/**
 * The generic Timeline object, typically holds a session of listeners.
 */
export default class Timeline {

    /**
     * @param {object} options An object of options for the new Timeline.
     * @param {string} options.name A name for the timeline.
     */
    constructor(options) {
        // Set the defaults
        options = Object.assign({
            name: "",
            length: 0,
            _tickIndex: 0,
            _sessions: {},
            _layers: [],
            _dirty: false
        }, options);

        // Apply it to ourself!
        for(let i in options) this[i] = options[i];
    }
    
    /**
     * Creates a new layer and inserts it above where specified, or by default the top.
     * @param {number} [above=top] The index of the layer to create the new layer on top of.
     * @return {Layer} The layer that was just inserted into the index.
     */
    newLayer(above = this._layers.length - 1) {
        this._clean();
        const index = above + 1,
              layer = new Layer(this, index);
        this._layers.splice(index, 0, layer);
        this._markDirty();
        this._clean();
        return layer;
    }

    /**
     * Check if the Timeline or any of its components are dirty.
     */
    _isDirty() {
        if(_dirty) return true;
        // Check if any of the layers are dirty.
        for(let l of this._layers) if(l._isDirty()) return true;
        return false;
    }
    /**
     * Cleans the timeline or any of its components if they are dirty.
     */
    _clean() {
        // Let's make sure all the layers are in order!
        for(let l in this._layers) {
            const layer = this._layers[l];

            // Assign their index values if they are set incorrectly.
            if(!layer.index == l) {
                layer.index = l;
                layer._markDirty();
            }
                
            if(layer._isDirty())
                layer._clean();
        }
        // Ok, all clean.
        this._dirty = false;
    }
    /**
     * Marks the Timeline as dirty.
     */
    _markDirty() {
        this._dirty = true;
    }
}