let idTracker = 1;

function manageBand(state = { bands: [] }, action) {
  switch (action.type) {
    case "ADD_BAND":
      const band = { id: idTracker, name: action.name };
      idTracker++;
      return { ...state, bands: [...state.bands, band] };
    case "DELETE_BAND":
      const bands = state.bands.filter(band => band.id !== action.id);
      return { bands };
    default:
      return state;
  }
}

export default manageBand;
