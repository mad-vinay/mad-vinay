import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Styled from "./style";

const Progress = ({count, currentItem}) => {
    return <Styled.Container
        count={count}
        currentItem={currentItem}
    >
        { generateProgress(count, currentItem) }
    </Styled.Container>
}

const generateProgress = (count, currentItem) => {
    let progressItems = Array.from({ length: count }, (value, index) => index);

    return progressItems.map((val, index) => {
        if (index === count-1) {
            return (
                <Styled.Circle key={index} index={index} currentItem={currentItem} />
            );
        } else {
            return (
                <Fragment key={index}>
                    <Styled.Circle index={index} currentItem={currentItem} />
                    <span className="lineItem"></span>
                </Fragment>
            );
        }
    })
}

Progress.propTypes = {
    count: PropTypes.number,
    currentItem: PropTypes.number
}

export default Progress;