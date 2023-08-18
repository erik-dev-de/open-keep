"use client";

type WrapperProps = {
    children: React.ReactNode
};

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
    return (
        <div className="p-6 mt-16 flex-1 w-full">
            {children}
        </div>
    );
};

export default Wrapper;