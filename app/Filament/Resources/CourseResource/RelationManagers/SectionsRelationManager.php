<?php

namespace App\Filament\Resources\CourseResource\RelationManagers;

use Filament\Forms\Components\TextInput;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use App\Filament\Resources\SectionResource;
use Filament\Actions;

class SectionsRelationManager extends RelationManager
{
    protected static string $relationship = 'sections';
    protected static ?string $title = 'Secciones';

    public function form(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('title')->label('Título')->required(),
            TextInput::make('order')->label('Orden')->integer()->default(0),
        ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->headerActions([
                Actions\CreateAction::make(),
            ])
            ->reorderable('order')
            ->columns([
                TextColumn::make('order')->label('#')->sortable(),
                TextColumn::make('title')->label('Título')->searchable(),
                TextColumn::make('lessons_count')->label('Lecciones')->counts('lessons'),
            ])
            ->actions([
                Actions\Action::make('manage_lessons')
                    ->label('Lecciones')
                    ->icon('heroicon-o-academic-cap')
                    ->url(fn ($record) => SectionResource::getUrl('edit', ['record' => $record])),
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
