import { Component } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { DeleteNoteConfirmationComponent } from './../delete-note-confirmation/delete-note-confirmation.component';
import { AddNoteDialogComponent } from './../add-note-dialog/add-note-dialog.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden', padding: 0, margin: 0 })),
      state('expanded', style({ height: '*', visibility: 'visible', padding: '10px', margin: '10px' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ],
})
export class ProjectListComponent {

  displayedColumns = [
    'toggle',
    'id',
    'title',
    'status',
    'start_date',
    'active',
    'assignee',
    'percent_complete'
  ];
  dataSource = new ProjectsDataSource();
  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
  expandedElement: any;

  constructor(public dialog: MatDialog) {}

  activeChanged(event): void {
    //event.stopPropagation();
    //event.preventDefault();
    console.log(event);
  }

  addNote(projectId) {
    const dialogRef = this.dialog.open(AddNoteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      function findProject(project) {
        return project.id === projectId;
      }
      if (result) {
        const project = data.find(findProject);
        const newNote = {
          id: Math.floor(Math.random() * 1000),
          note: result
        };
        project.notes.push(newNote);
        // TODO - Just resetting datasource for now. Find a better way.
        this.dataSource = new ProjectsDataSource();
      }
    });
  }

  deleteNote(projectId, noteId) {
    const dialogRef = this.dialog.open(DeleteNoteConfirmationComponent);
    dialogRef.afterClosed().subscribe(result => {
      // TODO - No time to add lodash and clean this up.
      function findProject(project) {
        return project.id === projectId;
      }
      function findNote(note) {
        return note.id === noteId;
      }
      if (result === 'confirmed') {
        const project = data.find(findProject);
        const index = project.notes.findIndex(findNote);
        project.notes.splice(index, 1);
        this.dataSource = new ProjectsDataSource();
      }
    });
  }

}

export interface Project {
  id: number,
  title: string;
  start_date: string,
  status: string,
  active: string,
  assignee: string,
  percent_complete: string,
  details: {
    requestor:
    {
      id: number,
      name: string,
      department: string
    },
    summary: string,
    justification: string
  },
  notes: Array<object>
}

const data: Project[] = [
  {
    'id': 1,
    'title': 'Project 1',
    'start_date': '2020-09-24 12:45:26',
    'status': 'Pending',
    'active': 'true',
    'assignee': 'Joe Smith',
    'percent_complete': '0',
    'details': {
      'requestor':
      {
        'id': 234,
        'name': 'Jim Smith',
        'department': 'Special Requests Department'
      },
      'summary': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut elit ex. Etiam commodo, nibh et dignissim laoreet, ipsum ex lobortis lectus, at ultricies nulla nisi at dui. Fusce ultrices justo at porta imperdiet.',
      'justification': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut elit ex. Etiam commodo, nibh et dignissim laoreet, ipsum ex lobortis lectus, at ultricies nulla nisi at dui. Fusce ultrices justo at porta imperdiet. Cras arcu nisi, lacinia vitae odio nec, gravida porta tellus. Nam leo turpis, maximus eget felis molestie, ultricies tristique diam. Pellentesque in commodo nulla. Suspendisse suscipit mattis fringilla.'
    },
    'notes': []
  },
  {
    'id': 2,
    'title': 'Super important special project for the head of the most important department',
    'start_date': '2020-02-24 12:45:26',
    'status': 'In Progress',
    'active': 'true',
    'assignee': 'Jane Smith',
    'percent_complete': '65',
    'details': {
      'requestor':
      {
        'id': 214,
        'name': 'Jim Smith',
        'department': 'Most Important Department'
      },
      'summary': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut elit ex. Etiam commodo, nibh et dignissim laoreet, ipsum ex lobortis lectus, at ultricies nulla nisi at dui. Fusce ultrices justo at porta imperdiet.',
      'justification': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut elit ex. Etiam commodo, nibh et dignissim laoreet, ipsum ex lobortis lectus, at ultricies nulla nisi at dui. Fusce ultrices justo at porta imperdiet. Cras arcu nisi, lacinia vitae odio nec, gravida porta tellus. Nam leo turpis, maximus eget felis molestie, ultricies tristique diam. Pellentesque in commodo nulla. Suspendisse suscipit mattis fringilla.'
    },
    'notes': [
      {
        'id': 998,
        'note': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut elit ex. Etiam commodo, nibh et dignissim laoreet, ipsum ex lobortis lectus, at ultricies nulla nisi at dui. Fusce ultrices justo at porta imperdiet. Cras arcu nisi, lacinia vitae odio nec, gravida porta tellus. Nam leo turpis, maximus eget felis molestie, ultricies tristique diam. Pellentesque in commodo nulla. Suspendisse suscipit mattis fringilla. Donec gravida libero nec viverra rutrum. Pellentesque efficitur magna egestas diam sagittis, eu porta leo auctor. Morbi sagittis non mauris a varius. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'
      },
      {
        'id': 378,
        'note': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id bibendum dolor. Morbi sagittis ligula vitae elementum feugiat. Cras id cursus ipsum, et feugiat nisi. Suspendisse finibus ac turpis a viverra. Sed ac consectetur turpis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras egestas congue nibh, a lacinia elit fermentum eu.'
      }
    ]
  },
  {
    'id': 3,
    'title': 'Project 3',
    'start_date': '2018-12-21 12:45:26',
    'status': 'Complete',
    'active': 'false',
    'assignee': 'Joe Smith',
    'percent_complete': '100',
    'details': {
      'requestor':
      {
        'id': 234,
        'name': 'Jim Smith',
        'department': 'Special Requests Department'
      },
      'summary': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut elit ex. Etiam commodo, nibh et dignissim laoreet, ipsum ex lobortis lectus, at ultricies nulla nisi at dui. Fusce ultrices justo at porta imperdiet.',
      'justification': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut elit ex. Etiam commodo, nibh et dignissim laoreet, ipsum ex lobortis lectus, at ultricies nulla nisi at dui. Fusce ultrices justo at porta imperdiet. Cras arcu nisi, lacinia vitae odio nec, gravida porta tellus. Nam leo turpis, maximus eget felis molestie, ultricies tristique diam. Pellentesque in commodo nulla. Suspendisse suscipit mattis fringilla.'
    },
    'notes': [
      {
        'id': 20,
        'note': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut elit ex. Etiam commodo, nibh et dignissim laoreet, ipsum ex lobortis lectus, at ultricies nulla nisi at dui. Fusce ultrices justo at porta imperdiet. Cras arcu nisi, lacinia vitae odio nec, gravida porta tellus. Nam leo turpis, maximus eget felis molestie, ultricies tristique diam. Pellentesque in commodo nulla. Suspendisse suscipit mattis fringilla. Donec gravida libero nec viverra rutrum. Pellentesque efficitur magna egestas diam sagittis, eu porta leo auctor. Morbi sagittis non mauris a varius. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'
      }
    ]
  }
];

export class ProjectsDataSource extends DataSource<any> {
  connect(): Observable<Project[]> {
    const rows = [];
    data.forEach(element => rows.push(element, { detailRow: true, element }));
    return of(rows);
  }

  disconnect() { }
}
