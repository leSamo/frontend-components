import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Chip, ChipGroup, Button } from '@patternfly/react-core';
import classNames from 'classnames';
import './filter-chips.scss';

const FilterChips = ({ className, filters, onDelete, onReset, showResetButton, resetButtonLabel }) => {
    const groupedFilters = filters.filter(group => group.category).map(group =>  (
        <ChipGroup key={ `group_${group.category}` } categoryName={group.category}>
            {group.chips.map(chip => (
                <Chip
                    key={chip.name}
                    onClick={ (event) => {
                        event.stopPropagation();
                        onDelete(event, [{ ...group, chips: [ chip ] }]);
                    }}
                >
                    { chip.name }
                    { chip.count && <Badge key={ `chip_badge_${chip.id}` } isRead={ chip.isRead }>{ chip.count }</Badge> }
                </Chip>
            ))}
        </ChipGroup>
    ));

    const plainFilters = filters.filter(group => !(group.category));

    return (
        <span className={classNames(className, 'ins-c-chip-filters')}>
            { groupedFilters }
            { plainFilters && plainFilters.map(chip => (
                <ChipGroup key={ `group_plain_chip_${chip.name}` }>
                    <Chip
                        onClick={ (event) => {
                            event.stopPropagation();
                            onDelete(event, [ chip ]);
                        }}
                    >
                        { chip.name }
                        { chip.count && <Badge key={ `chip_badge_${chip.id}` } isRead={ chip.isRead }>{ chip.count }</Badge> }
                    </Chip>
                </ChipGroup>
            )) }
            { showResetButton && <Button variant="link" onClick={ (event) => onReset(event) }>{ resetButtonLabel }</Button> }
        </span>
    );
};

FilterChips.propTypes = {
    className: PropTypes.string,
    filters: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.shape({
                category: PropTypes.string.isRequired,
                chips: PropTypes.arrayOf(
                    PropTypes.shape({
                        name: PropTypes.string.isRequired,
                        isRead: PropTypes.bool,
                        count: PropTypes.number
                    })
                ).isRequired
            }),
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                isRead: PropTypes.bool,
                count: PropTypes.number
            })
        ])
    ),
    onDelete: PropTypes.func,
    onReset: PropTypes.func,
    showResetButton: PropTypes.bool,
    resetButtonLabel: PropTypes.string
};

FilterChips.defaultProps = {
    filters: [],
    onDelete: () => undefined,
    onReset: () => undefined,
    showResetButton: false,
    resetButtonLabel: "Reset filters"
};

export default FilterChips;
