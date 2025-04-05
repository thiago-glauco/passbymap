describe('VirtualizedTenantsTable', () => {
    beforeEach(() => {
      cy.visit('/tenants')
    })
 
 
    it('should scroll to bottom and load more rows', () => {
      // Initial check: 6 rows loaded
      cy.get('[data-testid^="tenant-row-"]').should('have.length', 6);
  
      // Get Virtuoso's scroller container
      cy.get('[data-testid="virtuoso-scroller"]').then(($scroller) => {
        const scroller = $scroller[0];
        
        // Set scrollTop to max value
        scroller.scrollTop = scroller.scrollHeight;
  
        // Trigger scroll
        $scroller.trigger('scroll');
      });
  
      // Wait for virtualized content to load
      cy.wait(300); 
  
      // Assert new rows appeared (e.g., check for tenant-row-10 or count increased)
      cy.get('[data-testid^="tenant-row-"]').should('have.length.greaterThan', 6);
    });

    it('renders visible rows fast', () => {
        const t0 = performance.now();
      
        cy.get('[data-testid="virtuoso-scroller"]').then(($scroller) => {
          const scroller = $scroller[0];
          scroller.scrollTop = scroller.scrollHeight;
          $scroller.trigger('scroll');
        });
      
        cy.get('[data-testid^="tenant-row-"]').should('have.length.greaterThan', 6).then(() => {
          const t1 = performance.now();
          cy.log(`Render took ${t1 - t0} ms`);
        });
      });
      
  });
  