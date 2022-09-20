
import classes from "./Dialogs.module.css";
import DialogUser from "./DialogUser/DialogUser";
import MessageUser from "./MessageUser/MessageUser";



const Dialogs = ({ addNewMessage, changeNewMessage,dialogsPage }) => {
  const addMessage = () => {
    addNewMessage();
  };
  const changeMessage = (e) => {
    let text = e.target.value;
    changeNewMessage(text);
  };

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogs__users}>
        <ul>
          {dialogsPage.dialog.map((user) => (
            <DialogUser key={user.id}  name={user.name} img={user.img} id={user.id} />
          ))}
        </ul>
      </div>
      <div className={classes.dialogs__messages}>
        <ul>
          {dialogsPage.messages.map((user) => (
            <MessageUser key={user.id} message={user.message} id={user.id} />
          ))}
        </ul>
        <input
          value={dialogsPage.newMessage}
          onChange={changeMessage}
          type="text"
        />
        <button onClick={addMessage}>Send</button>
      </div>
    </div>
  );
};

export default Dialogs;
