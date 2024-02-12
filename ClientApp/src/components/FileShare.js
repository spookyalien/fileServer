import React, { Component } from 'react';
import FileUpload from './FileUpload';
import FileDownload from './FileDownload';
import './FileShare.css';

export class FileShare extends Component
{
    static displayName = FileShare.name;

    constructor(props)
    {
        super(props);
        this.state = {
            grid_items: [],
            file_names: [],
            selected: [],
            file_count: 0
        };
    }

    create_grid()
    {
        const grid_items = [];

        for (let i = 0; i < this.state.file_count; i++) {
            grid_items.push({ id: `${i}`, text: 'Cell' });
        }

        this.setState({ grid_items });
    }

    populate_files()
    {
        fetch('/api/FileUpload/files')
        .then(response => response.json())
        .then(data => {
            this.setState({ file_names: data });
        })
        .catch(error => {
            console.error('Error getting names of files: ', error);
        });
    }

    get_file_count()
    {
        fetch('/api/FileUpload')
        .then(response => response.json())
        .then(data => {
            this.setState({ file_count: data }, () => {
                this.create_grid();
              });
        })
        .catch(error => {
            console.error('Error getting count: ', error);
        });
    }

    handle_select(selected_id)
    {
        if (this.state.selected.includes(this.state.file_names[selected_id])) {
            document.getElementById(selected_id).style.backgroundColor='#dee2e7';
            var select_index = this.state.selected.indexOf(this.state.file_names[selected_id]);
            if (select_index !== -1) {
                this.state.selected.splice(select_index, 1);
            }      
        }
        else {
            document.getElementById(selected_id).style.backgroundColor='#c2e7ff';
            this.setState(prevState => ({
                    selected: [...prevState.selected, this.state.file_names[selected_id]]}));
        }
    }

    componentDidMount() {
        this.populate_files();
        this.get_file_count();
    }

    handleFileUploaded = () => {
        this.populate_files();
        this.get_file_count();
    }

    render()
    {
        return (
            <div>
                <FileUpload onFileUploaded={this.handleFileUploaded}/>
                <FileDownload selected={this.state.selected}/>

                <div className="displayGrid" id="file_grid">
                    {this.state.grid_items.map((item) => (
                        <div key={item.id} className="grid-item">
                            {<button type="submit" id={item.id} className="fileButton" onClick={() => this.handle_select(item.id)}>
                                { this.state.file_names[item.id] } 
                            </button>}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}