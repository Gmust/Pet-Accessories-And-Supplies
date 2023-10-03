import { CatalogButton } from '@/src/components/HomePage/CatalogButton';
import { render, screen } from '@testing-library/react';

describe('Home page - rendering', () => {
  it(CatalogButton.name, () => {
    render(
      <CatalogButton />,
    );
    const links: HTMLAnchorElement[] = screen.getAllByRole('link');
    expect(links[0].textContent).toEqual('Catalog');
    expect(links[0].href).toContain('/shop');
  });
});