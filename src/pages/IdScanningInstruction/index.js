import React, {
  Component
} from "react";
import Button from "@material-ui/core/Button";
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Page from "../../components/Page";
import ProgressSteps from '../../components/ProgressSteps';
import Title from '../../components/Title';

import { getMockData } from "../../services/apis/getMockData";
import Styled from './style';
// debugger
export default class IdScanningInstruction extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {
        "heading": "Captura la cédula del cliente",
        "subheading": "captura las dos caras de la cedula de identidad",
        "description": "asegurandote que el número del documento, nombre fecha de nacimiento y firma sean claramente legibles",
        "options": [
            {
                "text": "usar cédula paraguaya",
                "details": ""
            },
            {
                "text": "usar documento extranjero",
                "details": "(i.e: pasaporte, cédula argentina...)"
            }
        ]
    },
      selectedOption: 0,
    }   
  }
  
  loadPageData = () => {
    
    getMockData('idcaptureintroduction').then(({result})=>{
      this.setState({
        data: {...result},
      });
    })
  }

  handleBackButton = () => {
    const { history } = this.props;
    history.goBack();
  }

  handleContinue = () => {
    this.props.history.push("/IdScanning");    
  }

  render() {
    const { history } = this.props;
    const { data } = this.state;
    return (
      <Page
        pageTitle={"Cédula de identidad"}
        backBtnPresent={true}
        logoPresent={false}
        history={history}
        handleBackButton={this.handleBackButton}
      >
        <ProgressSteps count={5} currentItem={2} />
        <Styled.Content>
        
        <Title title={data.heading} size="23px"/>
        <h5> {data.subheading}</h5>
        <p> {data.description}</p>
        <div className="imageWrapper">
          <img style={{width: "14rem"}} alt="id scanning" src="../../../images/icn-flipId@3x.png" />
        </div>
        <RadioGroup
            onChange={()=>{}}
            value="0"
            name="option"
            aria-label="Options"
            
          >
            {
              data.options.map((option, index) => (
                <FormControlLabel disabled={index ? true : false} key={index} className="options" value={index.toString()} control={<Radio />} label={`${option.text}${option.details}`} />
              ))
            }      
        </RadioGroup>
      </Styled.Content>
      <Styled.ButtonWrapper>
        <Button onClick={this.handleContinue} variant="contained" color="secondary">CONFIRMAR</Button>
      </Styled.ButtonWrapper>
      </Page>
    );}}
