/* eslint-disable import/no-unresolved */
import React from 'react';
import { ListBox } from '@bit/primefaces.primereact.listbox';
import PrimereactStyle from '@bit/primefaces.primereact.internal.stylelinks';
import './App.scss';

class Userexperiences extends React.Component {
  constructor() {
    super();
    this.state = {
      cities: [
        { name: 'Rome', code: 'RM' },
        { name: 'Istanbul', code: 'IST' },
      ],
    };
  }

  render() {
    const cities = [
      {
        name: 'High dose NSAIDS i.e Ibuprofen 600 mg three every 8 hours',
        code: 'NY',
      },
      { name: 'No intense exercise', code: 'RM' },
      {
        name:
          'Further labs including autoimmune markers i.e ANA, TSH, ESR, CRP',
        code: 'LDN',
      },
      { name: 'Incentive inspirometry', code: 'IST' },
      { name: 'cardiac MRI for the evaluation of Sarcoidosis', code: 'PRS' },
    ];

    return (
      <div>
        <PrimereactStyle />
        <div className="userxp-container">
          <div className="userxp">
            <p>Recommendations</p>
            <ListBox
              value={this.state.cities}
              options={cities}
              onChange={(e) => this.setState({ cities: e.value })}
              multiple
              optionLabel="name"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Userexperiences;
