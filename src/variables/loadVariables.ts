/*
 * 'Shell commands' plugin for Obsidian.
 * Copyright (C) 2021 - 2023 Jarkko Linnanvirta
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, version 3.0 of the License.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 * Contact the author (Jarkko Linnanvirta): https://github.com/Taitava/
 */

import {Variable} from "./Variable";
import {Variable_Clipboard} from "./Variable_Clipboard";
import {Variable_CaretPosition} from "./Variable_CaretPosition";
import {Variable_Date} from "./Variable_Date";
import {Variable_FileExtension} from "./Variable_FileExtension";
import {Variable_FileName} from "./Variable_FileName";
import {Variable_FilePath} from "./Variable_FilePath";
import {Variable_FolderName} from "./Variable_FolderName";
import {Variable_FolderPath} from "./Variable_FolderPath";
import {Variable_Selection} from "./Variable_Selection";
import {Variable_Tags} from "./Variable_Tags";
import {Variable_Title} from "./Variable_Title";
import {Variable_VaultPath} from "./Variable_VaultPath";
import {Variable_Workspace} from "./Variable_Workspace";
import {DEBUG_ON} from "../Debug";
import {Variable_Passthrough} from "./Variable_Passthrough";
import SC_Plugin from "../main";
import {Variable_YAMLValue} from "./Variable_YAMLValue";
import {Variable_EventFileName} from "./event_variables/Variable_EventFileName";
import {Variable_EventFilePath} from "./event_variables/Variable_EventFilePath";
import {Variable_EventFolderName} from "./event_variables/Variable_EventFolderName";
import {Variable_EventFolderPath} from "./event_variables/Variable_EventFolderPath";
import {Variable_EventTitle} from "./event_variables/Variable_EventTitle";
import {Variable_EventFileExtension} from "./event_variables/Variable_EventFileExtension";
import {Variable_EventTags} from "./event_variables/Variable_EventTags";
import {Variable_EventYAMLValue} from "./event_variables/Variable_EventYAMLValue";
import {CustomVariableInstance} from "../models/custom_variable/CustomVariableInstance";
import {Variable_Environment} from "./Variable_Environment";
import {Variable_EventOldFileName} from "./event_variables/Variable_EventOldFileName";
import {Variable_EventOldFilePath} from "./event_variables/Variable_EventOldFilePath";
import {Variable_EventOldFolderName} from "./event_variables/Variable_EventOldFolderName";
import {Variable_EventOldFolderPath} from "./event_variables/Variable_EventOldFolderPath";
import {Variable_EventOldTitle} from "./event_variables/Variable_EventOldTitle";
import {Variable_NewNoteFolderName} from "./Variable_NewNoteFolderName";
import {Variable_NewNoteFolderPath} from "./Variable_NewNoteFolderPath";
import {Variable_FileURI} from "./Variable_FileURI";
import {Variable_EventFileURI} from "./event_variables/Variable_EventFileURI";
import {Variable_NoteContent} from "./Variable_NoteContent";
import {Variable_EventNoteContent} from "./event_variables/Variable_EventNoteContent";
import {Variable_FileContent} from "./Variable_FileContent";
import {Variable_EventFileContent} from "./event_variables/Variable_EventFileContent";
import {Variable_CaretParagraph} from "./Variable_CaretParagraph";
import {Variable_Newline} from "./Variable_Newline";
import {Variable_YAMLContent} from "./Variable_YAMLContent";
import {Variable_EventYAMLContent} from "./event_variables/Variable_EventYAMLContent";
import {Variable_OperatingSystem} from "./Variable_OperatingSystem";
import {Variable_ObsidianAPI} from "./Variable_ObsidianAPI";
import {Variable_ShellCommandsPlugin} from "./Variable_ShellCommandsPlugin";


export function loadVariables(plugin: SC_Plugin): VariableSet {

    const variables = new VariableSet([]);

    // Load CustomVariables
    // Do this before loading built-in variables so that these user-defined variables will appear first in all lists containing variables.
    plugin.getCustomVariableInstances().forEach((custom_variable_instance: CustomVariableInstance) => {
        variables.add(custom_variable_instance.createCustomVariable());
    });

    // Load built-in variables.
    const built_in_variables: Variable[] = [
        // Normal variables
        new Variable_CaretParagraph(plugin),
        new Variable_CaretPosition(plugin),
        new Variable_Clipboard(plugin),
        new Variable_Date(plugin),
        new Variable_Environment(plugin),
        new Variable_FileContent(plugin),
        new Variable_FileExtension(plugin),
        new Variable_FileName(plugin),
        new Variable_FilePath(plugin),
        new Variable_FileURI(plugin),
        new Variable_FolderName(plugin),
        new Variable_FolderPath(plugin),
        new Variable_NewNoteFolderName(plugin),
        new Variable_NewNoteFolderPath(plugin),
        new Variable_NoteContent(plugin),
        // Variable_Output is not loaded here, because it's only used in OutputWrappers.
        new Variable_Selection(plugin),
        new Variable_Tags(plugin),
        new Variable_Title(plugin),
        new Variable_VaultPath(plugin),
        new Variable_Workspace(plugin),
        new Variable_YAMLContent(plugin),
        new Variable_YAMLValue(plugin),

        // Event variables
        new Variable_EventFileContent(plugin),
        new Variable_EventFileExtension(plugin),
        new Variable_EventFileName(plugin),
        new Variable_EventFilePath(plugin),
        new Variable_EventFileURI(plugin),
        new Variable_EventFolderName(plugin),
        new Variable_EventFolderPath(plugin),
        new Variable_EventNoteContent(plugin),
        new Variable_EventOldFileName(plugin),
        new Variable_EventOldFilePath(plugin),
        new Variable_EventOldFolderName(plugin),
        new Variable_EventOldFolderPath(plugin),
        new Variable_EventOldTitle(plugin),
        new Variable_EventTags(plugin),
        new Variable_EventTitle(plugin),
        new Variable_EventYAMLContent(plugin),
        new Variable_EventYAMLValue(plugin),
    ];
    if (DEBUG_ON) {
        // Variables that are only designed for 'Shell commands test suite'.
        built_in_variables.push(
            new Variable_Newline(plugin),
            new Variable_ObsidianAPI(plugin),
            new Variable_OperatingSystem(plugin),
            new Variable_Passthrough(plugin),
            new Variable_ShellCommandsPlugin(plugin),
        );
    }
    for (const built_in_variable of built_in_variables) {
        // JavaScript's Set does not have a method to add multiple items at once, so need to iterate them and add one-by-one.
        variables.add(built_in_variable);
    }

    return variables;
}

/**
 * TODO: Check if VariableSet usages could be refactored to VariableMaps?
 */
export class VariableSet extends Set<Variable> {}

export class VariableMap extends Map<string, Variable> {}