import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { ChipGroup, Button } from '@patternfly/react-core';
import FilterChips from './FilterChips';

const filters = [
    {
        category: 'Group 1',
        chips: [
            {
                name: 'Chip 1',
                isRead: true
            },
            {
                name: 'Chip 2',
                count: 3
            }
        ]
    },
    {
        name: 'Chip 3'
    },
    {
        name: 'Chip 4'
    }
];

describe('FilterChips component', () => {
    it('should render - no data', () => {
        const wrapper = shallow(<FilterChips/>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render', () => {
        const wrapper = shallow(
            <FilterChips filters={ filters } showResetButton/>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    describe('API', () => {
        it('should have default onDelete and onReset handle', () => {
            const onDelete = FilterChips.defaultProps.onDelete;
            const onReset = FilterChips.defaultProps.onReset;

            expect(onDelete).toBeDefined();
            expect(onReset).toBeDefined();

            expect(onDelete()).toEqual(undefined);
            expect(onReset()).toEqual(undefined);
        });

        it('should call onDelete when deleting a single chip', () => {
            const onDelete = jest.fn();
            const wrapper = mount(<FilterChips filters={ filters } onDelete={ onDelete } showResetButton/>);
            wrapper.find('.pf-c-chip button').last().simulate('click');
            expect(onDelete).toHaveBeenCalledWith(expect.anything(), [{ name: 'Chip 4' }]);
            expect(onDelete).toHaveBeenCalledTimes(1);
        });

        it('should call onDelete when deleting a single chip in group', () => {
            const onDelete = jest.fn();
            const wrapper = mount(<FilterChips filters={ filters } onDelete={ onDelete } showResetButton/>);
            wrapper.find('.pf-c-chip button').first().simulate('click');
            expect(onDelete).toHaveBeenCalledWith(expect.anything(), [{
                category: 'Group 1',
                chips: [
                    {
                        name: 'Chip 1',
                        isRead: true
                    }
                ]
            }]);
            expect(onDelete).toHaveBeenCalledTimes(1);
        });

        it('should call onReset when reset button is clicked', () => {
            const onReset = jest.fn();
            const wrapper = mount(<FilterChips filters={ filters } onReset={ onReset } showResetButton/>);
            wrapper.find('button').last().simulate('click');
            expect(onReset).toHaveBeenCalledTimes(1);
        });

        it('should not call onDelete when clicking on any ChipGroup', () => {
            const onDelete = jest.fn();
            const wrapper = mount(<FilterChips filters={ filters } onDelete={ onDelete } showResetButton/>);

            wrapper.find(ChipGroup).forEach(group => group.simulate('click'));
            expect(onDelete).not.toHaveBeenCalled();
        });

        it('should hide reset filter button', () => {
            const onDelete = jest.fn();
            const wrapper = mount(<FilterChips />);

            expect(wrapper.find(Button)).toHaveLength(0);
        });

        it('should show reset filter button with custom label', () => {
            const onDelete = jest.fn();
            const wrapper = mount(<FilterChips showResetButton resetButtonLabel="Custom label" />);

            expect(wrapper.find(Button)).toHaveLength(1);
        });
    });
});
