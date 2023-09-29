export let expressionrows = [
    {
        operator: 'AND',
        expressionrows: [
            {
                simpleexpleft: 'AMOUNT',
                operator: '<',
                simpleexpright: 10000
            },
            {
                simpleexpleft: 'CCY',
                operator: '=',
                simpleexpright: 'EUR'
            },
            {
                operator: 'OR',
                expressionrows: [
                    {
                        simpleexpleft: 'BENEFBANKBIC',
                        operator: '=',
                        simpleexpright: 'CRBAGRAA'
                    },
                    {
                        simpleexpleft: 'ISVALIDCORRESPONDENT(BENEFBANKBIC, CCY)',
                        operator: '=',
                        simpleexpright: true
                    },
                ]
            }
        ]
    }
];