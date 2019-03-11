import React from "react";

import Page from "../../components/Page";
import Styled from "./styled";

const PageNotFound = (props) => (    
      <Page
        pageTitle={""}
        backBtnPresent={false}
        logoPresent={true}
        history={props.history}
        handleBackButton={() => {}}
      >       
          <Styled.Content> <h3> Page cannot be found</h3> </Styled.Content>
      </Page>
    );

export default PageNotFound;