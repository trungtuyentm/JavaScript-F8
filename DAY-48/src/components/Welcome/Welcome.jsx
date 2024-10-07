import { useContext, useRef } from "react";
import Context from "../../store/countContext/CountContext";
function Welcome() {
    const [state] = useContext(Context);
    const { numberOfAttempt, fromNumber, toNumber } = state;
    const count = useRef(numberOfAttempt);
    return (
        <div className="flex flex-col gap-3">
            <h3 className="text-[#319795] text-5xl font-bold">
                Chào mừng bạn đến với trò chơi đoán số!
            </h3>
            <h3 className="text-[#2c7a7b] text-5xl font-bold">
                Còn {numberOfAttempt + "/" + count.current} lượt
            </h3>
            <h3 className="text-[#285e61] text-5xl font-bold">
                Bạn cần tìm kiếm 1 số từ {fromNumber} đến {toNumber}
            </h3>
        </div>
    );
}
export default Welcome;
