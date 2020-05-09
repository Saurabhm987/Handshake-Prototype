import React from 'react';
import { shallow } from 'enzyme';
import Home from './home'


describe('HomeComponent', () => {
    it('should render correctly in "debug" mode', () => {
      const component = shallow(<Home debug />);
    
      expect(component).toMatchSnapshot();
    });
  });



  // Minor change
  // commiting changes 
  //  NNNNNNNNNNn