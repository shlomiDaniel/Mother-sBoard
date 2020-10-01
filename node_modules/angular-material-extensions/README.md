Extensions to the components provided by [@angular/material](https://material.angular.io/)

![CI](https://github.com/pweyrich/angular-material-extensions/workflows/CI/badge.svg?branch=master)

Add this library to your project with
```shell script
ng add angular-material-extensions
```

# Table

## MatCustomHeaderDirective
Enables a user to customize the order of columns via drag & drop on the table header cells.

### Usage
Add `matCustomHeader` directive to the header row.

```ts
dataSource = [{a: 1, b: 'one'}, {a: 2, b: 'two'}, {a: 3, b: 'three'}];
displayedColumns = ['a', 'b'];
```

```html
<mat-table [dataSource]="dataSource">
   <ng-container matColumnDef="a">
       <mat-header-cell *matHeaderCellDef>A</mat-header-cell>
       <mat-cell *matCellDef="let row"> {{ row.a }} </mat-cell>
   </ng-container>
    <ng-container matColumnDef="b">
       <mat-header-cell *matHeaderCellDef>B</mat-header-cell>
       <mat-cell *matCellDef="let row"> {{ row.b }} </mat-cell>
   </ng-container>
   <mat-header-row *matHeaderRowDef="displayedColumns" matCustomHeader></mat-header-row>
   <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
</mat-table>
```

## MatSelectionColumnComponent
A component which registers both a header cell def and a cell def for a column that provides checkboxes to select rows based on a SelectionModel.

### Note
This component is not compatible with the [flex-layout](https://material.angular.io/components/table/overview#tables-with-code-display-flex-code-) table!

### Usage
```ts
dataSource = [1,2,3];
displayedColumns = ['select', 'data'];
selection = new SelectionModel<number>(true);
```

```html
<table mat-table [dataSource]="dataSource">
   <mat-selection-column name="select" [selection]="selection"></mat-selection-column>
   <ng-container matColumnDef="data">
       <th mat-header-cell *matHeaderCellDef>Data</th>
       <td mat-cell *matCellDef="let row"> {{ row }} </td>
   </ng-container>
   <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
   <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
</table>
```
