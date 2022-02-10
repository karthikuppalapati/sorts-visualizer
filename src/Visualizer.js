import React, { Component } from 'react';
import Bar from './Bar';
import './Visualizer.css'

class Visualizer extends Component {
    static defaultProps = {
        arraySize: 100
    }
    constructor(props) {
        super()
        this.state = {
            nums:this.shuffle(Array.from({length: 100}, (v, i) => 4*i)),
            color:Array.from({length:100}, () => '#00acee'),
            sorting: false
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

    bubbleSort = async () => {
        this.setState({sorting: true})
        let { nums, color } = this.state
        
        for(var i = 0; i < nums.length; i++){
            for(var j = 0; j < ( nums.length - i -1 ); j++) {
                
                color[j] = '#d3cfd4'
                color[j+1] = '#d3cfd4' 

                if(nums[j] > nums[j+1]){
                    var temp = nums[j]
                    nums[j] = nums[j + 1]
                    nums[j+1] = temp
                                
                }

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
            let min = i;
            color[min] = '#d3cfd4'
            await this.sleep(50)
            this.setState({color})

            for(let j = i+1; j < n; j++){
                color[j] = '#d3cfd4'
                await this.sleep(50)
                this.setState({color})

                if(nums[j] < nums[min]) {
                    color[min] = '#00acee'
                    min=j;
                    color[min] = '#d3cfd4'
                    this.setState({color})
                    await this.sleep(50) 
                }

                color[j] = '#00acee'
                color[min] = '#d3cfd4'
            }

            if (min !== i) {
                let tmp = nums[i]; 
                nums[i] = nums[min];
                nums[min] = tmp; 
                this.setState({nums})     
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
            
        }

        this.swap(arr, i + 1, high);
        color[i+1] = '#00ff91'
        color[high] = '#00acee'
        this.setState({nums: arr, color})
        await this.sleep(50)

        return (i + 1);
    }
     
    async quickSort(arr, low, high) {
        this.setState({sorting: true})
        if (low < high) {

            let { color } = this.state
            let pi = await this.partition(arr, low, high);
            color[pi] = '#00ff91'

            await this.quickSort(arr, low, pi - 1);
            for(let i=low;i<=pi-1;i++)
            {color[i] = '#00ff91';
            this.setState({color})
            await this.sleep(50)}

            await this.quickSort(arr, pi + 1, high);
            for(let i=pi+1;i<=high;i++)
            {color[i] = '#00ff91'
            this.setState({color})
            await this.sleep(50)}
        }
    }


    refresh = () => {
        window.location.reload(true);
    }

    render() {
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
                                return <Bar 
                                height={num} 
                                color={this.state.color[idx]}
                                 />
                            })
                        }
                    </div>

                    <div className='visualizer-sort-options'>
                        <h2 style={{letterSpacing:'4px'}}>SORTS</h2>
                        <button 
                        onClick={this.bubbleSort} 
                        className='glow-on-hover' 
                        disabled={this.state.sorting}
                        style={this.state.sorting ? {cursor:'not-allowed'} : {}}
                        >
                        Bubble
                        </button>

                        <button 
                        onClick={this.insertionSort} 
                        className='glow-on-hover'
                        disabled={this.state.sorting}
                        style={this.state.sorting ? {cursor:'not-allowed'} : {}} 
                        >
                        Insertion
                        </button>

                        <button 
                        className='glow-on-hover' 
                        onClick={() => this.mergeSort(this.state.nums, 0, 99)}
                        disabled={this.state.sorting}
                        style={this.state.sorting ? {cursor:'not-allowed'} : {}}
                        >
                        Merge
                        </button>

                        <button 
                        className='glow-on-hover' 
                        onClick={this.selectionSort} 
                        disabled={this.state.sorting}
                        style={this.state.sorting ? {cursor:'not-allowed'} : {}}
                        >
                        Selection
                        </button>

                        <button 
                        className='glow-on-hover' 
                        onClick={() => this.quickSort(this.state.nums, 0, this.state.nums.length-1)}
                        disabled={this.state.sorting}
                        style={this.state.sorting ? {cursor:'not-allowed'} : {}} 
                        >
                        Quick
                        </button>

                        <div className='visualizer-sort-controls'>
                            <h2 style={{letterSpacing:'4px'}}>OPTIONS</h2>
                            <button 
                            onClick={this.refresh} 
                            className='glow-on-hover'
                            >
                            Refresh
                            </button>
                        </div>

                    </div>
                </div>

                <div>
                        <p  style={{color:'white'}}>CopyRights © 2022, Karthik Uppalapati</p>
                </div>
            </div>
            
        )
    }
}

export default Visualizer