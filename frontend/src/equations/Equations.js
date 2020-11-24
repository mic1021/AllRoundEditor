const latexEquations = [
[
    {name: 'Fraction', equation: '\\frac{}{}', text: '\\fraction',fontSize: '200%',textSize: '100%',topPos: '80%'},
    {name: 'Square Root', equation: '\\sqrt{}', text: '\\square-root',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'Square Root 2', equation: '\\sqrt[]{}', text: '\\square-root2',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'Integration', equation: '\\int', text: '\\integral',fontSize: '170%',textSize: '100%',topPos: '80%'},
    {name: 'Summation', equation: '\\sum', text: '\\summation',fontSize: '130%',textSize: '100%',topPos: '80%'},
    {name: 'Pi-Product', equation: '\\prod', text: '\\production',fontSize: '130%',textSize: '100%',topPos: '80%'},
    {name: 'Power', equation: 'x\\^{}', text: '\\power (^)',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'Index', equation: 'x\\_{}', text: '\\index (_)',fontSize: '300%',textSize: '100%',topPos: '80%'},
],
[
    //Other Symbols
    {name: 'OTimes', equation: '\\otimes', text: '\\otimes',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'Therefore', equation: '\\therefore', text: '\\therefore',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'Because', equation: '\\because', text: '\\because',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'Vector', equation: '\\vec{v}', text: '\\vector',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'Parallel', equation: '\\parallel', text: '\\parallel',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'Not parallel', equation: '\\nparallel', text: '\\not parallel',fontSize: '300%',textSize: '100%',topPos: '80%'},
],
[
    //Arithmetic Symbols
    {name: 'Multiplication', equation: '\\times', text: '\\times',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'Division', equation: '\\div', text: '\\division',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'Plus-Minus', equation: '\\pm', text: '\\plus-minus',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'Minus-Plus', equation: '\\mp', text: '\\minus-plus',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'Divide', equation: '\\mid', text: '\\divide',fontSize: '300%',textSize: '100%',topPos: '80%'},
],
[
    //Logic Symbols
    {name: 'Negation', equation: '\\neg', text: '\\negation',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'Not', equation: '\\sim', text: '\\not',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'Conjunction', equation: '\\land', text: '\\and(confunction)',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'Disjunction', equation: '\\lor', text: '\\or(disjunction)',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'XOR', equation: '\\oplus', text: '\\xor',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'True', equation: '\\top', text: '\\always-true',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'False', equation: '\\bot', text: '\\always-false',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'Exist', equation: '\\exists', text: '\\there exists',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'Exist exactly one', equation: '\\exists!', text: '\\exists exactly one',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'Iff', equation: '\\Leftrightarrow', text: '\\if and only if',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'Iff2', equation: '\\equiv', text: '\\if and only if',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'Iff3', equation: '\\leftrightarrow', text: '\\if and only if',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'Implies', equation: '\\Rightarrow', text: '\\if A then B',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'Implies2', equation: '\\to', text: '\\if A then B',fontSize: '300%',textSize: '100%',topPos: '80%'},
],
[
    //Order Symbols
    {name: 'Not equal', equation: '\\neq', text: '\\not equal',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'Less Than or Equal To', equation: '\\leq', text: '\\less-than-equal',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'Greater Than or Equal To', equation: '\\geq', text: '\\greater-than-equal',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'Propotional', equation: '\\propto', text: '\\propotional',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'Approx', equation: '\\approx', text: '\\approximate',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'Approx2', equation: '\\doteq', text: '\\approximate',fontSize: '300%',textSize: '100%',topPos: '80%'},
],
[
    //Set Symbols
    {name: 'Intersection', equation: '\\cap', text: '\\cap',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'Union', equation: '\\cup', text: '\\cup',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'Emptyset', equation: '\\emptyset', text: '\\emptyset',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'Subset', equation: '\\subset', text: '\\subset',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'Not Subset', equation: '\\nsubset', text: '\\not subset',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'Subset-equal', equation: '\\subseteq', text: '\\subset-equal',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'Not subset-equal', equation: '\\nsubseteq', text: '\\not subset-equal',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'Is member of', equation: '\\in', text: '\\is member of',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'Is not member of', equation: '\\notin', text: '\\is not member of',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'Supset', equation: '\\supset', text: '\\supset',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'Not supset', equation: '\\nsupset', text: '\\not supset',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'Supset-equal', equation: '\\supseteq', text: '\\supset-equal',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'Not supset-equal', equation: '\\nsupseteq', text: '\\not supset-equal',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'Has member', equation: '\\ni', text: '\\has member',fontSize: '300%',textSize: '100%',topPos: '80%'},
    {name: 'Has not member', equation: '\\notni', text: '\\has not member',fontSize: '300%',textSize: '100%',topPos: '80%'},
]];

export default latexEquations;