function CheckBox() {
    const roles = ["Design", "Development", "Support", "Other"];
    return (
        <>
            {roles.map((role, index) => (
                <div className="inline-flex items-center" key={index}>
                    <label className="relative flex items-center cursor-pointer p-3 rounded-full">
                        <input
                            type="radio"
                            name="type"
                            className="peer relative appearance-none w-5 h-5 border rounded-full border-blue-gray-200 cursor-pointer transition-all before:content[''] before:block before:bg-blue-gray-500 before:w-12 before:h-12 before:rounded-full before:absolute before:top-2/4 before:left-2/4 before:-translate-y-2/4 before:-translate-x-2/4 before:opacity-0 hover:before:opacity-10 before:transition-opacity text-gray-900 checked:border-gray-900 checked:before:bg-gray-900"
                        />
                    </label>
                    <label className="text-gray-700 font-light select-none cursor-pointer mt-px">
                        {role}
                    </label>
                </div>
            ))}
        </>
    );
}

export default CheckBox;
