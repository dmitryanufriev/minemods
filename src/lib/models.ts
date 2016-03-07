module Models {
    /**
     * Domain models
     */
    export module Minecraft {
        /**
         * Contains paths to Minecraft's mods
         */
        export interface Paths {
            /**
             * Path to local folder with Minecraft's mods
             */
            localModsPath: string;
            /**
             * Path to shared folder with Minecraft's mods
             */
            sharedModsPath: string;
        }
        /**
         * Contains Minecraft's mod info
         */
        export interface Mod {
            /**
             * Mod name
             */
            name: string;
            /**
             * Mod filename
             */
            filename: string;
        }
    }
}

export = Models;