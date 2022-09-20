import Dialogs from "./Dialogs";

import {
  addNewMessageActionCreator,
  updateNewMessageActionCreator,
} from "../../redux/dialogsReducer";
//import StoreContext from "../../StoreContext";

import {connect} from "react-redux"

// const DialogsContainer = () => {
//   return (
//     <StoreContext.Consumer>
//       {(store) => {
//         const addNewMessage = () => {
//           store.dispatch(addNewMessageActionCreator());
//         };
//         const changeNewMessage = (text) => {
//           store.dispatch(updateNewMessageActionCreator(text));
//         };
//         return (
//           <Dialogs
//             addNewMessage={addNewMessage}
//             changeNewMessage={changeNewMessage}
//             dialogsPage={store.getState().dialogsPage}
//           />
//         );
//       }}
//     </StoreContext.Consumer>
//   );
// };

let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};
let mapDispatchToProps = (dispatch) => {
  return {
    addNewMessage:()=>{
     dispatch(addNewMessageActionCreator());
    },
    changeNewMessage:(text)=>{
    dispatch(updateNewMessageActionCreator(text));
    }
  };
};

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;
