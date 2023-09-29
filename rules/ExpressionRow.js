export default class ExpressionRow {
  constructor(simpleexpleft, operator, simpleexpright, parent) {
    this.simpleexpleft = simpleexpleft;
    this.operator = operator;
    this.simpleexpright = simpleexpright
    this.parent = parent;
    this.isSelected = false;
  }
}

//Adds properties isSelected and parent to each node.
export function AddIsSelected(exprows, parent) {
  exprows.forEach((row) => {
    if (row.expressionrows)
      AddIsSelected(row.expressionrows, row);
    row.isSelected = false;
    row.parent = parent;
  });
}

export function ExpressionRowsAddNew(exprows) {
  let newexprow = new ExpressionRow('', '', '');
  if (exprows.length == 0) {
    parent = new { operator: 'AND', expressionrows: [] };
    exprows.push(parent);
  }
  else
    parent = exprows[0];
  parent.expressionrows.push(newexprow);
  newexprow.parent = parent;
  return exprows;
}

export function ExpressionRowAdd0(exprows) {
  let newexprow = new ExpressionRow('', '', '');
  if (exprows.length == 0)
    exprows.push(new { operator: 'AND', expressionrows: [newexprow] });
  else {
    let exprows0 = exprows[0].expressionrows.slice();
    // expressionrows[0].expressionrows = [...expressionrows[0].expressionrows, newexprow];
    exprows0.splice(exprows0.length, 0, newexprow);
    exprows[0].expressionrows = exprows0;
  }
}

export function ExpresssionRowsDeleteRecursive(exprows) {
  for (let i = exprows.length - 1; i >= 0; i--)
    if (exprows[i].isSelected) exprows.splice(i, 1);
    else if (exprows[i].expressionrows) ExpresssionRowsDeleteRecursive(exprows[i].expressionrows);
  return exprows;
}

export function ExpresssionRowsLeftRecursive(exprows) {
  for (let i = exprows.length - 1; i >= 0; i--) {
    let exprow = exprows[i];
    let exprowparent = exprow.parent;
    if (exprow.isSelected && exprowparent && exprowparent.parent) {
      let parentindex = exprowparent.parent.expressionrows.indexOf(exprowparent);
      exprows.splice(i, 1);
      // exprowparent.parent.expressionrows.push(exprow);
      exprowparent.parent.expressionrows.splice(parentindex, 0, exprow);
      exprow.parent = exprowparent.parent;
      exprow.isSelected = false;
      if (exprowparent.expressionrows.length == 0)
        exprowparent.parent.expressionrows.splice(parentindex + 1, 1);
    } else if (exprows[i].expressionrows) ExpresssionRowsLeftRecursive(exprows[i].expressionrows);
  }
  return exprows;
}

function ExpressionRowsFindNearestSublevel(exprows, i) {
  for (let j = i + 1; j < exprows.length; j++) if (exprows[j].expressionrows) return j;
  for (let j = i - 1; j >= 0; j--) if (exprows[j].expressionrows) return j;
  return -1;
}

function ExpressionRowsFindFirstSimpleExp(exprows) {
  return exprows.find((exprow) => exprow.simpleexpleft);
}

export function ExpresssionRowsRightRecursive(exprows) {
  for (let i = exprows.length - 1; i >= 0; i--) {
    let exprow = exprows[i];
    if (exprow.isSelected) {
      let j = ExpressionRowsFindNearestSublevel(exprows, i);
      if (j >= 0) {
        exprows[j].expressionrows.push(exprow);
        exprow.parent = exprows[j];
        exprow.isSelected = false;
        exprows.splice(i, 1);
        if (!ExpressionRowsFindFirstSimpleExp(exprow.parent.parent.expressionrows)) {
          //copy child to parent
          exprow.parent.parent.operator = exprow.parent.operator;
          exprow.parent.parent.expressionrows = exprow.parent.expressionrows;
          //adjust parents
          for (j = 0; j < exprow.parent.expressionrows.length; j++)
            exprow.parent.expressionrows[j].parent = exprow.parent.parent;
        }
      } else {
        let newparent = {
          operator: exprow.parent.operator,
          expressionrows: [exprow],
          parent: exprow.parent
        };
        exprow.parent.expressionrows.push(newparent);
        exprow.parent = newparent;
        exprow.isSelected = false;
        exprows.splice(i, 1);
      }
    } else if (exprows[i].expressionrows)
      ExpresssionRowsRightRecursive(exprows[i].expressionrows);
  }
  return exprows;
}

export function ExpresssionRowsDownRecursive(exprows) {
  for (let i = exprows.length - 1; i >= 0; i--) {
    let exprow = exprows[i];
    if (exprow.isSelected) {
      if (i < exprows.length - 1) {
        exprows.splice(i, 1);
        exprows.splice(i + 1, 0, exprow);
      }
    } else if (exprows[i].expressionrows) ExpresssionRowsDownRecursive(exprows[i].expressionrows);
  }
  return exprows;
}

export function ExpresssionRowsUpRecursive(exprows) {
  for (let i = 0; i < exprows.length; i++) {
    let exprow = exprows[i];
    if (exprow.isSelected) {
      if (i > 0) {
        exprows.splice(i, 1);
        exprows.splice(i - 1, 0, exprow);
      }
    } else if (exprows[i].expressionrows) ExpresssionRowsUpRecursive(exprows[i].expressionrows);
  }
  return exprows;
}

function ExpressionToString(exprow) {
  if (exprow.expressionrows) {
    let mapped = exprow.expressionrows.map((row) => ExpressionToString(row));
    return '(' + mapped.join(` ${exprow.operator} `) + ')';
  }
  return exprow.simpleexpleft + exprow.operator + exprow.simpleexpright;
}

export function ExpressionRowsToString(exprows) {
  if (exprows.length > 0) {
    let v = ExpressionToString(exprows[0]);
    if (v > '') return v.substring(1, v.length - 1);
    return '';
  }
}