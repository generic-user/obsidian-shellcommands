import {EventRef} from "obsidian";
import {
    SC_Event,
    TShellCommand,
} from "src/imports";

export abstract class SC_WorkspaceEvent extends SC_Event {
    protected abstract readonly workspace_event:
        // TODO: Find a way to make this list dynamic.
        // This list reflects Obsidian API version 0.12.11.
        | 'quick-preview'
        | 'resize'
        | 'click'
        | 'active-leaf-change'
        | 'file-open'
        | 'layout-change'
        | 'css-change'
        | 'file-menu'
        | 'editor-menu'
        | 'codemirror'
        | 'quit'
    ;

    protected _register(t_shell_command: TShellCommand) {
        // @ts-ignore TODO: Find a way to get a dynamic type for this.workspace_event .
        return this.app.workspace.on(this.workspace_event, this.getTrigger(t_shell_command));
    }

    protected _unregister(event_reference: EventRef): void {
        this.app.workspace.offref(event_reference);
    }

    protected getTrigger(t_shell_command: TShellCommand) {
        return (...parameters: any[] /* Need to have this ugly parameter thing so that subclasses can define their own parameters. */) => this.trigger(t_shell_command);
    }
}