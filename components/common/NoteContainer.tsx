import React, { Children } from "react";

type NoteContainerProps = {
    children: React.ReactNode;
};

const NoteContainer: React.FC<NoteContainerProps> = ({ children }) => {
    const childElements = Children.toArray(children);

    return (
        <div className="masonry">
            {childElements.reverse().map((child, index) => (
                <div className="item" key={index}>
                    {child}
                </div>
            ))}
        </div>
    );
};

export default NoteContainer;
