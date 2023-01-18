<?php
/*
 * Plugin name: Quick Quiz
 * Author: Amadeusz Zabierowski 
 * Author URI: https://github.com/Zabamd
 * Description: Plugin for single choice quiz
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Version: 1.0.0
 */

/*
Copyright (C) 2023 Amadeusz Zabierowski
 
This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.
 
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.
 
You should have received a copy of the GNU General Public License along
with this program; if not, write to the Free Software Foundation, Inc.,
51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
*/

if (!defined("ABSPATH")) {
    exit();
}

class QuickQuiz
{
    public function __construct()
    {
        add_action( "init", [$this, "enqueueBlock"] );
        add_action( 'wp_enqueue_scripts', [$this, 'loadFrontEnd'] );
        add_filter( 'block_categories_all', [$this, 'registerBlockCategory'] );
    }

    public function enqueueBlock() : void
    {
        $this->registerStyle();
        $this->registerBlock();
    }

    private function registerStyle() : void
    {
        wp_enqueue_style(
            "quizblock_style",
            plugin_dir_url(__FILE__) . "/build/quickQuiz.css"
        );
        add_editor_style( [plugin_dir_url(__FILE__) . "/build/quickQuiz.css"] );
    }

    private function registerBlock() : void
    {
        wp_register_script(
            "quizblock",
            plugin_dir_url(__FILE__) . "/build/quickQuiz.js",
            ["wp-blocks", "wp-editor", "wp-element"]
        );
        
        register_block_type("quizblock/mainquiz", [
            "editor_script" => "quizblock",
            'editor_style' => 'quizblock_style'
        ]);
    }

    public function registerBlockCategory(array $block_categories) : array 
    {
        $block_categories[] = array(
            'slug'  =>'quickquiz',
            'title' => __('Quick Quiz'),
        );

        return $block_categories;
    }

    public function loadFrontEnd()
    {
        wp_enqueue_script( 'quizoutput', plugin_dir_url(__FILE__)."/build/quizOutput.js", ['wp-element'] );
        wp_enqueue_style( 'quizoutput_style', plugin_dir_url(__FILE__)."/build/quizOutput.css" );
    } 
}

//init Plugin;
$init = new QuickQuiz();
