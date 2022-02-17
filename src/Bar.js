import React, { Component } from 'react'
import './Bar.css'
class Bar extends Component {
    render() {
        let styles = {
            width:'10px',
            height:`${this.props.height}px`,
            margin:'1px',
            backgroundColor:`${this.props.color}`,
            border: `0.1px solid ${this.props.border}`
        }
        return (
            <div style={styles} className={`Bar ${this.props.isShifting ? 'shifting' : ''} ${this.props.isSorted ? 'sorted' : ''}`} >
                
                {/* <p style={{fontSize:'5px', color:'white'}}>{this.props.height}</p> */}
            </div>
        )
    }
}

export default Bar


