import './User.css';
import kissImage from './assets/kiss.png';

function User({ exp, username, }) {
    return (<div className="user-container">
        <LevelBar exp={exp}/>
        <span>{username}</span>
        <UserIcon />
    </div>)
}

function LevelBar({ exp }) {
    const percentage = exp % 100;
    return (
        <div className="level-bar">
            <div className="level-bar-progress" style={{ width: `${percentage}%` }}></div>
        </div>
    );
}

function UserIcon() {
    return <img src={kissImage} alt="User icon" className="user-icon" />
}

export default User;