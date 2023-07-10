const NoPostError = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="mt-10">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                    Error code: 500
                </h2>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    The post does not exist
                </h3>
            </div>
        </div>
    );
};

export default NoPostError;
