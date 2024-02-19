import React, { Component } from 'react';
import FileUpload from './FileUpload';
import FileDownload from './FileDownload';
import FileDelete from './FileDelete';
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

    handle_select(selected_opt)
    {
        if (this.state.selected.includes(selected_opt)) {
            document.getElementById(selected_opt).style.backgroundColor='#dee2e7';
            var select_index = this.state.selected.indexOf(selected_opt);
            if (select_index !== -1) {
                this.state.selected.splice(select_index, 1);
            }      
        }
        else {
            document.getElementById(selected_opt).style.backgroundColor='#c2e7ff';
            this.setState(prevState => ({
                    selected: [...prevState.selected, selected_opt]}));
        }
    }

    componentDidMount() {
        this.populate_files();
        this.get_file_count();
    }

    handleFileChange = () => {
        this.populate_files();
        this.get_file_count();
    }

    render()
    {
        return (
            <div>
                <div className="mainBar">
                    <FileUpload onFileUploaded={this.handleFileChange}/>
                    <FileDownload selected={this.state.selected}/>
                    <FileDelete selected={this.state.selected} onFileChange={this.handleFileChange}/>
                </div>
                <br></br>
                <div className="displayGrid" id="file_grid">
                    {this.state.grid_items.map((item) => (
                        <div key={item.id} className="grid-item">
                            {<button type="submit" id={this.state.file_names[item.id]} className="fileButton" onClick={() => this.handle_select(this.state.file_names[item.id])}>
                                { this.state.file_names[item.id] } 
                            </button>}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}