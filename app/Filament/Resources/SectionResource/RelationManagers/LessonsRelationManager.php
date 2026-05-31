<?php

namespace App\Filament\Resources\SectionResource\RelationManagers;

use App\Enums\LessonType;
use App\Enums\VideoType;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Schema;
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
            TextInput::make('video_url')
                ->label('URL del video (YouTube, Vimeo, etc.)')
                ->url()
                ->nullable()
                ->visible(fn ($get) => self::isVideoType($get('type')))
                ->columnSpanFull(),
            FileUpload::make('video_path')
                ->label('Archivo de video')
                ->disk('public')
                ->directory('lessons/videos')
                ->acceptedFileTypes(['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime', 'video/x-msvideo'])
                ->maxSize(512 * 1024)
                ->nullable()
                ->visible(fn ($get) => self::isVideoType($get('type')))
                ->columnSpanFull(),
            TextInput::make('duration_seconds')
                ->label('Duración (segundos)')
                ->integer()
                ->nullable()
                ->visible(fn ($get) => self::isVideoType($get('type'))),
            RichEditor::make('content')
                ->label('Contenido')
                ->nullable()
                ->visible(fn ($get) => ! self::isVideoType($get('type')))
                ->columnSpanFull(),
            Toggle::make('is_free_preview')->label('Vista previa gratuita'),
        ]);
    }

    private static function isVideoType(mixed $type): bool
    {
        if ($type instanceof LessonType) {
            return $type === LessonType::Video;
        }
        return $type === LessonType::Video->value;
    }

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        return $this->resolveVideoType($data);
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        return $this->resolveVideoType($data);
    }

    private function resolveVideoType(array $data): array
    {
        if (!empty($data['video_path'])) {
            $data['video_type'] = VideoType::Upload->value;
        } elseif (!empty($data['video_url'])) {
            $data['video_type'] = VideoType::Url->value;
        } else {
            $data['video_type'] = null;
        }
        return $data;
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
