<?php
/*
 * Plugin name: Quick Quiz
 * Author: Me
 * Version: 1.0.0
 */

if (!defined("ABSPATH")) {
    exit();
}

class QuickQuiz
{
    public function __construct()
    {
        add_action("init", [$this, "enqueueBlock"]);
        add_action('wp_enqueue_scripts', [$this, 'loadFrontEnd']);
    }

    public function enqueueBlock()
    {
        $this->registerStyle();
        $this->registerBlock();
    }

    private function registerStyle()
    {
        wp_enqueue_style(
            "quizblock_style",
            plugin_dir_url(__FILE__) . "/build/quickQuiz.css"
        );
        add_editor_style([plugin_dir_url(__FILE__) . "/build/quickQuiz.css"]);
    }

    private function registerBlock()
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

    public function loadFrontEnd()
    {
        wp_enqueue_script('quizoutput',plugin_dir_url(__FILE__)."/build/quizOutput.js", ['wp-element']);
        wp_enqueue_style('quizoutput_style', plugin_dir_url(__FILE__)."/build/quizOutput.css");
    } 
}

//init Plugin;
$init = new QuickQuiz();
