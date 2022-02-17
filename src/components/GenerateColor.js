import React, { Component } from 'react'
import TextInput from './TextInput'

export default class GenerateColor extends Component {
    constructor(props){
        super(props);
        this.state= {
            redInput : '0',
            greenInput: '0',
            blueInput: '0',
            inputError: {
                isError: false,
                id: null
            }
        }

        this.resultRef= React.createRef();
    }

    componentDidMount(){
        const {redInput, greenInput, blueInput}= this.state;
        this.resultRef.current.style.backgroundColor= `rgb(${redInput}, ${greenInput}, ${blueInput})`
    }

    handleChange= (e)=>{
        const inputVal= e.target.value;
        //const {redInput, greenInput, blueInput}= this.state;
        if(this.state.inputError.isError && e.target.id !== this.state.inputError.id){
            return;
        }else{
        // if(this.state.inputError) return;
        //conditional: if the input value does not contain any nondigit
        if(inputVal.search(/\D/) === -1){

           //conditional: if the input val is a number between 0 and 255 (0 and 255 inclusive)
            if(parseInt(inputVal) >= 0 && parseInt(inputVal) <= 255){
                //if input value < 10 prepend 0 to the value and modify state
                //else modify state only
                inputVal < 10 ?
                    this.setState({
                        [e.target.id]: '0'+parseInt(inputVal),
                        inputError: {isError: false, id: null}
                    }) :
                    this.setState({
                        [e.target.id]: parseInt(inputVal),
                        inputError: {isError: false, id: null}
                    })
                    return
            }else{
                if(inputVal === null || inputVal === undefined || inputVal === ''){
                    this.setState({
                        [e.target.id]: '0',
                        inputError: {isError: false, id: null}
                    })
                    return
                }
                this.setState({...this.state, inputError: {isError: true, id: e.target.id}})
            }
        }else{
            this.setState({...this.state, inputError: {isError: true, id: e.target.id}})
            return;
        }
    }
    }

    /*componentDidUpdate is used as it's a better option than placing it within the handleChange fxn where setState is used */
    /*update the concatenated RGB result and set the color of the result div*/
    componentDidUpdate(){
        const red= this.state.redInput.toString();
        const green= this.state.greenInput.toString();
        const blue= this.state.blueInput.toString();

        /**set the background color of the result using the values of the different input states (redInput,greenInput,blueInput)*/
        this.resultRef.current.style.backgroundColor= `rgb(${red}, ${green}, ${blue})`;
    }

    render() {
        
        return (
            <div>
                <div id="inputSet">
                    <TextInput inputid= 'redInput' inputState= {this.state.redInput} labelval= 'Red' handlechange= {this.handleChange}/>
                    <TextInput inputid= 'greenInput'  inputState= {this.state.greenInput} labelval= 'Green' handlechange= {this.handleChange}/>
                    <TextInput inputid= 'blueInput'  inputState= {this.state.blueInput} labelval= 'Blue' handlechange= {this.handleChange}/>
                </div>
                <div id="notInput">
                    <div id="error" style={{color:'red'}}>{this.state.inputError.isError && 'Error'}</div>
                    <div id="result" ref= {this.resultRef}></div>
                </div>
            </div>
        )
    }
}
