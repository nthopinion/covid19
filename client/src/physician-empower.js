import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { AutoComplete } from '@bit/primefaces.primereact.autocomplete';
// eslint-disable-next-line import/no-unresolved
import PrimereactStyle from '@bit/primefaces.primereact.internal.stylelinks';

const countryservice = [
  { name: 'pericarditis', code: 'AP' },
  { name: 'congestive heart failure', code: 'AP' },
  { name: 'cholecystis', code: 'AP' },
  { name: 'pancreatitis', code: 'AP' },
  { name: 'Hemorrhoids', code: 'Hemi' },
];

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countriesData: countryservice,
      filteredCountriesMultiple: null,
    };

    this.filterCountryMultiple = this.filterCountryMultiple.bind(this);
  }

  filterCountryMultiple(event) {
    setTimeout(() => {
      const results = this.state.countriesData.filter((country) => {
        return country.name.toLowerCase().startsWith(event.query.toLowerCase());
      });

      this.setState({ filteredCountriesMultiple: results });
    }, 0);
  }

  render() {
    return (
      <div className="content-section implementation">
        <PrimereactStyle />
        <h3 className="style-appname">Design Your AI and Scale</h3>
        <span className="p-fluid">
          <div className="style-physicianbar">
            <AutoComplete
              value={this.state.countries}
              suggestions={this.state.filteredCountriesMultiple}
              completeMethod={this.filterCountryMultiple}
              minLength={1}
              placeholder="i.e. pericarditis"
              field="name"
              multiple
              onChange={(e) => this.setState({ countries: e.value })}
            />
          </div>
        </span>
      </div>
    );
  }
}

export default Example;
