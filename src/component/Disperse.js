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
        const err = [];
        lines.map((line,index) => {
            if(line){
                const lineList = line.split(' ');
                if(regex.test(lineList[1])){
                  setamountError(false);
                }else{
                    err.push(index+1+',');
                    setamountError(true);
                }
                if(!seen.has(line.split(' ')[0])){
                  seen.add(line.split(' ')[0]);
                   
              }else{
                duplicatesDetails.push({'code':line.split(' ')[0],'lines':''});
              }
            }
        });

        if(err.length == 0){
          duplicatesDetails.map((parent,index) => {
            lines.map((child,i) => {
                if(parent.code  == child.split(' ')[0]){
                duplicatesDetails[index].lines = duplicatesDetails[index].lines + parseInt(i+1) +","
                }
            });
        });
        }        

        duplicatesDetails.map((child,i) => {
          child.lines = child.lines.slice(0,child.lines.lastIndexOf(','));         
      });
       seterrLine(err);
       setduplicatesDetail(duplicatesDetails);
      if(duplicatesDetails.length > 0){
        setDuplicate(true);
      }
      if(!duplicate && !amountError && err.length == 0){
        alert("Submitted Successfully");
        setText('')
      }
        
    }

    const keepFirstOne = () => {
        const seen = new Set();
        const result = [];
        var keepFirst = '';
        lines.map((line,index) => {
            if(line){
                const lineList = line.split(' ');
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
        setLines([]);
    }

    const combineBalances = () => {
        const seen = new Set();
        const result = [];
        var combineres = '';
        lines.map((line,index) => {
            if(line){
                const lineList = line.split(' ');
                if(!seen.has(lineList[0])){
                    seen.add(lineList[0]);
                    result.push({'code':lineList[0],'value':0,'lines':''});
                }
            }
        });
            result.map((parent,index) => {
                lines.map((child,i) => {
                    if(parent.code  == child.split(' ')[0]){
                    result[index].value = parseInt(result[index].value) + parseInt(child.split(' ')[1]);
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
      {duplicate && duplicatesDetail.map((item) =>
              <div className='duplicate_details'>Address {item.code} Encountered duplicated in Line {item.lines}</div>
               )}
           
        
          
        <div>
           <button className='submitBtn' onClick={onSubmit}>Next</button>
        </div>
      </div>
   

    );
  }
  
  export default Disperse;