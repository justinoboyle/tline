/**
 * A timeline layer.
 */
export default class Layer {
    /**
     * @param {Timeline} parent The Timeline parent object.
     * @param {number} index The current index of the Layer. 
     */
    constructor(parent, index) {
        this.parent = parent;
        this.index = index;
        this._dirty = false;
    }

    _markDirty() {
        this._dirty = true;
    }

    _isDirty() {
        return this._dirty;
    }

    _clean() {
        this._dirty = false;
    }
}