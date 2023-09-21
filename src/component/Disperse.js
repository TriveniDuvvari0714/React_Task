import React, { useState } from 'react'



function Disperse() {
    const [text, setText] = useState('');
    const [lines, setLines] = useState([]);
    const [duplicate, setDuplicate] = useState(false);
    const [amountError, setamountError] = useState(false);
    const [errLine, seterrLine] = useState([]);
    const [duplicatesDetail, setduplicatesDetail] = useState([]);
  
    const handleTextChange = (event) => {
      const newText = event.target.value;
      setText(newText);
      const linesArray = newText.split('\n').filter((line) => line.trim() !== '');
      setLines(linesArray);
      console.log(linesArray);
    };

    const onSubmit = () => {
        const regex = /^[0-9]+$/;
        const duplicatesDetails = [];
        const seen = new Set();
        const seendupDetails = new Set();
        const err = [];
        seterrLine([]);
        setamountError(false);
        lines.map((line,index) => {
            if(line){
                const lineList = line.split(/[ =,]+/);
                console.log(lineList);
                if(regex.test(lineList[1])){
                }else{
                    err.push(index+1+',');
                }
                if(!seen.has(line.split(/[ =,]+/)[0])){
                  seen.add(line.split(/[ =,]+/)[0]);
                   
              }else{
                if(!seendupDetails.has(line.split(/[ =,]+/)[0])){
                  seendupDetails.add(line.split(/[ =,]+/)[0])
                  duplicatesDetails.push({'code':line.split(/[ =,]+/)[0],'lines':''});
                }
                
              }
            }
        });

        if(err.length == 0){
          duplicatesDetails.map((parent,index) => {
            lines.map((child,i) => {
                if(parent.code  == child.split(/[ =,]+/)[0]){
                duplicatesDetails[index].lines = duplicatesDetails[index].lines + parseInt(i+1) +","
                }
            });
        });
        }        

        duplicatesDetails.map((child) => {
          child.lines = child.lines.slice(0,child.lines.lastIndexOf(','));         
      });
      if(err.length > 0){
        setamountError(true);
      }
       seterrLine(err);
       setduplicatesDetail(duplicatesDetails);
      if(duplicatesDetails.length > 0){
        setDuplicate(true);
      }
      debugger;
      if(duplicatesDetails.length == 0 && err == 0){
        alert("Submitted")
      }
        
    }

    const keepFirstOne = () => {
        const seen = new Set();
        const result = [];
        var keepFirst = '';
        lines.map((line,index) => {
            if(line){
                const lineList = line.split(/[ =,]+/);
               console.log(lineList[0]);
                if (!seen.has(lineList[0])) {
                  seen.add(lineList[0]);
                  result.push(lineList[0] + ' ' + lineList[1]);
                }
                
            
            }
        })
        result.map(item => {
          keepFirst += item+'\r' 
        })
        setText(keepFirst);
        setDuplicate(false);
        setduplicatesDetail([]);
        setLines([]);
    }

    const combineBalances = () => {
        const seen = new Set();
        const result = [];
        var combineres = '';
        lines.map((line,index) => {
            if(line){
                const lineList = line.split(/[ =,]+/);
                if(!seen.has(lineList[0])){
                    seen.add(lineList[0]);
                    result.push({'code':lineList[0],'value':0,'lines':''});
                }
            }
        });
            result.map((parent,index) => {
                lines.map((child,i) => {
                    if(parent.code  == child.split(/[ =,]+/)[0]){
                    result[index].value = parseInt(result[index].value) + parseInt(child.split(/[ =,]+/)[1]);
                    }
                });
                
            });
          result.map(item => {
            combineres += item.code + ' ' + item.value+'\r' 
          }
            );
          setText(combineres);
          setDuplicate(false);
          setLines([]);
          setduplicatesDetail([]);

        }
  
    return (
      <div className='submit_form'>
         <div className='title'>
            Address with Amount
         </div>
         <div className="line-numbered-textarea">
           <div className="line-numbers">
          {lines.map((_, index) => (
            <div key={index} className="line-number">
              {index + 1}
            </div>
          ))}
        </div>
        <textarea
          value={text}
          onChange={handleTextChange}
        />
      </div>
      {amountError && <div className='errLines'>Line {errLine} Wrong Amount</div>}
      {duplicate &&  
           <div>
              <div className='duplicate'> 
                Duplicated <span className='methods'><a  onClick={keepFirstOne}>Keep the frist one </a> | <a onClick={combineBalances}>Combine Balance</a></span>
              </div>
              
            </div>}
            {duplicate && <div className='duplicate_details'>
            {duplicate && duplicatesDetail.map((item) =>
              
                <p className='duplicate_error'>Address {item.code} Encountered duplicated in Line {item.lines}</p>
              
               )}
            </div>}
     
           
        
          
        <div>
           <button className='submitBtn' onClick={onSubmit}>Next</button>
        </div>
      </div>
   

    );
  }
  
  export default Disperse;