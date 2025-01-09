import { User } from '@acme/shared-models';
import {
  Avatar,
  CloseButton,
  Combobox,
  Group,
  Input,
  InputBase,
  Text,
  useCombobox,
} from '@mantine/core';
import { useUserList } from '../api/hooks';
import { useState } from 'react';

type Props = {
  label?: string;
  initialValue: User['id'] | null;
  onSelect?: (id: User['id'] | null) => unknown;
};

export function UserSelector({ initialValue, onSelect, label }: Props) {
  const [value, setValue] = useState(initialValue);
  const { data, isLoading } = useUserList();
  const combobox = useCombobox();

  const selectedData = data?.find((it) => it.id === value);

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        const id = Number(val);
        onSelect?.(id);
        setValue(id);
        combobox.toggleDropdown();
        combobox.updateSelectedOptionIndex('active');
      }}
      disabled={isLoading}
    >
      <Combobox.Target targetType="button">
        <InputBase
          label={label}
          component="button"
          type="button"
          pointer
          rightSection={
            value !== null ? (
              <CloseButton
                size="sm"
                onMouseDown={(event) => event.preventDefault()}
                onClick={(event) => {
                  onSelect?.(null);
                  setValue(null);
                  event.stopPropagation();
                }}
                aria-label="Clear value"
              />
            ) : (
              <Combobox.Chevron />
            )
          }
          onClick={(event) => {
            event.stopPropagation();
            combobox.toggleDropdown();
          }}
          rightSectionPointerEvents={value === null ? 'none' : 'all'}
        >
          {selectedData ? (
            <Group gap="xs">
              <Avatar size={24} color="initials" name={selectedData.name} />
              <Text>{selectedData.name}</Text>
            </Group>
          ) : (
            <Input.Placeholder>Assignee</Input.Placeholder>
          )}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {data &&
            data.map((item) => (
              <Combobox.Option
                value={item.id.toString()}
                key={item.id}
                active={item.id === value}
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                <Group gap="xs">
                  <Avatar size={24} color="initials" name={item.name} />
                  <Text>{item.name}</Text>
                </Group>
              </Combobox.Option>
            ))}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

export default UserSelector;
