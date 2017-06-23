// Testing Suite
import assert from 'assert';
import 'babel-regenerator-runtime';
import 'babel-polyfill';

// App Imports
import index from '../src/index.js';
const { Timeline } = index;

// Sample test
describe('Timeline', () => {
    let timeline, layer1, addedLayers = [];
    it('constructor should create a timeline instance', done => {
            const _timeline = new Timeline();
            assert.equal(!!_timeline, true);
            timeline = _timeline;
            done();
    });
    it('should allow creation of layers', done => {
        layer1 = timeline.newLayer();
        assert.equal(!!layer1, true);
        done();
    });
    it('returned layer should have the index of 0', done => {
        assert.equal(layer1.index, 0);
        done();
    });
    it('should not fail when adding multiple layers', done => {
        for(let i = 0; i < 199; i++)
            addedLayers.push(timeline.newLayer());
        assert.equal(timeline._layers.length, 200);
        done();
    });
    it('all layers have the correct index', done => {
        for(let i in timeline._layers)
            assert.equal(timeline._layers[i].index, i);
        done();
    });
    describe('splicing', () => {
        it('should allow for adding a value in between', done => {
            let index = 30;
            timeline._layers[index].__ID = 'testing';
            timeline.newLayer(index-1);
            assert.equal(timeline._layers[index+1].__ID, 'testing');
            done();
        })
    })
});
