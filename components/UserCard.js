import { useSelector } from "react-redux";

const UserCard = () => {
    const userData = useSelector(state => state.user);

    return (
        <div className="border p-3 text-center">
            Welcome, <b>{ userData.name }</b>
        </div>
    );
}

export default UserCard;