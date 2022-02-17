import React, { Component } from 'react';
import Bar from './Bar';
import './Visualizer.css'
// import TeX from 'react-formula-beautifier';
import Tex2SVG from "react-hook-mathjax";

class Visualizer extends Component {
    static defaultProps = {
        arraySize: 100
    }
    constructor(props) {
        super(props)
        this.state = {
            nums:this.shuffle(Array.from({length: this.props.arraySize}, (v, i) => 4*i)),
            color:Array.from({length:this.props.arraySize}, () => '#00acee'),
            border: Array.from({length:this.props.arraySize}, () => 'black'),
            comparisons:0,
            currentSort: null,
            isSorting: false
        }
    }
   
    sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    shuffle = (array) => {
        let currentIndex = array.length,  randomIndex;
        while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    bubbleSort = async (e) => {

        console.log(e)
       
        let { nums, color } = this.state
        
        for(var i = 0; i < nums.length; i++){
            for(var j = 0; j < ( nums.length - i -1 ); j++) {
                
                color[j] = '#d3cfd4'
                color[j+1] = '#d3cfd4' 
                this.setState({color})
                await this.sleep(10)

                if(nums[j] > nums[j+1]){
                    var temp = nums[j]
                    nums[j] = nums[j + 1]
                    nums[j+1] = temp
                    color[j] = 'orange'
                    color[j+1] = 'orange'    
                }
                this.setState(st => ({comparisons: st.comparisons + 1}))
                this.setState({nums,color})

                color[j] = '#00acee'
                color[j+1] = '#00acee'

                await this.sleep(10) 
            }
            color[nums.length-i-1] = '#00ff91' 
            this.setState({color})
        }
    }

    insertionSort = async () => {
        this.setState({sorting: true})
        const { nums, color } = this.state
        let n = nums.length;

        for (let i = 1; i < n; i++) {
            let current = nums[i];
            for(let k=0;k<i;k++) color[k] = '#00ff91'
            color[i] = '#d3cfd4'
            let j = i-1; 
            while ((j >= 0) && (nums[j] > current)) {
                nums[j+1] = nums[j];
                nums[j] = current;
                color[j] = '#d3cfd4'
                j--;
                this.setState({nums, color})
                await this.sleep(30)
                color[j+1] = '#00ff91'
                this.setState(st => ({comparisons: st.comparisons + 1}))
                this.setState({color})
            }
            nums[j+1] = current;
            this.setState({nums})
        }
    }

    merge = async (arr, l, m, r) => {
        var n1 = m - l + 1;
        var n2 = r - m;
        var L = new Array(n1); 
        var R = new Array(n2);
        for (var i = 0; i < n1; i++)
            L[i] = arr[l + i];
        for (var j = 0; j < n2; j++)
            R[j] = arr[m + 1 + j];

        i = 0;
        j = 0;
        var k = l;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                arr[k] = L[i];
                i++;
            }
            else {
                arr[k] = R[j];
                j++;
            }
            k++;    
            await this.sleep(50)
            this.setState(st => ({comparisons: st.comparisons + 1})) 
            this.setState({nums:arr})   
        }
        while (i < n1) {
            arr[k] = L[i];
            i++;
            k++;
            await this.sleep(50)
            this.setState({nums:arr})
        }
        while (j < n2) {
            arr[k] = R[j];
            j++;
            k++;
            await this.sleep(50)
            this.setState({nums:arr})
        }
    }

    mergeSort = async (arr,l, r) => {
        this.setState({sorting: true})
        if(l<r) {
        let { color } = this.state
        var m =l+ parseInt((r-l)/2);
        color[m] = '#d3cfd4'
 
        await this.mergeSort(arr,l,m);
        for(let i=l;i<=m;i++)
        color[i] = '#00ff91'

        this.setState({color})
        
        await this.mergeSort(arr,m+1,r);
        for(let i=m;i<=r;i++)
        color[i] = '#00ff91'

        this.setState({color})

        await this.sleep(50)
        this.setState({nums: arr})

        await this.merge(arr,l,m,r);
        
        this.setState({nums: arr})

        }
    }

    selectionSort = async () => {
        this.setState({sorting: true}) 
        let {nums, color} = this.state
        let n = nums.length;
            
        for(let i = 0; i < n; i++) {
            let minIdx = i;
            color[minIdx] = 'orange'
            await this.sleep(10)
            this.setState({color})

            for(let j = i+1; j < n; j++){
                color[j] = '#d3cfd4'
                this.setState({color})
                await this.sleep(10)
                
                this.setState(st => ({comparisons: st.comparisons + 1}))
                if(nums[j] < nums[minIdx]) {
                    color[minIdx] = '#00acee'
                    minIdx=j;
                    color[minIdx] = 'orange'
                    this.setState({color})
                    await this.sleep(10) 
                }

                color[j] = '#00acee'
                color[minIdx] = 'orange'
            }

            if (minIdx !== i) {
                let tmp = nums[i]; 
                nums[i] = nums[minIdx];
                nums[minIdx] = tmp;
                
                this.setState({nums, color})
                await this.sleep(10)     
            }

            for(let k=0;k<=i;k++)
            color[k] = '#00ff91'
            for(let k=i+1;k<n;k++)
            color[k] = '#00acee'
        }
    }

    swap(arr, i, j) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    
    async partition(arr, low, high) {
        let { color } = this.state
        let pivot = arr[high];
        color[high] = '#d3cfd4'
        this.setState({color})
        await this.sleep(50)

        let i = (low - 1);
     
        for (let j = low; j <= high - 1; j++) {
     
            if (arr[j] < pivot) {
                i++;
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;

                this.setState({nums: arr})
                await this.sleep(50)
            }

            this.setState(st => ({comparisons: st.comparisons + 1}))
            
        }

        this.swap(arr, i + 1, high);
        color[i+1] = '#00ff91'
        color[high] = '#00acee'
        this.setState({nums: arr, color})
        await this.sleep(50)

        return (i + 1);
    }
     
    async quickSort(arr, low, high) {
        if (low < high) {

            let { color } = this.state
            let pi = await this.partition(arr, low, high);
            color[pi] = '#00ff91'

            await this.quickSort(arr, low, pi - 1);
            for(let i=low;i<=pi-1;i++)
            {
                color[i] = '#00ff91';
                this.setState({color})
                await this.sleep(10)
            }

            await this.quickSort(arr, pi + 1, high);
            for(let i=pi+1;i<=high;i++)
            {   
                color[i] = '#00ff91'
                this.setState({color})
                await this.sleep(10)
            }
        }
    }

    handleSort = async (e) => {
        let sort = e.target.name
        this.setState({currentSort: sort})
        
        if(sort === 'bubble') 
        {   
            this.setState({isSorting: true})
            await this.bubbleSort()
            this.setState({isSorting: false})
        }
        if(sort === 'insertion') 
        {   
            this.setState({isSorting: true})
            await this.insertionSort()
            this.setState({isSorting: false})
        }
        if(sort === 'selection') 
        {   
            this.setState({isSorting: true})
            await this.selectionSort()
            this.setState({isSorting: false})
        }
        if(sort === 'merge') 
        {  
            this.setState({isSorting: true})
            await this.mergeSort(this.state.nums, 0, this.state.nums.length-1)
            this.setState({isSorting: false})
        }
        if(sort === 'quick') 
        {   
            this.setState({isSorting: true})
            await this.quickSort(this.state.nums, 0, this.state.nums.length-1)
            this.setState({isSorting: false})
        }
    }


    refresh = () => {
        window.location.reload(true);
    }

    render() {
        let {currentSort} = this.state
        let tcomplex = (currentSort === 'insertion' || currentSort ==='selection' || currentSort === 'bubble' || currentSort === 'quick')
                         ? "O(n^2)"
                         : (currentSort !== null ? 'O(n*log(n))' : null)
        let scomplex = (currentSort === 'insertion' || currentSort ==='selection' || currentSort === 'bubble')
                         ? 'O(1)' 
                         : (currentSort === 'merge' ? 'O(n)' : currentSort !== null ? 'O(n)' : null)
        console.log(tcomplex)
        return (
            <div>
                <h1 className='header'>
                <span style={{fontSize:'65px'}}>S</span>
                <span style={{fontSize:'23px'}}>O</span>
                <span style={{fontSize:'26px'}}>R</span>
                <span style={{fontSize:'29px'}}>T</span>
                <span style={{fontSize:'32px'}}>S</span>
                <span style={{fontSize:'35px'}}>-</span>
                <span style={{fontSize:'38px'}}>V</span>
                <span style={{fontSize:'41px'}}>I</span>
                <span style={{fontSize:'44px'}}>S</span>
                <span style={{fontSize:'47px'}}>U</span>
                <span style={{fontSize:'50px'}}>A</span>
                <span style={{fontSize:'53px'}}>L</span>
                <span style={{fontSize:'56px'}}>I</span>
                <span style={{fontSize:'59px'}}>Z</span>
                <span style={{fontSize:'62px'}}>E</span>
                <span style={{fontSize:'65px'}}>R</span>
                
                </h1>

                <div className='visualizer'>
                    <div className='visualizer-bars'>
                        {
                            this.state.nums.map((num, idx) => {
                                this.sleep(50)
                                return <Bar 
                                height={num} 
                                color={this.state.color[idx]}
                                border={this.state.border[idx]}
                                 />
                            })
                        }
                        
                        
                    </div>
                    
                    <div className='visualizer-sort-options'>
                        <h2 style={{letterSpacing:'4px'}}>SORTS</h2>

                        <button 
                        onClick={this.handleSort} 
                        style={this.state.isSorting ? {cursor: 'not-allowed'} : {}}
                        disabled={this.state.isSorting}
                        className= {this.state.currentSort === 'bubble' ? `button active` : `button`}
                        name='bubble'
                        >
                        Bubble
                        </button>

                        <button 
                        onClick={this.handleSort} 
                        style={this.state.isSorting ? {cursor: 'not-allowed'} : {}}
                        disabled={this.state.isSorting}
                        className= {this.state.currentSort === 'insertion' ? `button active` : `button`}
                        name='insertion'
                        >
                        Insertion
                        </button>

                        <button 
                        className= {this.state.currentSort === 'merge' ? `button active` : `button`}
                        style={this.state.isSorting ? {cursor: 'not-allowed'} : {}}
                        disabled={this.state.isSorting}
                        onClick={this.handleSort}
                        name='merge'
                        >
                        Merge
                        </button>

                        <button 
                        className= {this.state.currentSort === 'selection' ? `button active` : `button`} 
                        style={this.state.isSorting ? {cursor: 'not-allowed'} : {}}
                        disabled={this.state.isSorting}
                        onClick={this.handleSort} 
                        name='selection'
                        >
                        Selection
                        </button>

                        <button 
                        className= {this.state.currentSort === 'quick' ? `button active` : `button`}
                        style={this.state.isSorting ? {cursor: 'not-allowed'} : {}} 
                        disabled={this.state.isSorting}
                        onClick={this.handleSort}
                        name='quick'
                        >
                        Quick
                        </button>

                        <div className='visualizer-sort-controls'>
                            <h2 style={{letterSpacing:'4px'}}>OPTIONS</h2>
                            <button 
                            onClick={this.refresh} 
                            className='button'
                            >
                            Refresh
                            </button>
                        </div>

                    </div>
                </div>
                
                <div style={{display:'flex', flexDirection:'column'}}>
                    <p style={{color:'white',float:'left', marginLeft:'25%', letterSpacing:'3px' , textAlign:'left'}}>{this.state.comparisons} comparisons have been done so far</p>
                    
                    {
                        currentSort !== null ? (<div style={{display:'flex', float:'left',}}>
                        <p style={{color: 'white', marginTop:'0', marginLeft:'250px', letterSpacing:'2px'}} >Time Complexity : {tcomplex}</p>
                        <p style={{color: 'white', marginTop:'0', marginLeft:'300px', letterSpacing:'2px'}} >Space Complexity : {scomplex} </p>
                        </div>) : ''
                    }
                    
                </div>
                
                
            </div>
            
        )
    }
}

export default Visualizer