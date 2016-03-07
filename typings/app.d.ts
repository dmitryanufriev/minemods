/// <reference path="../typings/main.d.ts" />

/**
 * Application models
 */
declare module Models {
    /**
     * Domain models
     */
    module Minecraft {
        /**
         * Contains paths to Minecraft's mods
         */
        interface Paths {
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
        interface Mod {
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

/**
 * Angular services
 */
declare module Services {
    /**
    * Minecrat's mods service
    */
    class Mods {
        /**
        * Find all Minecraft's mods on local computer
        *
        * @return {Array<Models.Minecraft.Mod>} Mods on local computer
        */
        getLocalMods(): ng.IPromise<Array<Models.Minecraft.Mod>>;

        /**
        * Delete mod's file from local computer
        *
        * @param {Models.Minecrat.Mod} Mod which will be deleted
        * @return {Models.Minecrat.Mod} Mod which was deleted
        */
        deleteLocalMod(mod: Models.Minecraft.Mod): ng.IPromise<Models.Minecraft.Mod>;
        
        /**
         * Find all Minecraft's mods in shared folder
         * 
         * @return {Array<Models.Minecraft.Mod>} Mods in shared folder
         */
        getSharedMods(): ng.IPromise<Array<Models.Minecraft.Mod>>;
        
        /**
         * Copy mod from server to local computer
         * 
         * @return {Models.Minecrat.Mod} Mod which was installed
         */
        installMod(mod: Models.Minecraft.Mod): ng.IPromise<Models.Minecraft.Mod>;
        
        /**
         * Open Google search with mod name
         */
        searchModInfo(mod: Models.Minecraft.Mod);
    }
}
