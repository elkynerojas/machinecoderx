<?php

namespace App\Filament\Resources\SectionResource\RelationManagers;

use App\Enums\LessonType;
use App\Enums\VideoType;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Actions;

class LessonsRelationManager extends RelationManager
{
    protected static string $relationship = 'lessons';
    protected static ?string $title = 'Lecciones';

    public function form(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('title')->label('Título')->required()->columnSpanFull(),
            TextInput::make('order')->label('Orden')->integer()->default(0),
            Select::make('type')
                ->label('Tipo')
                ->options(LessonType::class)
                ->required()
                ->live(),
            Select::make('video_type')
                ->label('Origen del video')
                ->options(VideoType::class)
                ->visible(fn ($get) => $get('type') === LessonType::Video->value)
                ->live(),
            TextInput::make('video_url')
                ->label('URL del video')
                ->url()
                ->visible(fn ($get) => $get('type') === LessonType::Video->value && $get('video_type') === VideoType::Url->value),
            TextInput::make('video_path')
                ->label('Ruta del archivo')
                ->visible(fn ($get) => $get('type') === LessonType::Video->value && $get('video_type') === VideoType::Upload->value),
            TextInput::make('duration_seconds')
                ->label('Duración (segundos)')
                ->integer()
                ->nullable()
                ->visible(fn ($get) => $get('type') === LessonType::Video->value),
            RichEditor::make('content')
                ->label('Contenido')
                ->nullable()
                ->visible(fn ($get) => $get('type') !== LessonType::Video->value)
                ->columnSpanFull(),
            Toggle::make('is_free_preview')->label('Vista previa gratuita'),
        ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->reorderable('order')
            ->columns([
                TextColumn::make('order')->label('#')->sortable(),
                TextColumn::make('title')->label('Título')->searchable()->limit(40),
                TextColumn::make('type')->label('Tipo')->badge(),
                TextColumn::make('duration_seconds')->label('Duración')->suffix('s')->placeholder('—'),
                IconColumn::make('is_free_preview')->label('Preview gratuito')->boolean(),
            ])
            ->actions([
                Actions\EditAction::make(),
                Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Actions\BulkActionGroup::make([
                    Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
}
