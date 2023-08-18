import { Masonry } from "@mui/lab";
import React, { Children } from "react";

type NoteContainerProps = {
    children: React.ReactNode;
};

const NoteContainer: React.FC<NoteContainerProps> = ({ children }) => {
    const childElements = Children.toArray(children);

    return (
        <Masonry columns={{xs: 1, md: 2, lg: 4, xl: 5}} spacing={2} sx={{}}>
            {childElements.map((child, index) => (
                <div key={index}>
                    {child}
                </div>
            ))}
        </Masonry>
    );
};

export default NoteContainer;
