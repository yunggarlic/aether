import { receiveMessage } from './reducer/messages';
import {
  receiveInstrument,
  receiveAllInstruments,
  dragInstrument,
  removeInstrument,
} from './reducer/instruments';
// import { instruments } from './engine/main';
import Instrument from './components/Instruments/Instrument';
import { removeMessage } from './reducer/messages';
import store from './store';

export default (socket) => {
  socket.on('new_message', (message) => {
    store.dispatch(receiveMessage(message));
  });
  socket.on('hover', (hoverHighlight) => {
    store.dispatch(highlight(hoverHighlight));
  });
  socket.on('spawn_all_instruments', (instruments) => {
    store.dispatch(receiveAllInstruments(instruments));
    instruments.forEach((instrument) => spawnInstrument(instrument));
  });
  socket.on('spawn_instrument', (data) => {
    spawnInstrument(data);
  });
  socket.on('update_instrument', (instrument) => {
    const { id, position, soundType, soundIndex } = instrument;
    const updatedInstrument = instruments.find(
      (instrument) => instrument.mesh.reduxid === id
    );

    updatedInstrument.updatePosition(
      instrument.position[0],
      instrument.position[1]
    );
    store.dispatch(dragInstrument(id, position, soundType, soundIndex));
  });
  socket.on('instrument_pitch_up', (data) => {
    const { id, position, soundType, soundIndex } = data;
    const updatedInstrument = instruments.find(
      (instrument) => instrument.mesh.reduxid === id
    );

    updatedInstrument.pitchUp();
    store.dispatch(dragInstrument(id, position, soundType, soundIndex));
  });
  socket.on('delete_instrument', (id) => {
    const deletedInstrument = instruments.find(
      (instrument) => instrument.mesh.reduxid === id
    );
    deletedInstrument.smash();
    store.dispatch(removeInstrument(id));
  });
  socket.on('delete_message', (id) => {
    store.dispatch(removeMessage(id));
  });
};

const spawnInstrument = (data) => {
  const instrument = new Instrument(
    data.id,
    data.position,
    data.soundType,
    data.soundIndex
  );
  instrument.init();
  store.dispatch(receiveInstrument(data));
};
