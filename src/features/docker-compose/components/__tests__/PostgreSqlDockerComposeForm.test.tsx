import { JSX } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import { PostgreSqlDockerComposeForm } from '@features/docker-compose/components';
import { render } from '@testing-library/react';

const setup = (component: JSX.Element) => ({
  user: userEvent.setup(),
  ...render(component),
});

describe('PostgreSqlDockerComposeForm', () => {
  it('should render', () => {
    const { getByLabelText } = setup(
      <PostgreSqlDockerComposeForm onSubmit={vi.fn()} />
    );

    expect(getByLabelText('Username')).toBeDefined();
    expect(getByLabelText('Password')).toBeDefined();
    expect(getByLabelText('Database')).toBeDefined();
    expect(getByLabelText('Port')).toBeDefined();
    expect(getByLabelText('Volume')).toBeDefined();
  });

  it('should call onSubmit when form is valid and submitted', async () => {
    const onSubmitMock = vi.fn();

    const { user, getByRole, getByLabelText } = setup(
      <PostgreSqlDockerComposeForm onSubmit={onSubmitMock} />
    );

    await user.type(getByLabelText('Username'), 'user1');
    await user.type(getByLabelText('Password'), '@Password1');
    await user.type(getByLabelText('Database'), 'db1');
    await user.type(getByLabelText('Port'), '5432:5432');
    await user.type(getByLabelText('Volume'), '/path:/var/lib/postgresql/data');

    await user.click(getByRole('button', { name: 'Save' }));

    expect(onSubmitMock).toHaveBeenCalled();
  });

  it('should not call onSubmit when form is invalid and submitted', async () => {
    const onSubmitMock = vi.fn();

    const { user, getByRole } = setup(
      <PostgreSqlDockerComposeForm onSubmit={onSubmitMock} />
    );

    await user.click(getByRole('button', { name: 'Save' }));

    expect(onSubmitMock).not.toHaveBeenCalled();
  });

  it('should show error messages when form is empty and submitted', async () => {
    const { user, getByRole, getByText } = setup(
      <PostgreSqlDockerComposeForm onSubmit={vi.fn()} />
    );

    await user.click(getByRole('button', { name: 'Save' }));

    expect(getByText('Username is required')).toBeDefined();
    expect(getByText('Password is required')).toBeDefined();
    expect(getByText('Database name is required')).toBeDefined();
    expect(getByText('Port mapping is required')).toBeDefined();
    expect(getByText('Volume is required')).toBeDefined();
  });

  it('should show error messages when form is invalid and submitted', async () => {
    const { user, getByRole, getByText, getByLabelText } = setup(
      <PostgreSqlDockerComposeForm onSubmit={vi.fn()} />
    );

    await user.click(getByRole('button', { name: 'Save' }));

    await user.type(getByLabelText('Username'), 'user1--');
    await user.type(getByLabelText('Password'), 'password');
    await user.type(getByLabelText('Database'), 'db1--');

    expect(
      getByText(
        'Username name must contain only letters, digits, and underscores'
      )
    ).toBeDefined();
    expect(
      getByText(
        'Password must contain at least one digit, one letter, and one special character (@#$%^&+=)'
      )
    ).toBeDefined();
    expect(
      getByText(
        'Database name must contain only letters, digits, and underscores'
      )
    ).toBeDefined();
  });
});
